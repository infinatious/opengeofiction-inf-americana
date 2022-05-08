"use strict";

import * as ShieldDef from "./shield_defs.js";
import * as ShieldText from "./shield_text.js";
import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Gfx from "./screen_gfx.js";

function loadShield(ctx, shield, bannerCount) {
  var drawCtx = Gfx.getGfxContext(shield.data);
  var imgData = drawCtx.createImageData(shield.data.width, shield.data.height);

  for (var i = 0; i < shield.data.data.length; i++) {
    imgData.data[i] = shield.data.data[i];
  }

  drawCtx.putImageData(imgData, 0, 0);

  ctx.drawImage(drawCtx.canvas, 0, bannerCount * ShieldDef.bannerSizeH);
}

function drawBanners(ctx, network) {
  var shieldDef = ShieldDef.shields[network];

  if (shieldDef == null || typeof shieldDef.modifiers == "undefined") {
    return ctx; //Unadorned shield
  }

  ctx.fillStyle = "black";

  for (var i = 0; i < shieldDef.modifiers.length; i++) {
    ShieldText.drawBannerText(ctx, shieldDef.modifiers[i], i);
  }

  return ctx;
}

function compoundShieldSize(dimension, bannerCount) {
  return {
    width: dimension.width,
    height: dimension.height + bannerCount * ShieldDef.bannerSizeH,
  };
}

function isValidRef(ref) {
  if (ref == null || ref.length == 0 || ref.length > 6) {
    return false;
  }
  return true;
}

/**
 * Retrieve the shield blank that goes with a particular route.  If there are
 * multiple shields for a route (different widths), it picks the best shield.
 *
 * @param {*} shieldDef - shield definition for this route
 * @param {*} routeDef - route tagging from OSM
 * @returns shield blank or null if no shield exists
 */
function getRasterShieldBlank(shieldDef, routeDef) {
  var shieldArtwork = null;
  var textLayout;
  var bannerCount = 0;
  var bounds;

  //Special case where there's a defined fallback shield when no ref is tagged
  //Example: PA Turnpike
  if (!isValidRef(routeDef.ref)) {
    return shieldDef.norefImage;
  }

  if (Array.isArray(shieldDef.backgroundImage)) {
    for (var i = 0; i < shieldDef.backgroundImage.length; i++) {
      shieldArtwork = shieldDef.backgroundImage[i];

      bounds = compoundShieldSize(shieldArtwork.data, bannerCount);
      textLayout = ShieldText.layoutShieldTextFromDef(
        routeDef.ref,
        shieldDef,
        bounds
      );
      if (textLayout.fontPx > Gfx.fontSizeThreshold * Gfx.getPixelRatio()) {
        break;
      }
    }
  } else {
    shieldArtwork = shieldDef.backgroundImage;
  }

  return shieldArtwork;
}

function textColor(shieldDef) {
  if (shieldDef != null && typeof shieldDef.textColor != "undefined") {
    return shieldDef.textColor;
  }
  return "black";
}

function drawShield(shieldDef, routeDef) {
  var ctx = null;
  var bannerCount = ShieldDef.getBannerCount(shieldDef);
  var shieldBounds = null;

  var drawnRef = routeDef.ref;

  if (drawnRef === "" && shieldDef.refsByWayName) {
    drawnRef = shieldDef.refsByWayName[wayName];
  }

  var shieldArtwork = getRasterShieldBlank(shieldDef, routeDef);
  var compoundBounds = null;

  if (shieldArtwork == null) {
    if (typeof shieldDef.backgroundDraw == "undefined") {
      //Default to drawing a rectangle if shape draw function is not specified
      shieldDef.backgroundDraw = ShieldDraw.rectangle;
    }

    let drawnShieldCtx = shieldDef.backgroundDraw(drawnRef);
    compoundBounds = compoundShieldSize(drawnShieldCtx.canvas, bannerCount);
    ctx = Gfx.getGfxContext(compoundBounds);

    ctx.drawImage(
      drawnShieldCtx.canvas,
      0,
      bannerCount * ShieldDef.bannerSizeH
    );

    shieldBounds = {
      width: drawnShieldCtx.canvas.width,
      height: drawnShieldCtx.canvas.height,
    };
  } else {
    compoundBounds = compoundShieldSize(shieldArtwork.data, bannerCount);
    ctx = Gfx.getGfxContext(compoundBounds);
    loadShield(ctx, shieldArtwork, bannerCount);
    shieldBounds = {
      width: shieldArtwork.data.width,
      height: shieldArtwork.data.height,
    };
  }

  if (
    (!isValidRef(routeDef.ref) && "norefImage" in shieldDef) ||
    (shieldDef.notext && "backgroundDraw" in shieldDef)
  ) {
    //Pictoral shield with no ref to draw
    return ctx;
  }

  if (shieldDef.notext) {
    //If the shield definition says not to draw a ref, ignore ref
    return ctx;
  }

  //The ref is valid and we're supposed to draw it
  var textLayout = ShieldText.layoutShieldTextFromDef(
    routeDef.ref,
    shieldDef,
    shieldBounds
  );

  textLayout.yBaseline += bannerCount * ShieldDef.bannerSizeH;

  ctx.fillStyle = textColor(shieldDef);
  ShieldText.drawShieldText(ctx, routeDef.ref, textLayout);

  return ctx;
}

export function missingIconHandler(map, e) {
  try {
    missingIconLoader(map, e);
  } catch (err) {
    console.error(`Exception while loading image ‘${e?.id}’:\n`, err);
  }
}

export function missingIconLoader(map, e) {
  var ctx = generateShieldCtx(e.id);
  var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  map.addImage(
    e.id,
    {
      width: ctx.canvas.width,
      height: ctx.canvas.height,
      data: imgData.data,
    },
    {
      pixelRatio: ShieldDraw.PXR,
    }
  );
}

function getShieldDef(routeDef) {
  if (routeDef == null) {
    return null;
  }

  var shieldDef = ShieldDef.shields[routeDef.network];

  if (shieldDef == null) {
    //Default to a plain white rectangle with black outline and text
    return isValidRef(routeDef.ref) ? ShieldDef.shields["default"] : null;
  }

  //Determine whether a route without a ref gets drawn
  if (
    !isValidRef(routeDef.ref) &&
    !shieldDef.notext &&
    !("norefImage" in shieldDef)
  ) {
    return null;
  }

  return shieldDef;
}

function getRouteDef(id) {
  if (id == "shield_") {
    return null;
  }

  var network_ref = id.split("\n")[1];
  var network_ref_parts = network_ref.split("=");
  var network = network_ref_parts[0];
  var ref = network_ref_parts[1];
  var wayName = id.split("\n")[2];

  return {
    network: network,
    ref: ref,
    wayName: wayName,
  };
}

function generateShieldCtx(id) {
  var routeDef = getRouteDef(id);
  var shieldDef = getShieldDef(routeDef);

  if (shieldDef == null) {
    return ShieldDraw.blank();
  }

  var ctx = drawShield(shieldDef, routeDef);

  //Add modifier plaques above shields
  drawBanners(ctx, routeDef.network);

  // Swap black with a different color for certain shields.
  // The secondary canvas is necessary here for some reason. Without it,
  // the recolored shield gets an opaque instead of transparent background.
  var colorLighten = ShieldDef.shieldLighten(routeDef);

  if (colorLighten) {
    let colorCtx = Gfx.getGfxContext(ctx.canvas);
    colorCtx.drawImage(ctx.canvas, 0, 0);
    colorCtx.globalCompositeOperation = "lighten";
    colorCtx.fillStyle = colorLighten;
    colorCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    colorCtx.globalCompositeOperation = "destination-atop";
    colorCtx.drawImage(ctx.canvas, 0, 0);
    ctx = colorCtx;
  }

  return ctx;
}

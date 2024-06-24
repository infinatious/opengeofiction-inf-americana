"use strict";

import * as Color from "../constants/color.js";

/**
 * Draws a shield with an ellipse background
 *
 * @param {*} fillColor - Color of ellipse background fill
 * @param {*} strokeColor - Color of ellipse outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of ellipse (defaults to variable-width)
 * @returns a shield definition object
 */
function ovalShield(fillColor, strokeColor, textColor, rectWidth) {
  textColor = textColor ?? strokeColor;
  return {
    shapeBlank: {
      drawFunc: "ellipse",
      params: {
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with circle background (special case of ovalShield)
 *
 * @param {*} fillColor - Color of circle background fill
 * @param {*} strokeColor - Color of circle outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @returns a shield definition object
 */
function circleShield(fillColor, strokeColor, textColor) {
  return ovalShield(fillColor, strokeColor, textColor, 20);
}

function roundedRectTextConstraint(radius) {
  return {
    constraintFunc: "roundedRect",
    options: {
      radius: radius,
    },
  };
}

function textConstraint(fxn) {
  return {
    constraintFunc: fxn,
  };
}

/**
 * Draws a shield with a rectangle background
 *
 * @param {*} fillColor - Color of rectangle background fill
 * @param {*} strokeColor - Color of rectangle outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of rectangle (defaults to variable-width)
 * @param {*} radius - Corner radius of rectangle (defaults to 2)
 * @returns a shield definition object
 */
function roundedRectShield(
  fillColor,
  strokeColor,
  textColor,
  rectWidth,
  radius
) {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "roundedRectangle",
      params: {
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
        radius: radius,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with an escutcheon background, pointed downward
 *
 * @param {*} offset - Height of curved portion
 * @param {*} fillColor - Color of escutcheon background fill
 * @param {*} strokeColor - Color of escutcheon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of escutcheon (defaults to 0)
 * @param {*} rectWidth - Width of escutcheon (defaults to variable-width)
 * @returns a shield definition object
 */
function escutcheonDownShield(
  offset,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
) {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 0;
  return {
    shapeBlank: {
      drawFunc: "escutcheon",
      params: {
        offset: offset,
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
        radius: radius,
        outlineWidth: 1,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 0 + offset / 2,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a fishhead background, pointed downward
 *
 * @param {*} fillColor - Color of fishhead background fill
 * @param {*} strokeColor - Color of fishhead outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of fishhead (defaults to variable-width)
 * @returns a shield definition object
 */
function fishheadDownShield(fillColor, strokeColor, textColor, rectWidth) {
  textColor = textColor ?? strokeColor;
  return {
    shapeBlank: {
      drawFunc: "fishhead",
      params: {
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
        outlineWidth: 1,
      },
    },
    textLayout: textConstraint("roundedRect"),
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 6,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a triangle background, pointed downward
 *
 * @param {*} fillColor - Color of triangle background fill
 * @param {*} strokeColor - Color of triangle outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of triangle (defaults to 2)
 * @param {*} rectWidth - Width of triangle (defaults to variable-width)
 * @returns a shield definition object
 */
function triangleDownShield(
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
) {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;

  return {
    shapeBlank: {
      drawFunc: "triangle",
      params: {
        pointUp: false,
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
        radius: radius,
      },
    },
    textLayout: textConstraint("triangleDown"),
    padding: {
      left: 1,
      right: 1,
      top: 2,
      bottom: 1,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a trapezoid background, with the short side on bottom
 *
 * @param {*} angle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of trapezoid background fill
 * @param {*} strokeColor - Color of trapezoid outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of trapezoid (defaults to 0)
 * @param {*} rectWidth - Width of trapezoid (defaults to variable-width)
 * @returns a shield definition object
 */
function trapezoidDownShield(
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
) {
  let angleInRadians = (angle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 0;

  return {
    shapeBlank: {
      drawFunc: "trapezoid",
      params: {
        angle: angleInRadians,
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
        radius: radius,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2 + 10 * Math.tan(angleInRadians),
      right: 2 + 10 * Math.tan(angleInRadians),
      top: 2,
      bottom: 4,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a trapezoid background, with the short side on top
 *
 * @param {*} angle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of trapezoid background fill
 * @param {*} strokeColor - Color of trapezoid outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of trapezoid (defaults to 0)
 * @param {*} rectWidth - Width of trapezoid (defaults to variable-width)
 * @returns a shield definition object
 */
function trapezoidUpShield(
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
) {
  let angleInRadians = (angle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 0;
  return {
    shapeBlank: {
      drawFunc: "trapezoid",
      params: {
        shortSideUp: true,
        angle: angleInRadians,
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
        radius: radius,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2 + 10 * Math.tan(angleInRadians),
      right: 2 + 10 * Math.tan(angleInRadians),
      top: 4,
      bottom: 2,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a diamond background
 *
 * @param {*} fillColor - Color of diamond background fill
 * @param {*} strokeColor - Color of diamond outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of diamond (defaults to 2)
 * @param {*} rectWidth - Width of diamond (defaults to variable-width)
 * @returns a shield definition object
 */
function diamondShield(fillColor, strokeColor, textColor, radius, rectWidth) {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "diamond",
      params: {
        fillColor: fillColor,
        strokeColor: strokeColor,
        radius: radius,
        rectWidth: rectWidth,
      },
    },
    textLayout: textConstraint("diamond"),
    padding: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 1,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a pentagon background, pointed upward
 *
 * @param {*} offset - Height of diagonal edges
 * @param {*} angle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of pentagon background fill
 * @param {*} strokeColor - Color of pentagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius1 - Corner radius of pointed side of pentagon (defaults to 2)
 * @param {*} radius2 - Corner radius of flat side of pentagon (defaults to 0)
 * @param {*} rectWidth - Width of pentagon (defaults to variable-width)
 * @returns a shield definition object
 */
function pentagonUpShield(
  offset,
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius1,
  radius2,
  rectWidth
) {
  let angleInRadians = (angle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius1 = radius1 ?? 2;
  radius2 = radius2 ?? 0;
  return {
    shapeBlank: {
      drawFunc: "pentagon",
      params: {
        offset: offset,
        angle: angleInRadians,
        fillColor: fillColor,
        strokeColor: strokeColor,
        radius1: radius1,
        radius2: radius2,
        rectWidth: rectWidth,
      },
    },
    textLayout: {
      constraintFunc: "rect",
    },
    padding: {
      left: 2 + ((20 - offset) * Math.tan(angleInRadians)) / 2,
      right: 2 + ((20 - offset) * Math.tan(angleInRadians)) / 2,
      top: 1 + offset / 2,
      bottom: 3,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a home plate background, pointed downward
 *
 * @param {*} offset - Height of diagonal edges
 * @param {*} fillColor - Color of home plate background fill
 * @param {*} strokeColor - Color of home plate outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius1 - Corner radius of pointed side of home plate (defaults to 2)
 * @param {*} radius2 - Corner radius of flat side of home plate (defaults to 2)
 * @param {*} rectWidth - Width of home plate (defaults to variable-width)
 * @returns a shield definition object
 */
function homePlateDownShield(
  offset,
  fillColor,
  strokeColor,
  textColor,
  radius1,
  radius2,
  rectWidth
) {
  textColor = textColor ?? strokeColor;
  radius1 = radius1 ?? 2;
  radius2 = radius2 ?? 2;
  return {
    shapeBlank: {
      drawFunc: "pentagon",
      params: {
        pointUp: false,
        offset: offset,
        angle: 0,
        fillColor: fillColor,
        strokeColor: strokeColor,
        radius1: radius1,
        radius2: radius2,
        rectWidth: rectWidth,
      },
    },
    textLayout: roundedRectTextConstraint(radius2),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 1 + offset,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a home plate background, pointed upward
 *
 * @param {*} offset - Height of diagonal edges
 * @param {*} fillColor - Color of home plate background fill
 * @param {*} strokeColor - Color of home plate outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius1 - Corner radius of pointed side of home plate (defaults to 2)
 * @param {*} radius2 - Corner radius of flat side of home plate (defaults to 2)
 * @param {*} rectWidth - Width of home plate (defaults to variable-width)
 * @returns a shield definition object
 */
function homePlateUpShield(
  offset,
  fillColor,
  strokeColor,
  textColor,
  radius1,
  radius2,
  rectWidth
) {
  textColor = textColor ?? strokeColor;
  radius1 = radius1 ?? 2;
  radius2 = radius2 ?? 2;
  return {
    shapeBlank: {
      drawFunc: "pentagon",
      params: {
        pointUp: true,
        offset: offset,
        angle: 0,
        fillColor: fillColor,
        strokeColor: strokeColor,
        radius1: radius1,
        radius2: radius2,
        rectWidth: rectWidth,
      },
    },
    textLayout: roundedRectTextConstraint(radius2),
    padding: {
      left: 2,
      right: 2,
      top: 1 + offset,
      bottom: 2,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a vertically-aligned hexagon background
 *
 * @param {*} offset - Height of diagonal edges
 * @param {*} fillColor - Color of hexagon background fill
 * @param {*} strokeColor - Color of hexagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of hexagon (defaults to 2)
 * @param {*} rectWidth - Width of hexagon (defaults to variable-width)
 * @returns a shield definition object
 */
function hexagonVerticalShield(
  offset,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
) {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "hexagonVertical",
      params: {
        offset: offset,
        fillColor: fillColor,
        strokeColor: strokeColor,
        radius: radius,
        rectWidth: rectWidth,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2,
      right: 2,
      top: 1 + offset,
      bottom: 1 + offset,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a horizontally-aligned hexagon background
 *
 * @param {*} angle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of hexagon background fill
 * @param {*} strokeColor - Color of hexagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of hexagon (defaults to 2)
 * @param {*} rectWidth - Width of hexagon (defaults to variable-width)
 * @returns a shield definition object
 */
function hexagonHorizontalShield(
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
) {
  let angleInRadians = (angle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "hexagonHorizontal",
      params: {
        angle: angleInRadians,
        fillColor: fillColor,
        strokeColor: strokeColor,
        radius: radius,
        rectWidth: rectWidth,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 2,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with an octagon background
 *
 * @param {*} offset - Height of diagonal edges
 * @param {*} angle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of octagon background fill
 * @param {*} strokeColor - Color of octagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of octagon (defaults to 2)
 * @param {*} rectWidth - Width of octagon (defaults to variable-width)
 * @returns a shield definition object
 */
function octagonVerticalShield(
  offset,
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
) {
  let angleInRadians = (angle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "octagonVertical",
      params: {
        offset: offset,
        angle: angleInRadians,
        fillColor: fillColor,
        strokeColor: strokeColor,
        radius: radius,
        rectWidth: rectWidth,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor: textColor,
  };
}

/**
 * Draws a shield with a pill-shaped background
 *
 * @param {*} fillColor - Color of pill background fill
 * @param {*} strokeColor - Color of pill outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of pill (defaults to variable-width)
 * @returns a shield definition object
 */
function pillShield(fillColor, strokeColor, textColor, rectWidth) {
  textColor = textColor ?? strokeColor;
  return {
    shapeBlank: {
      drawFunc: "roundedRectangle",
      params: {
        fillColor: fillColor,
        strokeColor: strokeColor,
        rectWidth: rectWidth,
        radius: 10,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor: textColor,
  };
}

/**
 * Draws a circle icon inside a black-outlined white square shield
 *
 * @param {*} fillColor - Color of circle icon background fill
 * @param {*} strokeColor - Color of circle icon outline
 * @returns a shield definition object
 */
function paBeltShield(fillColor, strokeColor) {
  return {
    notext: true,
    shapeBlank: {
      drawFunc: "paBelt",
      params: {
        fillColor: fillColor,
        strokeColor: strokeColor,
      },
    },
  };
}

/**
 * Draws a rectangle icon inside a white-outlined green square shield
 *
 * @param {*} fillColor - Color of rectangle icon background fill
 * @param {*} strokeColor - Color of rectangle icon outline
 * @returns a shield definition object
 */
function bransonRouteShield(fillColor, strokeColor) {
  return {
    notext: true,
    shapeBlank: {
      drawFunc: "branson",
      params: {
        fillColor: fillColor,
        strokeColor: strokeColor,
      },
    },
  };
}

/**
 * Adds banner text above a shield
 *
 * @param {*} baseDef - Shield definition object
 * @param {*} banners - Array of strings to be displayed above shield
 * @returns a shield definition object
 */
function banneredShield(baseDef, banners) {
  return {
    banners: banners,
    ...baseDef,
  };
}

export function loadShields() {
  const shields = {};

  // Multi-use shields

  // Triangle shields
  let triangleConvexDownShield = {
    spriteBlank: ["shield_tri_convex_2", "shield_tri_convex_3"],
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 1,
      bottom: 5,
    },
  };

  let triangleConvexDownShieldBlue = {
    ...triangleConvexDownShield,
    textColor: Color.shields.white,
    colorLighten: Color.shields.white,
    colorDarken: Color.shields.blue,
  };

  let triangleConvexDownShieldRedBlue = {
    ...triangleConvexDownShieldBlue,
    colorLighten: Color.shields.blue,
    colorDarken: Color.shields.red,
  };

  let triangleConvexUpShield = {
    ...triangleConvexDownShield,
    verticalReflect: true,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 1,
    },
  };

  // Other common shield shapes
  let badgeShield = {
    spriteBlank: ["shield_badge_2", "shield_badge_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 4,
      bottom: 5,
    },
  };

  let badgeShieldCrossbar = {
    spriteBlank: ["shield_badge_crossbar_2", "shield_badge_crossbar_3"],
    textColor: Color.shields.black,
    padding: {
      left: 1,
      right: 1,
      top: 6,
      bottom: 4,
    },
  };

  // Default

  shields["default"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

//  shields["default"] = {
//    textColor: Color.shields.black,
//    textHaloColor: Color.backgroundFill,
//    padding: {
//      left: 3,
//      right: 3,
//      top: 3,
//      bottom: 3,
//    },
//  };
//
// - OPENGEOFICTION
// NORTH ARCHANTA
  // Lutang

  // Temporarily duplicated while waiting for vector tiles to be
  // rerendered, the 2023-09-19 tiles still use Lutang Trunks as the
  // network
  shields["Lutang Trunks"] = {
    spriteBlank: "shield_lutang_n",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 2,
    },
  };

  shields["Lutang:N"] = {
    spriteBlank: "shield_lutang_n",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 2,
    },
  };

  shields["Lutang:E"] = hexagonHorizontalShield(
    30,
    Color.shields.yellow,
    Color.shields.black
  );

  shields["Lutang:WS"] = {
    spriteBlank: "shield_lutang_ws",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 4,
    },
  };

  shields['Lutang:KT'] = {
    spriteBlank: "shield_lutang_kt",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 1,
      right: 10,
      top: 10,
      bottom: 1,
    },
  };

  shields['Lutang:BB'] = {
    spriteBlank: "shield_lutang_bb",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 3,
      bottom: 3,
    },
  }

  // SOUTH ARCHANTA
  // Federal States of Archanta
  // Federal States Motorway Network
  shields["FSA:FS"] = {
    spriteBlank: "shield_fsa_fs",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.fsa_fs,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
  };

  // Tempache
  shields["FSA:TM"] = homePlateDownShield(
    5,
    Color.shields.white,
    Color.shields.black
  );

  // Sierra
  shields["FSA:S"] = diamondShield(
    Color.shields.black,
    Color.shields.white,
    Color.shields.white,
    2,
    24
  );

  //Apawiland
  shields["FSA:AW"] = diamondShield(
    "hsl(359, 43%, 19%)",
    "hsl(45, 89%, 63%)",
    "hsl(45, 89%, 63%)",
    2,
    24
  );

  // Mennowa
  shields["FSA:ME"] = {
    spriteBlank: "shield_fsa_me",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
  };
  shields["FSA:M"] = {
    spriteBlank: "shield_fsa_me",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
  };

  //Alormen
  shields["FSA:AL"] = {
    spriteBlank: "shield_fsa_al",
    textColor: Color.shields.black,
    padding: {
      left: 5,
      right: 2,
      top: 2,
      bottom: 2,
    },
  };

  //Clamash
  shields["FSA:CL"] = {
    spriteBlank: "shield_fsa_cl",
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 2,
    },
  };

  //Riopoderos
  shields["FSA:RP"] = {
    spriteBlank: "shield_fsa_rp",
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 2,
    },
  };
  shields["FSA:RS"] = {
    spriteBlank: "shield_fsa_rp",
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 2,
    },
  };

  //W Massodeya
  shields["FSA:WM"] = {
    spriteBlank: "shield_fsa_wm",
    textColor: Color.shields.black,
    padding: {
      left: 5,
      right: 2,
      top: 1,
      bottom: 5,
    },
  };

  //Makaska
  shields["FSA:MK"] = {
    spriteBlank: "shield_fsa_mk",
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 5,
      bottom: 4,
    },
  };

  //Michisaukee
  shields["FSA:MC"] = {
    spriteBlank: "shield_fsa_mc",
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 3,
    },
  };

  //Wisecota
  shields["FSA:WI"] = {
    spriteBlank: "shield_fsa_wi",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 3,
    },
  };

  //Penquisset
  shields["FSA:PQ"] = {
    spriteBlank: "shield_fsa_pq",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 3,
    },
  };
  // Other states as circles for now
  shields["FSA:Z"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:WA"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:TA"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:TN"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:AC"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:HY"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:IL"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:OA"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:PM"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:TI"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:SN"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:NC"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:OQ"] = pillShield(Color.shields.white, Color.shields.black);
  shields["FSA:AG"] = pillShield(Color.shields.white, Color.shields.black);


  // RTC
  shields["FSA:RTC"] = {
    spriteBlank: "shield_fsa_rtc",
    notext: true,
  };

  return {
    networks: shields,
    options: {
      bannerTextColor: Color.palette.black,
      bannerTextHaloColor: Color.backgroundFill,
      bannerHeight: 9,
      bannerPadding: 1,
      shieldFont:
      '"Noto Sans Condensed", "Noto Sans Armenian Condensed", "sans-serif-condensed", "Arial Narrow", sans-serif',
      shieldSize: 20,
    },
  };
}

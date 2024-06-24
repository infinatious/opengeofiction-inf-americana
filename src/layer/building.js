"use strict";

export const building = {
  id: "building",
  type: "fill-extrusion",
  paint: {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13,
      `hsl(210, 7%, 87%)`,
      16,
      `hsl(210, 7%, 80%)`,
    ],
    "fill-extrusion-height": {
      "property": "render_height",
      "type": "identity"
    },
    "fill-extrusion-base": {
      "property": "render_min_height",
      "type": "identity"
    },
    "fill-extrusion-opacity": 0.95,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "building",
};

export const highwayarea = {
    "id": "highwayarea",
    "type": "fill",
    "source": "openmaptiles",
    "source-layer": "transportation",
    "filter": [
      "all",
      ["==", "$type", "Polygon"],
      ["!in", "class", "pier"]
    ],
    "layout": {"visibility": "visible"},
    "paint": {
      "fill-antialias": false,
      "fill-color": "hsla(0, 0%, 89%, 0.56)",
      "fill-opacity": 0.9,
      "fill-outline-color": "#cfcdca"
    }
  }

export const legendEntries = [
  {
    description: "Building",
    layers: [building.id],
  },
];

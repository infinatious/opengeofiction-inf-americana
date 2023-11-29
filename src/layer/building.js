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

export const legendEntries = [
  {
    description: "Building",
    layers: [building.id],
  },
];

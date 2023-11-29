"use strict";

import * as Color from "../constants/color.js";

export const urbanizedArea = {
  id: "urbanized-area",
  type: "fill",
  minzoom: 4,
  maxzoom: 6,
  filter: ["==", ["get", "class"], "residential"],
  paint: {
    "fill-color": [
      "interpolate-lab",
      ["linear"],
      ["zoom"],
      4,
      "hsl(41, 90%, 85%)",
      5,
      "hsl(41, 90%, 80%)",
      5.5,
      "hsl(41, 90%, 80%)",
      6,
      Color.backgroundFill,
    ],
  },
  source: "openmaptiles",
  "source-layer": "landuse",
};

export const legendEntries = [
  {
    description: "Urban area",
    layers: [urbanizedArea.id],
  },
];

export const residential = {
  "id": "landuse-residential",
  "type": "fill",
  "source": "openmaptiles",
  "source-layer": "landuse",
  "filter": [
    "all",
    [
      "in",
      "class",
      "residential",
      "suburb",
      "neighbourhood"
    ]
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": {
      "base": 1,
      "stops": [
        [10, "hsla(30, 10%, 99%, 1)"],
        [12, "hsla(30, 17%, 95%, 0.97)"],
        [16, "hsla(30, 19%, 95%, 0.95)"]
      ]
    }
  }
}


export const industrial = {
  "id": "landuse-industrial",
  "type": "fill",
  "source": "openmaptiles",
  "source-layer": "landuse",
  "filter": [
    "all",
    ["==", "$type", "Polygon"],
    [
      "in",
      "class",
      "industrial",
      "garages",
      "dam"
    ]
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": "rgba(224, 210, 243, 0.34)"
  }
}

export const retail = {
    "id": "landuse-retail",
    "type": "fill",
    "source": "openmaptiles",
    "source-layer": "landuse",
    "filter": [
      "all",
      ["==", "$type", "Polygon"],
      ["in", "class", "retail"]
    ],
    "layout": {"visibility": "visible"},
    "paint": {
      "fill-color": "rgba(247, 221, 240, 0.34)"
    }
  }

  export const commercial = {
    "id": "landuse-commercial",
    "type": "fill",
    "source": "openmaptiles",
    "source-layer": "landuse",
    "filter": [
      "all",
      ["==", "$type", "Polygon"],
      ["in", "class", "commercial"]
    ],
    "layout": {"visibility": "visible"},
    "paint": {
      "fill-color": "hsla(60, 13%, 91%, 0.99)"
    }
  }

export const school = {
    "id": "landuse-school",
    "type": "fill",
    "source": "openmaptiles",
    "source-layer": "landuse",
    "filter": [
      "all",
      [
        "in",
        "class",
        "school",
        "education",
        "college",
        "university"
      ]
    ],
    "paint": {
      "fill-color": "rgba(248, 248, 232, 1)"
    }
  }

export const sports = {
  "id": "landuse-sports",
"type": "fill",
"metadata": {
  "mapbox:group": "1444849388993.3071"
},
"source": "openmaptiles",
"source-layer": "landuse",
"filter": [
  "all",
  [
    "in",
    "class",
    "stadium",
    "pitch",
    "track",
    "stadium"
  ]
],
"layout": {"visibility": "visible"},
"paint": {
  "fill-color": "rgba(203, 243, 219, 1)",
  "fill-opacity": 0.7,
  "fill-outline-color": "rgba(6, 143, 60, 1)"
}
}

export const quarry = {
  "id": "landuse-quarry",
  "type": "fill",
  "metadata": {
    "mapbox:group": "1444849388993.3071"
  },
  "source": "openmaptiles",
  "source-layer": "landuse",
  "filter": [
    "all",
    ["in", "class", "quarry"]
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": "rgba(208, 208, 208, 1)",
    "fill-opacity": 0.7,
    "fill-outline-color": "rgba(130, 137, 133, 1)"
  }
}

export const cemetery = {
  "id": "landuse-cemetery",
  "type": "fill",
  "metadata": {
    "mapbox:group": "1444849388993.3071"
  },
  "source": "openmaptiles",
  "source-layer": "landuse",
  "filter": ["==", "class", "cemetery"],
  "paint": {
    "fill-color": "rgba(231, 237, 215, 1)"
  }
}

export const military = {
  "id": "landuse-military",
  "type": "fill",
  "source": "openmaptiles",
  "source-layer": "landuse",
  "filter": [
    "all",
    ["in", "class", "military"]
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": "rgba(243, 210, 203, 1)",
    "fill-opacity": 0.4,
    "fill-outline-color": "rgba(52, 2, 8, 1)"
  }
}
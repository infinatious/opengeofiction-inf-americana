"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

export const fill = {
  id: "protected-area_fill",
  type: "fill",
  paint: {
    "fill-color": Color.parkFill,
  },
  source: "openmaptiles",
  "source-layer": "park",
};

export const outline = {
  id: "protected-area_outline",
  type: "line",
  paint: {
    "line-color": Color.parkOutline,
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};

export const label = {
  id: "protected-area_label",
  type: "symbol",
  filter: ["has", "rank"],
  paint: {
    "text-color": Color.parkLabel,
    "text-halo-blur": 1,
    "text-halo-color": Color.parkLabelHalo,
    "text-halo-width": 1,
  },
  layout: {
    "text-field": Label.localizedName,
    "text-font": ["Americana-Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  "source-layer": "park",
};

export const parkFill = {
  ...fill,
  id: "park_fill",
  filter: ["==", ["get", "subclass"], "park"],
  "source-layer": "landcover",
};

export const parkOutline = {
  ...outline,
  id: "park_outline",
  filter: ["==", ["get", "subclass"], "park"],
  "source-layer": "landcover",
};

export const parkLabel = {
  ...label,
  id: "park_label",
  filter: ["==", ["get", "class"], "park"],
  "source-layer": "poi",
};

export const legendEntries = [
  {
    description: "Park",
    layers: [fill.id, outline.id, parkFill.id, parkOutline.id],
  },
];

export const sandFill = {
  id: "sand_fill",
  type: "fill",
  paint: {
    "fill-color": Color.sandFill
  },
  source: "openmaptiles",
  filter: ["==", ["get", "class"], "sand"],
  "source-layer": "landcover",
};

export const grassFill = {
  id: "grass_fill",
  type: "fill",
  paint: {
    "fill-color": Color.grassFill
  },
  source: "openmaptiles",
  "filter": [
    "all",
    ["==", "class", "grass"],
    [
      "!in",
      "subclass",
      "heath",
      "scrub"
    ]
  ],
  "source-layer": "landcover",
};

export const heath = {
  "id": "landcover-heath",
  "type": "fill",
  "source": "openmaptiles",
  "source-layer": "landcover",
  "filter": [
    "all",
    ["==", "class", "grass"],
    ["==", "subclass", "heath"]
  ],
  "paint": {
    "fill-color": Color.grassFill,
    "fill-opacity": 1
  }
}

export const scrub = {
  "id": "landcover-scrub",
  "type": "fill",
  "source": "openmaptiles",
  "source-layer": "landcover",
  "filter": [
    "all",
    ["==", "class", "grass"],
    ["==", "subclass", "scrub"]
  ],
  "paint": {
    "fill-color": "rgba(180, 236, 208, 1)",
    "fill-opacity": 1
  }
}

export const woodFill = {
  id: "wood_fill",
  type: "fill",
  paint: {
    "fill-color": Color.woodFill
  },
  source: "openmaptiles",
  filter: ["==", ["get", "class"], "wood"],
  "source-layer": "landcover",
};

export const farmland = {
  "id": "landcover-farmland",
  "type": "fill",
  "metadata": {
    "mapbox:group": "1444849388993.3071"
  },
  "source": "openmaptiles",
  "source-layer": "landcover",
  "filter": [
    "all",
    ["==", "class", "farmland"]
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": "rgba(212, 248, 225, 1)",
    "fill-opacity": 1
  }
}

export const wetland = {
  "id": "landcover-wetland-color",
  "type": "fill",
  "metadata": {
    "mapbox:group": "1444849388993.3071"
  },
  "source": "openmaptiles",
  "source-layer": "landcover",
  "filter": [
    "all",
    ["==", "class", "wetland"]
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": "rgba(168, 238, 211, 1)",
    "fill-opacity": 0.8
  }
}

export const rock = {
  "id": "landcover-rock",
  "type": "fill",
  "metadata": {
    "mapbox:group": "1444849388993.3071"
  },
  "source": "openmaptiles",
  "source-layer": "landcover",
  "filter": [
    "all",
    ["==", "class", "rock"]
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": "rgba(224, 228, 223, 1)",
    "fill-opacity": 0.7
  }
}

export const glacier = {
  "id": "landcover-glacier",
  "type": "fill",
  "metadata": {
    "mapbox:group": "1444849388993.3071"
  },
  "source": "openmaptiles",
  "source-layer": "landcover",
  "filter": [
    "==",
    "subclass",
    "glacier"
  ],
  "layout": {"visibility": "visible"},
  "paint": {
    "fill-color": "#fff",
    "fill-opacity": {
      "base": 1,
      "stops": [[0, 0.9], [10, 0.3]]
    }
  }
}
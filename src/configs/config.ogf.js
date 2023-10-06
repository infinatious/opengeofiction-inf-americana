"use strict";

/*
This style requires a vector tile server to run.
This configuration is for running with MapTiler Cloud.

Visit MapTiler Cloud and create an account/log in:
https://cloud.maptiler.com/maps/

Go to Account->Keys and create a key to paste here:
*/
//const MAPTILER_KEY = "<your MapTiler key>";

const OPENMAPTILES_URL = `https://ogfvector.infinatio.us/data/openmaptiles.json`
const ATTRIBUTION_LOGO = `
<a href="https://opengeofiction.net">
  <img src="https://opengeofiction.net/assets/osm_logo-d621af7a73a07ad6abb9617a9ab397682b788b9d90221afa998a0f1744b7295a.svg"
  alt="OGF logo"
  width=40
  style="padding: 10px;"
  />
</a>`;
const ATTRIBUTION_TEXT =
  '<a href="https://opengeofiction.net" target="_blank">&copy; OpenGeofiction contributors</a>';

/*
The following two variables override the color of the bounding box and halo of
shield text, respectively. Useful while testing shield design changes.
Both accept an HTML color name, hex code, or other CSS color value.
*/
const SHIELD_TEXT_BBOX_COLOR = null;
const SHIELD_TEXT_HALO_COLOR_OVERRIDE = null;

export default {
  OPENMAPTILES_URL,
  ATTRIBUTION_LOGO,
  ATTRIBUTION_TEXT,
  SHIELD_TEXT_BBOX_COLOR,
  SHIELD_TEXT_HALO_COLOR_OVERRIDE,
};

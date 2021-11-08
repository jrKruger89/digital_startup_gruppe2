"use strict";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamVzcGVyLXItayIsImEiOiJja3ZxZ295ZXQ4ZmF0Mm5xd2xpZjg2d2Z6In0.T9hZCCVB0ZFLIeN0o12OYA";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const nodeGeocoder = require("node-geocoder");

const geoCoder = nodeGeocoder({
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
});

module.exports = geoCoder;

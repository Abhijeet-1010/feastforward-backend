const axios = require("axios");

const geocodeAddress = async (address) => {
  try {
    const res = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
        params: {
        q: `${address}, Tamil Nadu, India`,
        format: "json",
        limit: 1
        },
        headers: {
        "User-Agent": "FeastForward-App"
        }
    }
    );

    if (res.data.length === 0) {
        throw new Error("Location not found from geocoding API");
}

    return {
      lat: parseFloat(res.data[0].lat),
      lng: parseFloat(res.data[0].lon)
    };

  } catch (err) {
    throw err;
  }
  console.log("GEOCODE RESPONSE:", res.data);
};

module.exports = geocodeAddress;
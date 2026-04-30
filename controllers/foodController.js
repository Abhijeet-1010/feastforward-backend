const Food = require("../models/Food");
const geocodeAddress = require("../utils/geocode");
const User = require("../models/User");

// add food donation
const addFood = async (req, res) => {
  try {
    const { donorName, foodType, quantity, location, expiryTime } = req.body;

    // 🔥 convert address → lat/lng
    const coords = await geocodeAddress(location);

    const food = new Food({
      donorName,
      foodType,
      quantity,
      location: {
        address: location,
        lat: coords.lat,
        lng: coords.lng
      },
      expiryTime
    });

    await food.save();

    res.json({ message: "Food added", food });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all food donations
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const ngo = await User.findOne({ role: "ngo" });

    console.log("NGO LOCATION:", ngo.location);
    
    const ngoCoords = await geocodeAddress(ngo.location);
    food.status = "claimed";
    food.claimedBy = ngo._id;

    // 🔥 FORCE STRING STORAGE
    // 🔥 convert NGO address → lat/lng

    food.ngoLocation = {
      address: ngo.location,
      lat: ngoCoords.lat,
      lng: ngoCoords.lng
    };

    await food.save();

    console.log("SAVED NGO LOCATION:", food.ngoLocation);

    res.json({ message: "Food claimed successfully", food });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deliverFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.status = "delivered";

    await food.save();

    res.json({ message: "Food delivered", food });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.body;

    const food = await Food.findById(req.params.id);

    food.assignedVolunteer = volunteerId;

    await food.save();

    res.json({ message: "Volunteer assigned", food });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFood, getFoods, claimFood, deliverFood, assignVolunteer };
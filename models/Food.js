const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    location: {
        address: {
        type: String,
        required: true
     },
    lat: Number,
    lng: Number
},
    expiryTime: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "available"
    },
    assignedVolunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    ngoLocation: {
        address: String,
        lat: Number,
        lng: Number
}
});

module.exports = mongoose.model("Food", foodSchema);
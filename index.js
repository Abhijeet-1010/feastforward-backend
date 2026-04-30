require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");

const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
// middleware
app.use(cors());
app.use(express.json());

// database connection
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("FeastForward API running");
});
app.use("/api/food", foodRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
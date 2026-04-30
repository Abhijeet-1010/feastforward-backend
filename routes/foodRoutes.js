const express = require("express");
const router = express.Router();

const { addFood, getFoods , claimFood , deliverFood , assignVolunteer } = require("../controllers/foodController");

router.post("/add", addFood);
router.get("/all", getFoods);
router.put("/claim/:id", claimFood);
router.put("/deliver/:id", deliverFood);
router.put("/assign/:id", assignVolunteer);

module.exports = router;
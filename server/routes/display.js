const router = require("express").Router();
const { Vehicle } = require("../models/vehicle");

router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("owner", "names email");
    res.render("vehicles", { vehicles });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

const router = require("express").Router();
const { Vehicle, validate } = require("../models/vehicle");
const { Owner } = require("../models/carOwner");

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     description: Retrieve all vehicles from the server.
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of vehicles.
 *       500:
 *         description: Internal server error.
 */
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate("owner", "names email");
    res.status(200).send({ vehicles });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Register a new vehicle
 *     description: Register a new vehicle with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: Vehicle registered successfully.
 *       400:
 *         description: Invalid request payload.
 *       409:
 *         description: Vehicle with the given plate number already exists.
 *       404:
 *         description: Owner not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const vehicle = await Vehicle.findOne({ plateNumber: req.body.plateNumber });
    if (vehicle)
      return res
        .status(409)
        .send({ message: "Vehicle with given plateNumber already exists!" });

    const owner = await Owner.findOne({ nationalId: req.body.owner });
    if (!owner)
      return res.status(404).send({ message: "Owner not found!" });

    const newVehicle = new Vehicle({
      ...req.body,
      owner: owner._id
    });
    await newVehicle.save();
    res.status(201).send({ message: "Vehicle registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     description: Delete a vehicle by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the vehicle to delete.
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully.
 *       404:
 *         description: Vehicle not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle)
      return res.status(404).send({ message: "Vehicle not found" });

    res.status(200).send({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/vehicles/{id}:
 *   update:
 *     summary: Update a vehicle
 *     description: Update a vehicle by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the vehicle to update.
 *     responses:
 *       200:
 *         description: Vehicle updated successfully.
 *       404:
 *         description: Vehicle not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle)
      return res.status(404).send({ message: "Vehicle not found" });

    res.status(200).send({ message: "Vehicle updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;


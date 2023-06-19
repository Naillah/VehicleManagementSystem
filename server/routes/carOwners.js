const router = require("express").Router();
const { Owner, validate } = require("../models/carOwner");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * /api/owner:
 *   post:
 *     summary: Create a new owner
 *     description: Create a new owner with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       201:
 *         description: Owner created successfully.
 *       400:
 *         description: Invalid request payload.
 *       409:
 *         description: Owner with the given national ID already exists.
 *       500:
 *         description: Internal server error.
 */
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const owner = await Owner.findOne({ nationalId: req.body.nationaId });
    if (owner)
      return res
        .status(409)
        .send({ message: "Owner with given nationalId already Exist!" });

    await new Owner({ ...req.body }).save();
    res.status(201).send({ message: "Owner created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /api/owner:
 *   get:
 *     summary: Get all owners
 *     description: Retrieve all owners from the server.
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of owners.
 *       500:
 *         description: Internal server error.
 */
router.get("/", async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).send({ owners });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

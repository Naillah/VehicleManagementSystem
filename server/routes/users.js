const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: User registration
 *     description: Create a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid request payload.
 *       409:
 *         description: User with the given email already exists.
 *       500:
 *         description: Internal server error.
 */
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const vehicleRoutes= require("./routes/vehicles");
const carOwners = require("./routes/carOwners");
const vehicles= require("./routes/vehicles");
const swaggerSetup = require('./swagger');


swaggerSetup(app);

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes)
app.use("/api/owner", carOwners)
app.use("/api/vehicles", vehicles)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

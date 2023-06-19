const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const vehicleSchema = mongoose.Schema({
  chasisNumber: { type: String, required: true },
  manufacturerCompany: { type: String, required: true },
  manufactureYear: { type: Number, required: true },
  price: { type: Number, required: true },
  plateNumber: { type: String, required: true },
  modelName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
});

vehicleSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

const validate = (data) => {
  const schema = Joi.object({
    chasisNumber: Joi.string().required().label("Chasis Number"),
    manufacturerCompany: Joi.string().required().label("Manufacturer Company"),
    manufactureYear: Joi.number().integer().required().label("Manufacture Year"),
    price: Joi.number().required().label("Price"),
    plateNumber: Joi.string().required().label("Vehicle Plate Number"),
    modelName: Joi.string().required().label("Model Name"),
    owner: Joi.string().required().label("Owner"),
  });
  return schema.validate(data);
};

module.exports = { Vehicle, validate };

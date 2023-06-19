const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const carOwnerSchema = mongoose.Schema({
  names: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nationalId: { type: String, required: true },
});

carOwnerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const Owner = mongoose.model("Owner", carOwnerSchema);

const validate = (data) => {
  const schema = Joi.object({
    names: Joi.string().required().label("Names"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().required().label("Phone"),
    nationalId: Joi.string().required().label("National ID"),
  });
  return schema.validate(data);
};

module.exports = { Owner, validate };

const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    reg_no: {
      type: String,
      required: true,
      unique: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: "",
    },
    contact_no: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", RequestSchema);

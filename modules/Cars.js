const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carsSchema = new Schema(
  {
    name: String,
    model: String,
    driverName: String,
  },
  {
    timestamps: true,
  }
);

const Cars = mongoose.model("Cars", carsSchema);

module.exports = Cars;

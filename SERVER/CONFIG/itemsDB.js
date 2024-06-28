const dotenv = require("dotenv");
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECT_DB_STR);
dotenv.config();

const itemSchema = new mongoose.Schema(
  {
    vendorNm: {
      type: String,
      required: true,
    },
    itemNm: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    weight: {
      type: String,
      require: true,
    },
    vendorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      get: function (value) {
        return value.toISOString().split("T")[0]; // Return only the date part
      },
      set: function (value) {
        return new Date(value); // Ensure the date is stored without time
      },
    },
  },
  {
    toJSON: { getters: true }, // Ensure getters are applied when converting to JSON
    toObject: { getters: true }, // Ensure getters are applied when converting to plain object
  }
);


const itemsModel = mongoose.model("items", itemSchema);

module.exports = itemsModel;

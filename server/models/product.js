const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  illustration: {
    type: String
  },
  potrait: {
    type: String
  },
  cost: {
    type: Number,
    require: true,
    min: 1.00
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
});

const product = mongoose.model("product", productSchema);

module.exports = product;

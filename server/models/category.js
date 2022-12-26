const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const category = mongoose.model("Category", categorySchema);

module.exports = category;

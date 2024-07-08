const mongoose = require("mongoose");
const validator = require("validator");

const chategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a valid category name"],
      lowercase: true,
      unique: true,
    },
    description: String,
    imgUrl: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
  },
  {
    timeStamps: true,
  }
);

const Category = mongoose.model("Chategory", chategorySchema);
module.exports = Category;

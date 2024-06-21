const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Product price can't be negative"]
      },
      quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity can't be negative"]
      },
      category: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: {
          values: ["in-stock", "out-of-stock", "discontinued"],
          message: " status can't be {VALUE} "
        },
      },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid image Urls",
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    store: {
        name: {
          type: String,
          trim: true,
          required: [true, "Please provide a store name"],
          lowercase: true,
          enum: {
            values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
            message: "{VALUE} is not a valid name"
          }
        },
        id: {
          type: ObjectId,
          required: true,
          ref: 'Store'
        }
      },
      suppliedBy: {
        name: {
          type: String,
          trim: true,
          required: [true, "Please provide a supplier name"],
        },
        id: {
          type: ObjectId,
          ref: 'Supplier'
        }
      },
  },
  {
    timestamps: true,
  }
);
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;

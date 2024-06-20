const mongoose = require('mongoose');


const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,
        unique: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too large"],
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
      },
      unit: {
        type: String,
        required: true,
        enum: {
          values: ["kg", "litre", "pcs", "bag"],
          message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
        },
      },
      quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
          validator: (value) => {
            const isInteger = Number.isInteger(value);
            if (isInteger) {
              return true;
            } else {
              return false;
            }
          },
        },
        message: "Quantity must be an integer",
      },
      status: {
        type: String,
        enum: {
          values: ["in-stock", "out-of-stock", "discontinued"],
          message: "status can't be {VALUE}",
        },
      },
      // createdAt: {
      //   type: Date,
      //   default: Date.now
      // },
      // updatedAt: {
      //   type: Date,
      //   default: Date.now
      // }
  
      // supplier: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Supplier",
      // },
      // chategories: [
      //   {
      //     name: {
      //       type: String,
      //       required: true,
      //     },
      //     _id: mongoose.Schema.Types.ObjectId,
      //   },
      // ],
    },
    {
      timestamps: true,
    }
  );
  
  //TODO: mongoose middlewares  for saving date: pre / post
  
  productSchema.pre("save", function (next) {
    console.log("before saving data");
    if (this.quantity === 0) {
      this.status = "out-of-stock";
    }
    next();
  });
  
  productSchema.post("save", function (doc, next) {
    console.log("after saving data");
  
    next();
  });
  
  productSchema.methods.logger = function () {
    console.log(`data saved for ${this.name}`);
  };
  const Product = mongoose.model("Product", productSchema);

  module.exports = Product;
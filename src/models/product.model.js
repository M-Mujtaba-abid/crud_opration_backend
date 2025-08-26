import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Product title must be at least 3 characters long"],
      maxlength: [100, "Product title cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    discount: {
      type: Number,
      default: 0, 
      min: [0, "Discount cannot be less than 0"],
      max: [100, "Discount cannot exceed 100"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required (owner of the product)"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

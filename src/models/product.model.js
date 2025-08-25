import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  discount: {
      type: Number,
      default: 0,     // 0% by default
      min: 0,
      max: 100,
    },
    userId:{
      type:  Schema.Types.ObjectId,
      ref:"User",
      required: true
    }
  
}, {timestamps:true});

export const Product = mongoose.model("Product", productSchema);

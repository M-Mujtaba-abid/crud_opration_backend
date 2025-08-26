import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: [3, "User name must be at least 3 characters long"],
      maxlength: [30, "User name cannot be more than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // jab find() kare to password default me return na ho
    },
  },
  { timestamps: true }
);

// JWT generator method
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this.id,
      userName: this.userName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_expiry,
    }
  );
};

export const User = mongoose.model("User", userSchema);

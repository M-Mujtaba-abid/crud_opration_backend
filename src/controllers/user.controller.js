import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { comparePassword, hashPassword } from "../utils/Encyption.js";

const RegisterUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new ApiError(400, "user name and email is required");
  }

  const alreadyExistingUser = await User.findOne({ email });
  if (alreadyExistingUser) {
    throw new ApiError(405, "user already exist with this email");
  }
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json(new ApiResponse(201, user, "user successfuly register "));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(401, "email and password is required for login");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "this email can,not exist plz do  signup");
  }

  const isMatched = await comparePassword(password, user.password);
  if (!isMatched) {
    throw new ApiError(404, "password does not match");
  }

  const token = user.generateJWT();
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // sirf https pe chalegi
    sameSite: "strict", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
  });
  // console.log("Entered password:", password);
  // console.log("DB password:", user?.password);

  return res.status(200).json(new ApiResponse(200, user, token, "Login successful"));
});

export { RegisterUser, loginUser };

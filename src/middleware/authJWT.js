import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.user = await User.findById(decoded.id).select("-password"); // user attach kardo
      next();
    } catch (error) {
      throw new ApiError(401, "Not authorized, invalid token");
    }
  } else {
    throw new ApiError(401, "Not authorized, no token");
  }
});

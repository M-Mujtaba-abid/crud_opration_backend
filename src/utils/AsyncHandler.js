// src/middlewares/asyncHandler.js
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);  // error ko central error handler me bhej dega
  };
};

export default asyncHandler;

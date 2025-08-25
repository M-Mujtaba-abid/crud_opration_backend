import { Product } from "../models/product.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
// import User from "../models/user.model.js"

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, category, stock } = req.body;

  if (!title || !price || !description || !category || !stock) {
    throw new ApiError(404, " all feilds are required ");
  }
  console.log("req.user:", req.user);

  const product = await Product.create({
    title,
    price,
    description,
    category,
    stock,
    userId: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "product added succesfully", product));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const { category } = req.query; // user se category le lo (e.g. ?category=Mobile)

  let filter = { userId: req.user._id }; // default khali filter
  if (category) {
    filter.category = category; // agar user ne diya he to filter apply ho ga
  }

  const product = await Product.find(filter);

  //category
  if (category && product.length === 0) {
    throw new ApiError(404, `No products found for category: ${category}`);
  }

  if (!product) {
    throw new ApiError(500, "product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "get all products successfully", product));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedDataOFproduct = req.body;

  if (!id) {
    throw new ApiError(400, "Product ID is required");
  }

  const product = await Product.findByIdAndUpdate(
    { _id: id, userId: req.user._id },
    updatedDataOFproduct,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated successfully", product));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete({
    _id: id,
    userId: req.user._id, // ownership check
  });

  if (!product) {
    throw new ApiError(400, "product not found ");
  }
  res.status(200).json(new ApiResponse(200, "product", product));
});

const categoryFilter = asyncHandler(async (req, res) => {
  const { category } = req.query;

  if (!category) {
    throw new ApiError(400, " category is required to filter by category");
  }

  const product = await Product.find({
    category: { $regex: new RegExp(category, "i") },
  });

  if (product.length === 0) {
    throw new ApiError(400, `not product found by this ${category} category `);
  }

  res.status(200).json({
    success: true,
    message: `product find by this ${product} category `,
    product,
  });
});

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  categoryFilter,
};

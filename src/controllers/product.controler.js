import { Product } from "../models/product.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, category, stock } = req.body;

  if (!title || !price || !description || !category || !stock) {
    throw new ApiError(404, " all feilds are required ");
  }

  const product = await Product.create({
    title,
    price,
    description,
    category,
    stock,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "product added succesfully", product));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const { category } = req.query; // user se category le lo (e.g. ?category=Mobile)

  let filter = {}; // default khali filter
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

  const product = Product.findByIdAndUpdate(_id, updatedDataOFproduct, {
    new: true,
    runValidators: true,
  });

   if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated successfully", product));

});

const deleteProduct= asyncHandler(async(req,res)=>{


    const {id}= req.params

    const product=Product.findByIdAndDelete(id)


   res.status(200).json(ApiResponse(200,"product"))

})

export { createProduct, getAllProducts ,updateProduct,deleteProduct};

import express from "express";
import {
  categoryFilter,
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controler.js";
import { protect } from "../middleware/authJWT.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateDeleteProduct,
  validateGetAllProducts,
  validateCategoryFilter,
  handleValidationErrors,
} from "../middleware/validationForProduct.js";

const route = express.Router();

route.post(
  "/createproduct",
  protect,
  validateCreateProduct,
  handleValidationErrors,
  createProduct
);
route.get(
  "/getallproduct",
  protect,
  validateGetAllProducts,
  handleValidationErrors,
  getAllProducts
);

route.patch(
  "/updateproduct/:id",
  protect,
  validateUpdateProduct,
  handleValidationErrors,
  updateProduct
);

route.delete(
  "/deleteproduct/:id",
  protect,
  validateDeleteProduct,
  handleValidationErrors,
  deleteProduct
);

route.get(
  "/categoryFilter",
  protect,
  validateCategoryFilter,
  handleValidationErrors,
  categoryFilter
);

export default route;

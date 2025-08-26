// validationForProduct.js
import { body, param, query, validationResult } from "express-validator";

// ---------- Validation Middlewares ----------

// Create Product Validation
export const validateCreateProduct = [
  body("name")
    .notEmpty().withMessage("hy dear  Product name is required")
    .isString().withMessage("Product name must be a string"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),

  body("category")
    .notEmpty().withMessage("Category is required")
    .isString().withMessage("Category must be a string"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
];

// Update Product Validation
export const validateUpdateProduct = [
  param("id")
    .isMongoId().withMessage("Invalid product ID"),

  body("name")
    .optional()
    .isString().withMessage("Name must be a string"),

  body("price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),

  body("category")
    .optional()
    .isString().withMessage("Category must be a string"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
];

// Delete Product Validation
export const validateDeleteProduct = [
  param("id")
    .isMongoId().withMessage("Invalid product ID"),
];

// Get Product Validation (get all products me optional filters ho sakty hein)
export const validateGetAllProducts = [
  query("limit")
    .optional()
    .isInt({ gt: 0 }).withMessage("Limit must be a positive integer"),

  query("page")
    .optional()
    .isInt({ gt: 0 }).withMessage("Page must be a positive integer"),
];

// Category Filter Validation
export const validateCategoryFilter = [
  query("category")
    .notEmpty().withMessage("Category query param is required")
    .isString().withMessage("Category must be a string"),
];

// ---------- Error Handling Middleware ----------
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

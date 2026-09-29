const { body, param } = require("express-validator");

const createPostValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),

  body("authorId")
    .notEmpty()
    .withMessage("Author ID is required")
    .isInt({ min: 1 })
    .withMessage("Author ID must be a valid positive integer"),
];

const updatePostValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Post ID must be a valid positive integer"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),

  body("content")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),
];

const postIdValidation = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Post ID must be a valid positive integer"),
];

module.exports = {
  createPostValidation,
  updatePostValidation,
  postIdValidation,
};
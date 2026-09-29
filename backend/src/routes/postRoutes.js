const express = require("express");

const { createPost, getPosts, getPostById, updatePost, deletePost,} = require("../controllers/postController");

const validateRequest = require("../middleware/validation");

const { createPostValidation, updatePostValidation, postIdValidation,} = require("../middleware/postValidation");

const router = express.Router();

router.post(
  "/",
  createPostValidation,
  validateRequest,
  createPost
);

router.get("/", getPosts);

router.get(
  "/:id",
  postIdValidation,
  validateRequest,
  getPostById
);

router.put(
  "/:id",
  updatePostValidation,
  validateRequest,
  updatePost
);

router.delete(
  "/:id",
  postIdValidation,
  validateRequest,
  deletePost
);

module.exports = router;
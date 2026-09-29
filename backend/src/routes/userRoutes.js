const express = require("express");

const {
  createUser,
  getUsers,
} = require("../controllers/userController");

const validateRequest = require("../middleware/validation");

const {
  createUserValidation,
} = require("../middleware/userValidation");

const router = express.Router();

router.post(
  "/",
  createUserValidation,
  validateRequest,
  createUser
);

router.get("/", getUsers);

module.exports = router;
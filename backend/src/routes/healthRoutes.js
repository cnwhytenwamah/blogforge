const express = require("express");
const sequelize = require("../config/database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();

    res.status(200).json({
      success: true,
      status: "online",
      message: "BlogForge API and database are healthy",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: "offline",
      message: "Database connection failed",
    });
  }
});

module.exports = router;
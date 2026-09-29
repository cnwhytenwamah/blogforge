const express = require("express");
const cors = require("cors");

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BlogForge API is running",
  });
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/health", healthRoutes);
app.use(errorHandler);

module.exports = app;
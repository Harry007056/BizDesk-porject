require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const router = require("../routes");
const notFound = require("../middleware/notFound");
const errorHandler = require("../middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "BizDesk API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", router);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

module.exports = { app, startServer };

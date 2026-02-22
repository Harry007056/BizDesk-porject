require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/index")); 
app.use("/api/business", require("./routes/index"));
app.use("/api/appointments", require("./routes/index"));
app.use("/api/services", require("./routes/index"));
app.use("/api/staff", require("./routes/index"));
app.use("/api/customers", require("./routes/index"));
app.use("/api/subscription", require("./routes/index"));
app.use("/api/dashboard", require("./routes/index"));

// Error handler (MUST BE LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
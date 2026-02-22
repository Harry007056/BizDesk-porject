const errorHandler = (error, _req, res, _next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate record",
      key: error.keyValue,
    });
  }   

  const status = error.statusCode || 500;
  return res.status(status).json({
    success: false,
    message: error.message || "Internal server error",
  });
};

module.exports = errorHandler;

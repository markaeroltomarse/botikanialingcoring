const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500;

  res.status(statusCode);
  console.log({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  res.json({
    message: err.message,
    result: false,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};

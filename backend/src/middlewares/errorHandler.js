// /backend/src/middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Use the error status code if set, otherwise default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  console.error(err.stack); // Log the error stack for debugging

  res.json({
    message: err.message,
    // Only show stack trace if in development environment
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Mặc định là 500
    res.status(statusCode).json({
      isSucess: false,
      data: null,
      error: {
        name: err.name,
        message: err.message
      }
    });
  };
module.exports = {errorHandler}
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error
  res.status(500).send({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

export default errorHandler;

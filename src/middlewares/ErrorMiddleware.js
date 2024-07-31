function ErrorHandler(err, req, res, next) {
  console.error(err.stack);
  switch (err) {
    case err.status === 401:
      res.json({ status: 401, message: err.message });
    default:
      res.json({ status: 500, message: "Internal Server Error" });
  }
}
module.exports = ErrorHandler;

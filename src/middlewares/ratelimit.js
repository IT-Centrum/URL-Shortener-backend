const windowRateLimiter = (options) => {
  const requests = {};
  const { windowMs, maxRequest } = options;

  return (req, res, next) => {
    const now = Date.now();
    const windowStartTimeStamp = now - windowMs;

    if (!requests[req.ip]) {
      requests[req.ip] = [];
    }

    requests[req.ip] = requests[req.ip].filter(
      (timeStamp) => timeStamp > windowStartTimeStamp
    );

    if (requests[req.ip].length >= maxRequest) {
      res
        .status(429)
        .send("Request limit exceeded, please try again in a minute.");
    } else {
      requests[req.ip].push(now);
      next();
    }
  };
};

module.exports = windowRateLimiter;

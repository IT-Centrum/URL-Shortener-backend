const APIError = require("../errors/api-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw new APIError("Unauthorized", 401);
    }
    const decoded = await jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(new APIError("Invalid Token", 401));
    }
    next(err);
  }
};

module.exports = authenticate;

const express = require("express");
const ShortenController = require("../modules/shorten.Controller");
const route = express.Router();
const windowRateLimiter = require("../middlewares/ratelimit");
const UserController = require("../modules/user.Controller");
const authenticate = require("../middlewares/authMiddleware");
route.post("/xshort/shorten", ShortenController.shortenURL);

route.get(
  "/xshort/:shortId",
  windowRateLimiter({ windowMs: 60000, maxRequest: 5 }),
  ShortenController.retrieveLongURL
);

route.get("/xshort/stat/:shortId", authenticate ,ShortenController.retreiveStat);

route.post("/xshort/signup", UserController.signUp);

route.post("/xshort/user/signin", UserController.signIn);

module.exports = route;

const express = require("express");
const ShortenController = require("../modules/shorten.Controller");
const route = express.Router();
const windowRateLimiter = require("../middlewares/ratelimit");

route.post("/xshort/shorten", ShortenController.shortenURL);

route.get(
  "/xshort/:shortId",
  windowRateLimiter({ windowMs: 60000, maxRequest: 5 }),
  ShortenController.retrieveLongURL
);

module.exports = route;

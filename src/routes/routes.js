const express = require("express");
const ShortenController = require("../modules/shorten.Controller");
const route = express.Router();

route.post("/xshort/shorten", ShortenController.shortenURL);

route.get("/xshort/:shortId", ShortenController.retrieveLongURL);

module.exports = route;

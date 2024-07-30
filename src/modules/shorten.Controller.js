const ShortenService = require("./shorten.Service");

const shortenURL = async (req, res) => {
  const newShortURL = await ShortenService.shortenURLService(req, res);
  res.json({ url: newShortURL });
};

const retrieveLongURL = async (req, res) => {
  const longURL = await ShortenService.retrieveLongURLService(req, res);
  res.redirect(longURL.url);
};
module.exports = { shortenURL, retrieveLongURL };

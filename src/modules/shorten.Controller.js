const ShortenService = require("./shorten.Service");

const shortenURL = async (req, res) => {
  const newShortURL = await ShortenService.shortenURLService(req, res);
  res.json({ url: newShortURL });
};

const retrieveLongURL = async (req, res, next) => {
  try {
    const longURL = await ShortenService.retrieveLongURLService(req, res, next);
    res.redirect(longURL.url);
  } catch (err) {
    next(err);
  }
};
const retreiveStat = async (req, res) => {
  const stat = await ShortenService.retrieveStatService(req, res);
  res.status(200).json(stat);
};
module.exports = { shortenURL, retrieveLongURL, retreiveStat };

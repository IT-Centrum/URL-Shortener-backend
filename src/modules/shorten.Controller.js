const ShortenService = require("./shorten.Service");

const shortenURL = async (req, res) => {
  try {
    const newShortURL = await ShortenService.shortenURLService(req, res);
    res.json({ url: newShortURL });
  } catch (err) {
    next(err);
  }
};

const retrieveLongURL = async (req, res, next) => {
  try {
    const longURL = await ShortenService.retrieveLongURLService(req, res);
    res.redirect(longURL.url);
  } catch (err) {
    next(err);
  }
};
const retreiveStat = async (req, res, next) => {
  try {
    const stat = await ShortenService.retrieveStatService(req, res);
    res.status(200).json(stat);
  } catch (err) {
    next(err);
  }
};
module.exports = { shortenURL, retrieveLongURL, retreiveStat };

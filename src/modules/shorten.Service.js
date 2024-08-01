const { ShortURL } = require("../db/schemas/URLSchema");
const APIError = require("../errors/api-errors");
const characters = require("../helper/characters");
const shortenURLService = async (req, res) => {
  const url = req.body.url;
  let shortId;
  let check;
  let lengthOfK = 5;
  const threshold = 0.9;
  let maxPossibleShortURLS = Math.pow(62, lengthOfK);
  do {
    const countOfURLS = await ShortURL.aggregate([{ $count: "uniqueCount" }]);
    const uniqueShortURLCount = countOfURLS[0]?.uniqueCount || 0;

    if (uniqueShortURLCount >= maxPossibleShortURLS * threshold) {
      lengthOfK = lengthOfK + 1;
      maxPossibleShortURLS = Math.pow(62, lengthOfK);
    }
    shortId = shorten(lengthOfK);
    check = await ShortURL.findOne({ shortId: shortId });
  } while (check);

  try {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setMinutes(currentDate.getMinutes() + 5);
    const shortURL = new ShortURL({
      shortId: shortId,
      url: url,
      createtionDate: currentDate,
      expirationDate: expirationDate,
    });
    await shortURL.save();
    return `http://xshort/${shortId}`;
  } catch (err) {
    throw err;
  }
};

const retrieveLongURLService = async (req, res) => {
  try {
    const { shortId } = req.params;
    const updateOptions = {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      referrer: req.get("Referrer") || "Direct",
    };
    const url = await ShortURL.findOneAndUpdate(
      { shortId: shortId },
      {
        $push: { usersData: updateOptions },
        $inc: { accessCount: 1 },
        $set: { lastAccessTime: new Date() },
      }
    );
    if (!url) {
      throw new APIError(`Short URL with id ${shortId} not found`, 404);
    }
    return url;
  } catch (err) {
    throw err;
  }
};

const retrieveStatService = async (req, res) => {
  try {
    const { shortId } = req.params;
    const data = await ShortURL.findOne({ shortId: shortId });
    if (!data) {
      throw new APIError(`Short URL with id ${shortId} not found`, 404);
    }
    return {
      accessCount: data.accessCount,
      lastAccessTime: data.lastAccessTime,
      usersData: data.usersData,
    };
  } catch (err) {
    throw err;
  }
};

function shorten(lengthOfK) {
  let randomId = "";
  const tempCharacters = [...characters];
  let i = characters.length - 1;
  let k = 0;
  while (k < lengthOfK) {
    let j = Math.floor(Math.random() * tempCharacters.length);
    randomId = randomId + tempCharacters[j];
    let temp = tempCharacters[i];
    tempCharacters[i] = tempCharacters[j];
    tempCharacters[j] = temp;
    i--;
    k++;
  }
  return randomId;
}

module.exports = {
  shortenURLService,
  retrieveLongURLService,
  retrieveStatService,
};

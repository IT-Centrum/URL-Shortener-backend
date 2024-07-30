const { ShortURL } = require("../db/schemas/URLSchema");
const characters = require("../helper/characters");
const shortenURLService = async (req, res) => {
  const url = req.body.url;
  let shortId;
  let check;
  let lengthOfK = 5;
  const threshold = 0.9;
  do {
    const countOfURLS = await ShortURL.aggregate([{ $count: "uniqueCount" }]);
    const uniqueShortURLCount = countOfURLS[0]?.uniqueCount || 0;
    console.log("uniqueShortURLCount");
    const maxPossibleShortURLS = Math.pow(62, lengthOfK);
    if (uniqueShortURLCount >= maxPossibleShortURLS * threshold) {
      lengthOfK = lengthOfK + 1;
    }
    shortId = shorten(lengthOfK);
    check = await ShortURL.findOne({ shortId: shortId });
  } while (check);

  try {
    const shortURL = new ShortURL({
      shortId: shortId,
      url: url,
      createtionDate: new Date(),
    });
    await shortURL.save();
    return `http://xshort/${shortId}`;
  } catch (err) {
    console.error(err);
  }
};

const retrieveLongURLService = async (req, res) => {
  const { shortId } = req.params;
  const url = await ShortURL.findOne({ shortId: shortId });
  return url;
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

module.exports = { shortenURLService, retrieveLongURLService };

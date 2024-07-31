const { ShortURL } = require("../db/schemas/URLSchema");

async function checkForExpiredUrls() {
  try {
    const now = new Date();
    const expiredURls = await ShortURL.find({
      expirationDate: { $lt: now },
    });
    // console.log('expiredURLs: ',expiredURls)
    const expiredIds = expiredURls.map((url) => url._id);
    if (expiredIds || expiredIds.length > 0) {
      await ShortURL.deleteMany({ _id: { $in: expiredIds } });
      console.log(`Deleted ${expiredIds.length} expired URLs`);
    } else {
      console.log("No expired ids are found");
    }
  } catch (err) {
    console.error("Error checking expired URLs:", err);
  }
}

module.exports = { checkForExpiredUrls };

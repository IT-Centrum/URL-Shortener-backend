const shortenRequest = {
  body: {
    url: "https://mongoosejs.com/docs",
  },
};

const retrieveLongUrl = {
  params: {
    shortId: "sdgx1",
  },
  get() {
    if ("User-Agent") return "fireFox";
    if ("Referrer") return "chrome";
  },
};

module.exports = { shortenRequest, retrieveLongUrl };

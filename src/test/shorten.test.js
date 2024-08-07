const ShortenService = require("../modules/shorten.Service");
const Req = require("./setup/reqObj");
const { ShortURL } = require("../db/schemas/URLSchema");
const mongoose = require("mongoose");

describe("Test Suit for Shortening", () => {
  const mockShortURL = {
    shortId: "324ix",
    url: "https://www.google.com",
    createtionDate: new Date(),
    accessCount: 0,
    lastAccessTime: Date.now(),
    usersData: [],
  };
  test("Test case - 1 - : testing shortenURLService", async () => {
    try {
      jest.spyOn(ShortURL, "aggregate").mockResolvedValue([null]);
      jest.spyOn(ShortURL, "findOne").mockResolvedValue(null);
      jest
        .spyOn(mongoose.Model.prototype, "save")
        .mockResolvedValue({ _id: "mockedId", ...mockShortURL });

      const newshortURL = new ShortURL(mockShortURL);

      await newshortURL.save();
      await ShortenService.shortenURLService(Req.shortenRequest, null);
    } catch (err) {
      expect(err).toMatch("error");
    }
  });

  test("Test case - 2 - : testing retrieveLongURLService", async () => {
    try {
      jest
        .spyOn(ShortURL, "findOneAndUpdate")
        .mockResolvedValue({ url: "https://www.google.com" });
      const longURL = await ShortenService.retrieveLongURLService(
        Req.retrieveLongUrl,
        null
      );
      expect(longURL.url).toBe("https://www.google.com");
    } catch (err) {
      expect(err).toMatch("error");
    }
  });

  test("Test case - 3 - : testing retrieveStatService", async () => {
    try {
      jest.spyOn(ShortURL, "findOne").mockResolvedValue(mockShortURL);
      const stat = await ShortenService.retrieveStatService(
        Req.retrieveLongUrl,
        null
      );
      expect(stat.accessCount).toBe(0);
      expect(stat.usersData).toEqual([]);
    } catch (err) {
      expect(err).toMatch("error");
    }
  });
});

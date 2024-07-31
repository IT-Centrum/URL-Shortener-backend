const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  createtionDate: { type: Date, required: true },
  expirationDate: { type: Date },
  accessCount: { type: Number, default: 0 },
  lastAccessTime: { type: Date, default: Date.now() },
  usersData: [
    {
      ip: String,
      userAgent: String,
      referrer: String,
    },
  ],
});

const ShortURL = mongoose.model("shortURL", URLSchema);

module.exports = { ShortURL };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortId = require("shortid");

const shortUrlSchema = new Schema({
  fullUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortId.generate },
  clicked: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);

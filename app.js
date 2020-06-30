const express = require("express");
const app = express();
const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrl");
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res, next) => {
  const shortUrls = await shortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res, next) => {
  await shortUrl.create({ fullUrl: req.body.fullurl });
  res.redirect("/");
});

app.get("/:shortURL", async (req, res, next) => {
  const { shortURL } = req.params;
  const fullURL = await shortUrl.findOne({ shortUrl: shortURL });

  if (fullURL === null) return res.sendStatus(404);

  fullURL.clicked++;
  fullURL.save();
  res.redirect(fullURL.fullUrl);
});

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Connected");
  }
);

app.listen(process.env.PORT || 5000);

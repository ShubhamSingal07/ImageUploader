const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  url: String,
});

const Image = mongoose.model("Image", Schema);

module.exports = { Image };

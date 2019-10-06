const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const app = express();

const { upload } = require("./multer");
const { Image } = require("./ImageModel");

cloudinary.config({
  cloud_name: "dfg7tvdm2",
  api_key: "654553376236421",
  api_secret: "NeJFrThQZKSC2NE09SaMLTGNdS8",
});

app.use("/", express.static(path.join(__dirname, "public_html")));

app.get("/upload", async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).send({
      success: true,
      images,
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal Server Error",
    });
  }
});

app.post("/upload", upload.any(), async (req, res) => {
  try {
    const images = [];
    for (let file of req.files) {
      const path = file.path;
      const uniqueFileName = new Date().toISOString();
      const image = await cloudinary.uploader.upload(path, {
        public_id: `photos/${uniqueFileName}`,
        tags: "photos",
      });
      fs.unlinkSync(path);
      images.push({ url: image.secure_url });
    }
    await Image.insertMany(images);
    res.status(200).send({
      success: true,
      images: images,
      message: "Image successfully uploaded",
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal Server Error",
    });
  }
});

mongoose
  .connect("mongodb://localhost/imageuploader", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    app
      .listen(5000, () => {
        console.log(`server started at http://localhost:5000`);
      })
      .on("error", console.log);
  })
  .catch(err => {
    console.log("Could not connect to database");
  });

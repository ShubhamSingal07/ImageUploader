const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, "./images/");
    } else {
      cb({ message: "this file is neither a video or image file" }, false);
    }
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = { upload };

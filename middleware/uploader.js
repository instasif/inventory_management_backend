const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "image/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportImage = /png|jpg|jpeg|webp/;
    const extenstion = path.extname(file.originalname);
    if (supportImage.test(extenstion)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg image"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storageUsuarios = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "animareview/usuarios",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const storagePosters = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "animareview/posters",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

module.exports = {
  cloudinary,
  storageUsuarios,
  storagePosters
};
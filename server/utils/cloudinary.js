const cloudinary = require("cloudinary");

if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "server/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ public_id: result.public_id, url: result.url });
        }
      },
      {
        resource_type: "auto",
        folder,
      }
    );
  });
};

exports.deleteFile = async (file) => {
  const response = await cloudinary.uploader.destroy(file);
  if (response?.result === "ok") return true;
};

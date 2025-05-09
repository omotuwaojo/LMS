// config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const fs = require("fs")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadOnCloudinary = async (localFilePath) => {
//     try{
//         if (!localFilePath) return null
//         const respose = await cloudinary.upload(
//             localFilePath, {
//                 resource_type: "auto"
//             }
//         )
//          console.log("File uploaded on cloudinary. File src: " + response.url)
// delete file from server after uploaded
//        fs.umlikeSync(localFilePath)
//        return response
//     } catch (error) {
//         fs.unlikSync(localFilePath)
//         return null
//     }
// }

module.exports = cloudinary;

// upload a image
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const multer = require('multer');
const path = require('path');

          
cloudinary.config({ 
  cloud_name: 'dovmnjrfz', 
  api_key: '291169754849699', 
  api_secret: 'Rj2HR28dzKNZxVdeyONFv3KHKkE' 
});

// save file in upload folder
// const storage = multer.diskStorage({
//     destination: "uploads/",
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });

// const ImageUpload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         const supportedImage = /png|jpg|webp|jpeg/;
//         const extension = path.extname(file.originalname);

//         if (supportedImage.test(extension)) {
//             cb(null, true);
//         } else {
//             cb(new Error("Must be a png/jpg/webp/jpeg image"));
//         }

//     },
//     limits: {
//         fileSize: 5000000,
//     }
// })

// // upload image in cloudinary
// const uploadToCloudinary = async (file) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file.path,
//             (error, result) => {
//                 fs.unlinkSync(file.path);
//                 if (error) {
//                     reject(error)
//                 }
//                 else {
//                     resolve(result)
//                 }
//             })
//     })
// };



// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const ImageUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|webp|jpeg/;
        const extension = file.originalname.split('.').pop().toLowerCase();

        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be a png/jpg/webp/jpeg image"));
        }
    },
    limits: {
        fileSize: 5000000, // 5MB limit
    }
}).single('image'); // 'image' should match the name attribute in your HTML form

// Function to upload file to Cloudinary
const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, (error, result) => {
            fs.unlinkSync(file.path);
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

// // Cloudinary configuration
// cloudinary.config({ 
//   cloud_name: 'dovmnjrfz', 
//   api_key: '291169754849699', 
//   api_secret: 'Rj2HR28dzKNZxVdeyONFv3KHKkE' 
// });

exports.FileUploadHelper = {
    uploadToCloudinary,
    ImageUpload
}
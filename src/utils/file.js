// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // Specify the destination directory
// const uploadDirectory = path.join(__dirname, 'uploads');

// // Ensure the directory exists, if not create it
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory);
// }

// // Configure Multer to use the destination directory
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDirectory);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// module.exports.upload = multer({ storage: storage });

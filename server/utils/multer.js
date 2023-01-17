// const multer = require("multer");
// const path = require("path");

// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("Unsupported file type!"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });


// const multer = require('multer');
// const path = require('path');
// // Multer config
// module.exports = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//             cb(new Error('Unsupported file type!'), false);
//             return;
//         }
//         cb(null, true);
//     },
// });


const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
module.exports = multerUploads;
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



const multer = require("multer");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const url = `./uploads/catalog`;
        cb(null, url);
    },
    filename(req, file, cb) {
        file.originalname = "re_" + file.originalname;
        cb(null, `${file.originalname}`);
    }
});
const uploadImg = multer({
    storage: storage
});

exports.uploadImg = uploadImg;
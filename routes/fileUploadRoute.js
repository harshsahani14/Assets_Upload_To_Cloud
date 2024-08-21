const express = require("express");
const router = express.Router();

const fileUpload = require("../controllers/fileUploadController");

router.post("/localFileUpload", fileUpload.localFileUpload);
router.post("/imgUpload",fileUpload.imgUpload);
router.post("/vidUpload",fileUpload.vidUpload);
router.post("/imgCompressUpload",fileUpload.imgCompressUpload);

module.exports = router;

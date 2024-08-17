const express = require("express");
const router = express.Router();

const fileUpload = require("../controllers/fileUploadController");

router.post("/localFileUpload", fileUpload.localFileUpload);

module.exports = router;

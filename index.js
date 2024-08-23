const express = require("express");
const server = express();
const fileUpload = require("express-fileupload");

//load config from env file
require("dotenv").config();

//middleware to parse json request body
server.use(express.json());
server.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//start server
const PORT = process.env.PORT || 4000;

//connection to the database
const db = require("./config/database");
db();

// Cloudinary db connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinary();

const router = require("./routes/fileUploadRoute");
server.use("/v1/upload",router)

//default Route
server.get("/", (req, res) => {
  res.send(`<h1> This is HOMEPAGE</h1>`);
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
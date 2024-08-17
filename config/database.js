const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Database Connection is Successful"))
    .catch( (error) => {
        console.log(error.message)
    });
}

module.exports = dbConnect;
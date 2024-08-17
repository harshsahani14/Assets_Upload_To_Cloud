const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        link:{
            type:String
        },
        tags:{
            type:String
        },
        email:{
            type:String
        }
    }
)
module.exports = mongoose.model("File",FileSchema)
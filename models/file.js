const mongoose = require("mongoose");
const nodemailer = require('nodemailer')
require('dotenv').config();
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

FileSchema.post('save', async (doc)=>{

    try{

        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            auth:{
                user:process.env.USER_MAIL,
                pass:process.env.USER_PASS
            }
        })

        const result = await transporter.sendMail({

            from:process.env.USER_MAIL,
            to:doc.email,
            subject:'File upload',
            html:`<h1>Cloudinary upload</h1> <p>Your File has been uploaded on cloudinary.Link of the image <a href=${doc.link}>${doc.link}</a> </p>`
        })

        console.log(result);
    }
    catch(e){
        console.log(e.message)
    }
})
module.exports = mongoose.model("File",FileSchema)
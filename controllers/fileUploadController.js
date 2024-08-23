const cloudinary  = require("cloudinary").v2;
const File = require("../models/file");

async function uploadToCloud(file,folder,quality){

    const options = {folder};

    if(quality){
        options.quality=quality
    }
    
    const result = await cloudinary.uploader.upload(file,options);

    return result
}

exports.localFileUpload = async (req,res) =>{

    try{
        
        let file = req.files.file;

        console.log(file);

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        console.log(path)

        file.mv(path);

        res.status(200).json(
            {
                sucess:true,
                message:"File uploaded successfully"
            }
        )
    }
    catch(e){
        res.status(500).json(
            {
                sucess:false,
                message:e.message
            }
        )
    }
}

exports.imgUpload = async (req,res)=>{

    try{

        // Fetching
        const {name,email,tags} = req.body;

        const img = req.files.imgFile;

        // Validation

        const format = img.name.split('.')[1];
        const supportedFormats = ['jpg',"jpeg","png"];

        if(!supportedFormats.includes(format)){
            return res.status(400).json(
                {
                    sucess:false,
                    url:img.secure_url,
                    message:"File format not supported"
                }
        )}

        // Saving in cloudinary

        const options = {
            folder:"assets",
            resource_type: "auto"
        }

        const response = await cloudinary.v2.uploader.upload(img.tempFilePath,options);

        const file = new File({
            name,
            email,
            tags,
            link:response.secure_url
        })

        const data = await file.save();

        console.log(response)

        return res.status(200).json({
            sucess:true,
            link:response.secure_url,
            message:"File uploaded sucessfully"
        })

    }
    catch(e){
        res.status(500).json(
            {
                sucess:false,
                message:e.message
            }
        )
    }
}

exports.vidUpload = async (req,res)=>{

    try{

        // Fetching
        const {name,email,tags} = req.body;

        const vid = req.files.vidFile;

        // Validation

        const format = vid.name.split('.')[1];

        console.log(format)
        const supportedFormats = ["mp4","mov"];

        if(!supportedFormats.includes(format)){
            return res.status(400).json(
                {
                    sucess:false,
                    message:"File format not supported"
                }
        )}

        // Saving in cloudinary

        const options = {
            folder:"assets",
            resource_type: "video"
        }

        const response = await cloudinary.v2.uploader.upload(vid.tempFilePath,options);

        const file = new File({
            name,
            email,
            tags,
            link:response.secure_url
        })

        const data = await file.save();

        console.log(response)

        return res.status(200).json({
            sucess:true,
            link:response.secure_url,
            message:"File uploaded sucessfully"
        })
    }
    catch(e){
        res.status(500).json(
            {
                sucess:false,
                message:e.message
            }
        )
    }
}



// Issue:the img is being compressed to the same size
exports.imgCompressUpload = async(req,res)=>{

    try{
    
         // Fetching
         const {name,email,tags} = req.body;

         const img = req.files.imgFile;
 
         // Validation
 
         const format = img.name.split('.')[1];
         const supportedFormats = ['jpg',"jpeg","png"];
 
         if(!supportedFormats.includes(format)){
             return res.status(400).json(
                 {
                     sucess:false,
                     url:img.secure_url,
                     message:"File format not supported"
                 }
         )}
 
         // Saving in cloudinary
 
         const response = await uploadToCloud(img.tempFilePath,"assets",90)
 
         const file = new File({
             name,
             email,
             tags,
             link:response.secure_url
         })
 
         const data = await file.save();
 
         console.log(response);
 
         return res.status(200).json({
             sucess:true,
             link:response.secure_url,
             message:"File uploaded sucessfully"
         })        
    }
    catch(e){
        console.log(e)
        res.status(500).json(
            {
                sucess:false,
                message:e.message
            }
        )
    }

}
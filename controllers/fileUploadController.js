
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
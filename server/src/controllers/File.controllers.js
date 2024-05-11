import cloudinary from "../utils/cloudinary.js";
import File from "../models/file.models.js"
import fs from 'fs';
import { log } from "console";

const Upload = (req, res) => {
    console.log(req.file);
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error"
            })
        } else {
            File.create({
                userId: "0000",
                filename: result.original_filename,
                url: result.secure_url,
                type: result.resource_type,
                format: result.format,
                size: result.bytes,
            }).then(() => {
                fs.unlink(`uploads/${req.file.filename}`, function (err) {
                    if (err) {
                        console.log(err)
                    } else {

                        console.log('File deleted!');
                    }
                });
                res.status(200).json({
                    success: true,
                    message: "Uploaded!",
                })
            })
            console.log(result);
        }
    })
}



const fetchAll = async(req, res) => {
    const data = await File.find({ userId: "0000" })
    data.map(v => console.log(v.filename))
    res.send(data)
}




export { Upload, fetchAll }
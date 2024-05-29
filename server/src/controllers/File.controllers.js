import cloudinary from "../utils/cloudinary.js";
import File from "../models/file.models.js"
import UploadFile from "../config/multer.config.js";
import fs from 'fs';

const Upload = (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');

    try {
        UploadFile(req, res, async (err) => {
            if (err) return res.status(500).json({ message: 'Error uploading file: ' + err.message });
            console.log("File: " + req.file);
            cloudinary.uploader.upload(req.file.path, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: false,
                        message: "Error"
                    })
                } else {
                    File.create({
                        userId: req.session.passport.user,
                        filename: result.original_filename,
                        url: result.secure_url,
                        type: result.resource_type,
                        format: result.format,
                        size: result.bytes,
                    }).then(() => {
                        fs.unlink(`uploads/${req.file.filename}`, function (err) {
                            if (err) console.log(err)
                        });
                        res.status(200).json({
                            success: true,
                            message: "Uploaded!",
                        })
                    })
                    console.log(result);
                }
            })
        })
    } catch (error) {
        console.log(error);
    }

}



const fetchAll = async (req, res) => {
    if (req.session.passport.user == undefined) res.send('Unauthorized')
    console.log(req.session.passport.user);
    const data = await File.find({ userId: req.session.passport.user })
    data.map(v => console.log(v.filename))
    res.send(data)
}




export { Upload, fetchAll }
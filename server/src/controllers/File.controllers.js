import cloudinary from "../utils/cloudinary.js";
import File from "../models/file.models.js"
import Save from "../models/save.model.js";
import UploadFile from "../config/multer.config.js";
import getResourceType from "../services/getResourceType.js";
import fs from 'fs';

const Upload = (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');

    try {
        UploadFile(req, res, async (err) => {
            if (err) return res.status(500).json({ message: 'Error uploading file: ' + err.message });
            console.log("File: " + req.file);

            cloudinary.uploader.upload(req.file.path, { resource_type: getResourceType(req.file.path) }, (err, result) => {
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
                    }).then((file) => {
                        fs.unlink(`uploads/${req.file.filename}`, function (err) {
                            if (err) console.log(err)
                        });
                        res.status(200).json(file)
                    })
                    console.log(result);
                }
            })
        })
    } catch (error) {
        console.log(error);
    }

}


const saveFile = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    const { id } = req.body;
    try {
        const file = await File.findOne({ _id: id });
        Save.create({
            userId: req.session.passport.user,
            ownerId: id,
            filename: file.filename,
            url: file.url,
            type: file.type,
            format: file.format,
            size: file.size,
        })
        res.status(200).send('ok');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: err.message });
    }
}



const fetchAll = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    const files = await File.find({ userId: req.session.passport.user })
    res.send(files)
}


const fetchSingle = async (req, res) => {

    const { id } = req.params;
    if (!id) return res.status(400).send('Invalid id');

    const file = await File.findOne({ _id: id })
    if (!file) return res.status(404).send('File not Found!!');
    res.status(200).send(file);
}



const toggeleStar = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    try {
        const file = await File.findOne({ _id: req.params.id });
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        file.starred = !file.starred;
        await file.save();
        res.json(file);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


const deleteFile = async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    try {
        const file = await File.findOne({ _id: req.params.id });
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        if (file.deletedAt == null) {
            file.deletedAt = new Date();
        } else {
            file.deletedAt = null;
        }
        await file.save();
        res.json(file);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}




export { Upload, saveFile, fetchAll, fetchSingle, toggeleStar, deleteFile }
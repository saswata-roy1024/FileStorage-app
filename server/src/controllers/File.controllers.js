

const Upload = (req, res) => {
    console.log(req.file);
    res.status(200).send("ok")
}

export { Upload }
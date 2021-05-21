import express, { Request, Response } from "express";
import {uploadS3,TUpload} from '../modules/uploadFile';

const router = express.Router();

router.post('/', async(req,res)=>{
    const image = await uploadS3((req as any).files as TUpload);
    res.send({
        imageUrl: image,
        file: req.file,
        body: req.body
    });
});

module.exports = router;


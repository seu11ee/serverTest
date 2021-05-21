import express, { Request, Response } from "express";
import {upload} from '../modules/upload';

const router = express.Router();

router.post("/", upload.single('img'),async(req,res)=>{
    const image = (req as any).file.location;
    res.send({
        imageUrl: image
    });
});

module.exports = router;


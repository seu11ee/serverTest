import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";

const router = express.Router();

import User from "../models/User";

router.post(
    "/",
    [
        check("name","Name is required").not().isEmpty(),
        check("email","Please include a valid email").isEmail()
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const { name, email } = req.body;

        try{
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({
                    errors: [{ msg: "User already exists"}]
                });
                console.log("")
            }

            user = new User({
                name,
                email
            });

            await user.save();
            res.json(user);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);
module.exports = router;
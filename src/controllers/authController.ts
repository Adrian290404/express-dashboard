import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import AuthModel from "../models/authModel";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    try {
        const foundUser = await AuthModel.findOne({ username });
        if (!foundUser) {
            res.status(401).json({ message: "User not found "});
            return;
        }
        if (password != foundUser.password) {
            res.status(401).json({ message: "Incorrect password"});
            return;
        }
        const token = jwt.sign({ username: foundUser.username }, secretKey, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    } 
    catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
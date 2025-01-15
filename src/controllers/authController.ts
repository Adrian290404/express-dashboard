import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import AuthModel from "../models/authModel";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const foundUser = await AuthModel.findOne({ username });
        if (!foundUser) {
            return res.status(401).json({ message: 'Usuer not founf' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ username: foundUser.username }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    } catch (err) {
        return res.status(500).json({ message: 'Error', error: err });
    }
};
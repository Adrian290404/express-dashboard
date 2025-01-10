import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response } from "express";

dotenv.config();
const key = process.env.SECRET_KEY as string;
const user = {
    username: "adrian",
    password: "1234"
}

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username: user.username }, key, { expiresIn: '1h' });
        res.json({ token });
        return;
    }
    res.status(401).json({ message: 'Error. Invalid name or password.' })
    return;
}
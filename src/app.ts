import express, { Response, Request } from "express";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import privatedRoutes from './routes/privateRoutes';
import publicRoutes from "./routes/publicRoutes";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', publicRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/protected', privatedRoutes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
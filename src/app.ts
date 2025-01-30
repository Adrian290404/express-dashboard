import express, { Response, Request } from "express";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import mysql from 'mysql2/promise';
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import privatedRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE", 
    credentials: true 
}));

app.use(express.json());

// const connectDB = async () => {
//     try {
//         const mongoURI = process.env.MONGO_URI || "mongodb+srv://adrianmg200429:Bx7Lu7q1dgF5K00J@adrianmartin04.dw8ql.mongodb.net/api";
//         await mongoose.connect(mongoURI);
//         console.log("Conexión a MongoDB exitosa");
//     } catch (error) {
//         console.error("Error al conectar a MongoDB:", error);
//         process.exit(1);
//     }
// };

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const testDBConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión a MySQL exitosa");
        connection.release();
    } catch (error) {
        console.error("Error al conectar a MySQL:", error);
        process.exit(1); 
    }
};

app.use("/api", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", privatedRoutes);

const startServer = async () => {
    await testDBConnection();
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
};

startServer(); 
export default app;

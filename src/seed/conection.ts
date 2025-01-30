// import mongoose from "mongoose";
import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();
// console.log("Conexión a MongoDB usando la URL:", "mongodb://localhost:27017/api");
// const connectDB = async () => {
//     try {
//         const mongoURI = "mongodb+srv://adrianmg200429:Bx7Lu7q1dgF5K00J@adrianmartin04.dw8ql.mongodb.net/api";
//         await mongoose.connect(mongoURI);
//         console.log("Conexión a MongoDB");
//     } catch (error) {
//         console.error("Error al conectar", error);
//         process.exit(1);
//     }
// };
// export default connectDB

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default pool;
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("Conexión a MongoDB usando la URL:", "mongodb://localhost:27017/api");
const connectDB = async () => {
    try {
        const mongoURI = "mongodb+srv://adrianmg200429:Bx7Lu7q1dgF5K00J@adrianmartin04.dw8ql.mongodb.net/api";
        await mongoose.connect(mongoURI);
        console.log("Conexión a MongoDB");
    } catch (error) {
        console.error("Error al conectar", error);
        process.exit(1);
    }
};
export default connectDB
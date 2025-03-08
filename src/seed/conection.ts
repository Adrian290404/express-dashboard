import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
          throw new Error("La variable de entorno MONGO_URI no está definida");
        }
        await mongoose.connect(mongoURI);
        console.log("Conexión a MongoDB exitosa");
    } 
    catch (error) {
        console.error("Error al conectar", error);
        process.exit(1);
    }
};
export default connectDB
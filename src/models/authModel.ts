import mongoose, {Schema} from "mongoose";
import { Auth } from "../interfaces/auth";

export const authSchema = new Schema<Auth>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const AuthModel = mongoose.model<Auth>('Auth', authSchema);

export default AuthModel;
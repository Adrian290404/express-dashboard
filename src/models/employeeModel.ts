import mongoose, {Schema} from "mongoose";
import { Employee } from "../interfaces/employee";

export const employeeSchema = new Schema<Employee>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    join: { type: String, required: true },
    job_desk: { type: String, required: true },
    schedule: { type: String, required: true },
    contact: { type: String, required: true }
});
const EmployeeModel = mongoose.model<Employee>('Employee', employeeSchema);

export default EmployeeModel;
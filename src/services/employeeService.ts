import { Employee } from "../interfaces/employee";
import EmployeeModel from "../models/employeeModel";

export const fetchAllEmployees = async () => {
    return await EmployeeModel.find();
}

export const fetchEmployeeById = async (id: number) => {
    return await EmployeeModel.findById(id);
}

export const addEmployee = async (newUser: Employee) => {
    if ( !newUser.name || !newUser.image || !newUser.join || !newUser.job_desk || !newUser.schedule || !newUser.contact ) {
        throw new Error('All fields are required');
    }
    const newEmployeeInstance = new EmployeeModel(newUser);
    await newEmployeeInstance.save();

    return newEmployeeInstance;
};

export const editEmployee = async (id: number, updatedUser: Employee) => {
    return await EmployeeModel.findByIdAndUpdate(id, updatedUser, { new: true });
}

export const removeEmployee = async (id: number) => {
    return await EmployeeModel.findByIdAndDelete(id);
}
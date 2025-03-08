import { Employee } from "../interfaces/employee";
import BookingModel from "../models/bookingModel";
import EmployeeModel from "../models/employeeModel";

export const fetchAllEmployees = async () => {
    return await EmployeeModel.find();
}

export const fetchEmployeeById = async (id: number) => {
    return await EmployeeModel.findOne({ id });
}

export const addEmployee = async (newUser: Employee) => {
    if ( !newUser.name || !newUser.image || !newUser.join || !newUser.job_desk || !newUser.schedule || !newUser.contact ) {
        throw new Error('All fields are required');
    }
    const existingEmployee = await EmployeeModel.findOne({ id: newUser.id });
    if (existingEmployee) {
        throw new Error(`Employee with id ${newUser.id} already exists`);
    }
    const newEmployeeInstance = new EmployeeModel(newUser);
    await newEmployeeInstance.save();

    return newEmployeeInstance;
};

export const editEmployee = async (id: number, updatedUser: Employee) => {
    return await EmployeeModel.findOneAndUpdate({ id }, updatedUser, { new: true });
}

export const removeEmployee = async (id: number) => {
    await BookingModel.deleteMany({ user_id: id });
    return await EmployeeModel.findOneAndDelete({ id });
}
import { Employee } from "../interfaces/employee";
import BookingModel from "../models/bookingModel";
import EmployeeModel from "../models/employeeModel";
import NotificationModel from "../models/notificationModel";
import { createNotification } from "./notificationService";

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

    await createNotification({
        type: 'create',
        collection: 'employees',
        details: { 
            message: `New employee added: ${newUser.name}`, 
            id: newUser.id ,
            seeContent: true
        }
    });

    return newEmployeeInstance;
};

export const editEmployee = async (id: number, updatedUser: Employee) => {
    
    await createNotification({
        type: 'update',
        collection: 'employees',
        details: { 
            message: `Employee updated: ${updatedUser.name}`, 
            id: id,
            seeContent: true
        }
    });

    return await EmployeeModel.findOneAndUpdate({ id }, updatedUser, { new: true });
}

export const removeEmployee = async (id: number) => {

    const employee = await EmployeeModel.findOne({ id: id });
    if (employee) {
        await NotificationModel.updateMany(
            {
                collection: 'employees',
                'details.id': id,
                type: { $in: ['create', 'update'] }
            },
            {
                $set: { 'details.seeContent': false }
            }
        );

        await createNotification({
            type: 'delete',
            collection: 'employees',
            details: { 
                message: `Employee deleted: ${employee.name}`, 
                redo: employee
            }
        });   
    }

    await BookingModel.deleteMany({ user_id: id });
    return await EmployeeModel.findOneAndDelete({ id });
}
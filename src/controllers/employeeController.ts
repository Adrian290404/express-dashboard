import { Request, Response } from "express";
import { fetchAllEmployees, fetchEmployeeById, editEmployee, addEmployee, removeEmployee } from "../services/employeeService";

export const getAllEmployees = (req: Request, res: Response) => {
    const employees = fetchAllEmployees();
    res.status(200).json(employees);
}

export const getEmployee = (req: Request, res: Response) => {
    const { id } = req.params;
    const employeeId = Number(id);
    const employees = fetchEmployeeById(employeeId);
    if (!employees) {
        res.status(404).json({ message: 'User not found' })
        return;
    }
    res.status(200).json(employees);
}

export const createEmployee = (req: Request, res: Response) => {
    const newEmployee = req.body;
    const employees = addEmployee(newEmployee);
    res.status(201).json(employees)
}

export const updateEmployee = (req: Request, res: Response) => {
    const updateEmployee = req.body;
    const { id } = req.params;
    const employeeId = Number(id);
    const employees = editEmployee(employeeId, updateEmployee);
    res.status(200).json(employees);
}

export const deleteEmployee = (req: Request, res: Response) => {
    const { id } = req.params;
    const employeeId = Number(id);
    const employees = removeEmployee(employeeId);
    res.status(200).json(employees)
}
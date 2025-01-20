import { Request, Response } from "express";
import { fetchAllEmployees, fetchEmployeeById, editEmployee, addEmployee, removeEmployee } from "../services/employeeService";

export const getAllEmployees = async (req: Request, res: Response) => {
    const employees = await fetchAllEmployees();
    res.status(200).json(employees);
}

export const getEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employeeId = Number(id);
    const employees = await fetchEmployeeById(employeeId);
    if (!employees) {
        res.status(404).json({ message: 'Employee not found' })
        return;
    }
    res.status(200).json(employees);
}

export const createEmployee = async (req: Request, res: Response) => {
    const newEmployee = req.body;
    const employees = await addEmployee(newEmployee);
    res.status(201).json(employees)
}

export const updateEmployee = async (req: Request, res: Response) => {
    const updateEmployee = req.body;
    const { id } = req.params;
    const employeeId = Number(id);
    const employees = await editEmployee(employeeId, updateEmployee);
    res.status(200).json(employees);
}

export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employeeId = Number(id);
    const employees = await removeEmployee(employeeId);
    res.status(200).json(employees)
}
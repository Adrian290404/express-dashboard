import { Router } from "express";
import { getAllEmployees, getEmployee, updateEmployee, createEmployee, deleteEmployee } from "../controllers/employeeController";

const employeeRouter = Router();

employeeRouter.get('/', getAllEmployees);
employeeRouter.get('/:id', getEmployee);
employeeRouter.post('/', createEmployee);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

export default employeeRouter;
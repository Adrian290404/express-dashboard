import { Employee } from "../interfaces/employee";
import { employees as employeesData } from "../data/employees";

let employees: Employee[] = employeesData;

export const fetchAllEmployees = () => {
    return employees;
}

export const fetchEmployeeById = (id: number) => {
    return employees.find((user) => user.id === id);
}

export const addEmployee = (newUser: Employee) => {
    if ( !newUser.name || !newUser.image || !newUser.join || !newUser.job_desk || !newUser.schedule || !newUser.contact ) {
        throw new Error('All fields are required');
    }
    employees.push(newUser);
    return employees;
};

export const editEmployee = (id: number, updatedUser: Employee) => {
    employees = employees.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
    );
    return employees;
}

export const removeEmployee = (id: number) => {
    employees = employees.filter((user) => user.id !== id);
    return employees
}
import { Employee } from "../interfaces/employee";
import EmployeeModel from "../models/employeeModel";
import pool from "../seed/conection";

export const fetchAllEmployees = async () => {
    // return await EmployeeModel.find();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM employees');
        return rows;
    } 
    catch (err) {
        console.error('Error fetching employees:', err);
        throw err;
    }
    finally {
        connection.release();
    }
}

export const fetchEmployeeById = async (id: number) => {
    // return await EmployeeModel.findOne({ id });
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM employees WHERE id = ?', [id]);
        return rows;
    } 
    catch (err) {
        console.error('Error fetching employee:', err);
        throw err;
    }
    finally {
        connection.release();
    }
}

export const addEmployee = async (newUser: Employee) => {
    const connection = await pool.getConnection();
    try{
        if ( !newUser.name || !newUser.image || !newUser.join_date || !newUser.job_desk || !newUser.schedule || !newUser.contact ) {
            throw new Error('All fields are required');
        }
        // const existingEmployee = await EmployeeModel.findOne({ id: newUser.id });
        // if (existingEmployee) {
        //     throw new Error(`Employee with id ${newUser.id} already exists`);
        // }
        // const newEmployeeInstance = new EmployeeModel(newUser);
        // await newEmployeeInstance.save();

        // return newEmployeeInstance;
        const [result] = await connection.query(`
            INSERT INTO employees (name, image, join_date, job_desk, schedule, contact)
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [
                newUser.name, 
                newUser.image, 
                newUser.join_date, 
                newUser.job_desk, 
                newUser.schedule,
                newUser.contact
            ]
        );

        const userId = (result as any).insertId;
        return { identifier: userId, ...newUser };   
    }
    catch (err) {
        console.error('Error creating employee:', err);
        throw err;
    }
    finally {
        connection.release();
    }
};

export const editEmployee = async (id: number, updatedUser: Employee) => {
    // return await EmployeeModel.findOneAndUpdate({ id }, updatedUser, { new: true });
    const connection = await pool.getConnection();
    try {
        const fields = Object.keys(updatedUser);
        const setClause = fields.map(field => `${field} = ?`).join(", ");
        const values = fields.map(field => (updatedUser as any)[field]);
        values.push(id);
        const query = `UPDATE employees SET ${setClause} WHERE id = ?`;
        const [result] = await connection.query(query, values);
        const [rows] = await connection.query('SELECT * FROM employees WHERE id = ?', [id]);
        return rows;
    }
    catch (err) {
        console.error("Error updating employee:", err);
        throw err;
    }
    finally {
        connection.release();
    }
}

export const removeEmployee = async (id: number) => {
    // return await EmployeeModel.findOneAndDelete({ id });
    const connection = await pool.getConnection();
    try {
        const [res] = await connection.query('DELETE FROM employees WHERE id = ?', [id]);
    } 
    catch (err) {
        console.error('Error deleting employee:', err);
        throw err;
    }
    finally {
        connection.release();
    }
}
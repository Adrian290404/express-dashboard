import pool from './conection';

const deleteTables = async () => {
    const connection = await pool.getConnection();
    try{
        await connection.query('DROP TABLE IF EXISTS bookings, reviews, rooms, employees');
        console.log('Tables deleted successfully');
    }
    catch (error) {
        console.error("Error al crear las tablas:", error);
    } 
    finally {
        connection.release(); 
        pool.end();
    }
}
deleteTables()
import { Booking } from "../interfaces/booking";
import BookingModel from "../models/bookingModel";
import pool from '../seed/conection';

export const fetchAllBookings = async () => {
    // return await BookingModel.find();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM bookings');
        return rows;
    } 
    catch (err) {
        console.error('Error fetching bookings:', err);
        throw err;
    }
    finally {
        connection.release();
    }
};

export const fetchBookingById = async (id: number) => {
    // return await BookingModel.findOne({ id });
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM bookings WHERE id = ?', [id]);
        return rows;
    } 
    catch (err) {
        console.error('Error fetching booking:', err);
        throw err;
    }
    finally {
        connection.release();
    }
};

export const addBooking = async (newBooking: Booking) => {
    const connection = await pool.getConnection();
    try{
        if (!newBooking.user_id || !newBooking.room_id || !newBooking.check_in || !newBooking.check_out || !newBooking.order_date) {
            throw new Error('Missing required fields');
        }
        // const existingBooking = await BookingModel.findOne({ id: newBooking.id });
        // const existingBooking = await connection.query('SELECT * FROM bookings WHERE id = ?', [newBooking.id])
        // if (existingBooking) {
        //     throw new Error(`Booking with id ${newBooking.id} already exists`);
        // }
        // const specialRequest = newBooking.special_request || "";
        // const bookingWithDefaults: Booking = {
        //     ...newBooking,
        //     special_request: specialRequest,
        // };
        // const newBookingInstance = new BookingModel(bookingWithDefaults);
        // await newBookingInstance.save();
        const [result] = await connection.query(`
            INSERT INTO bookings (user_id, room_id, check_in, check_out, special_request, order_date, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [
                newBooking.user_id, 
                newBooking.room_id, 
                newBooking.check_in, 
                newBooking.check_out, 
                newBooking.special_request || '',
                newBooking.order_date, 
                newBooking.status || 'Pending'
            ]
        );

        return { ...newBooking};      
    }
    catch (err) {
        console.error('Error creating booking:', err);
        throw err;
    }
    finally {
        connection.release();
    }
};

export const editBooking = async (id: number, updatedBooking: Booking) => {
    // return await BookingModel.findOneAndUpdate({ id }, updatedBooking, { new: true });
    const connection = await pool.getConnection();
    try {
        const fields = Object.keys(updatedBooking);
        const setClause = fields.map(field => `${field} = ?`).join(", ");
        const values = fields.map(field => (updatedBooking as any)[field]);
        values.push(id);
        const query = `UPDATE bookings SET ${setClause} WHERE id = ?`;
        const [result] = await connection.query(query, values);
        const [rows] = await connection.query('SELECT * FROM bookings WHERE id = ?', [id]);
        return rows;
    }
    catch (err) {
        console.error("Error updating booking:", err);
        throw err;
    }
    finally {
        connection.release();
    }
};

export const removeBooking = async (id: number) => {
    // return await BookingModel.findOneAndDelete({ id });
    const connection = await pool.getConnection();
    try {
        const [res] = await connection.query('DELETE FROM bookings WHERE id = ?', [id]);
    } 
    catch (err) {
        console.error('Error deleting booking:', err);
        throw err;
    }
    finally {
        connection.release();
    }
};
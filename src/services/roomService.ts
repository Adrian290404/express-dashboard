import { Room } from "../interfaces/room";
import RoomModel from "../models/roomModel";
import pool from "../seed/conection";

export const fetchAllRooms = async () => {
    // return await RoomModel.find();
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM rooms');
        return rows;
    } 
    catch (err) {
        console.error('Error fetching rooms:', err);
        throw err;
    }
    finally {
        connection.release();
    }
}

export const fetchRoomById = async (id: number) => {
    // return await RoomModel.findOne({ id });
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM rooms WHERE id = ?', [id]);
        return rows;
    } 
    catch (err) {
        console.error('Error fetching room:', err);
        throw err;
    }
    finally {
        connection.release();
    }
}

export const addRoom = async (newRoom: Room) => {
    const connection = await pool.getConnection();
    try{
        if ( !newRoom.room_name || !newRoom.bed_type || !newRoom.room_floor || !newRoom.facilities || !newRoom.rate || !newRoom.image ) {
            throw new Error('All fields are required');
        }
        // const existingRoom = await RoomModel.findOne({ id: newRoom.id });
        // if (existingRoom) {
        //     throw new Error(`Room with id ${newRoom.id} already exists`);
        // }
        // const newRoomInstance = new RoomModel(newRoom);
        // await newRoomInstance.save();

        // return newRoomInstance;
        const [result] = await connection.query(`
            INSERT INTO rooms (room_name, bed_type, room_floor, facilities, rate, avaiable, image)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [
                newRoom.room_name, 
                newRoom.bed_type, 
                newRoom.room_floor, 
                newRoom.facilities, 
                newRoom.rate,
                newRoom.avaiable || 1, 
                newRoom.image
            ]
        );
        const roomId = (result as any).insertId;
        return { identifier: roomId, ...newRoom };   
    }
    catch (err) {
        console.error('Error creating room:', err);
        throw err;
    }
    finally {
        connection.release();
    }
}

export const editRoom = async (id: number, updatedRoom: Room) => {
    // return await RoomModel.findOneAndUpdate({id}, updatedRoom, { new: true });
    const connection = await pool.getConnection();
    try {
        const fields = Object.keys(updatedRoom);
        const setClause = fields.map(field => `${field} = ?`).join(", ");
        const values = fields.map(field => (updatedRoom as any)[field]);
        values.push(id);
        const query = `UPDATE rooms SET ${setClause} WHERE id = ?`;
        const [result] = await connection.query(query, values);
        const [rows] = await connection.query('SELECT * FROM rooms WHERE id = ?', [id]);
        return rows;
    }
    catch (err) {
        console.error("Error updating room:", err);
        throw err;
    }
    finally {
        connection.release();
    }
}

export const removeRoom = async (id: number) => {
    // return await RoomModel.findOneAndDelete({id});
    const connection = await pool.getConnection();
    try {
        const [res] = await connection.query('DELETE FROM rooms WHERE id = ?', [id]);
    } 
    catch (err) {
        console.error('Error deleting room:', err);
        throw err;
    }
    finally {
        connection.release();
    }
}
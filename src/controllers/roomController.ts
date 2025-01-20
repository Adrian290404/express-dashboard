import { Request, Response } from "express";
import { fetchAllRooms, fetchRoomById, removeRoom, editRoom, addRoom } from "../services/roomService";

export const getAllRooms = async (req: Request, res: Response) => {
    const rooms = await fetchAllRooms()
    res.status(200).json(rooms)
}

export const getRoomById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const roomId = Number(id);
    const room = await fetchRoomById(roomId);
    if (!room) {
        res.status(404).json({ message: 'Room not found' })
        return;
    }
    res.status(200).json(room);
}

export const createRoom = async (req: Request, res: Response) => {
    try {
        const newRoom = req.body;
        const rooms = await addRoom(newRoom);
        res.status(201).json(rooms);
    } 
    catch (error) {
        console.error("Error on createRoom:", error);
        res.status(400).json({
            message: 'Room already exists or missing data'
        });
    }
}

export const updateRoom = async (req: Request, res: Response) => {
    const { id } = req.params;
    const roomId = Number(id);
    const updatedRoom = req.body;
    const rooms = await editRoom(roomId, updatedRoom);
    res.status(200).json(rooms)
}

export const deleteRoom = async (req: Request, res: Response) => {
    const { id } = req.params;
    const roomId = Number(id);
    const rooms = await removeRoom(roomId);
    res.status(200).json(rooms);
}
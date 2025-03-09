import { Room } from "../interfaces/room";
import RoomModel from "../models/roomModel";
import BookingModel from '../models/bookingModel'
import { createNotification } from "./notificationService";
import { ro } from "@faker-js/faker/.";

export const fetchAllRooms = async () => {
    return await RoomModel.find();
}

export const fetchRoomById = async (id: number) => {
    return await RoomModel.findOne({ id });
}

export const addRoom = async (newRoom: Room) => {
    if ( !newRoom.room_name || !newRoom.bed_type || !newRoom.room_floor || !newRoom.facilities || !newRoom.rate || newRoom.avaiable === undefined || !newRoom.image ) {
        throw new Error('All fields are required');
    }
    const existingRoom = await RoomModel.findOne({ id: newRoom.id });
    if (existingRoom) {
        throw new Error(`Room with id ${newRoom.id} already exists`);
    }
    const newRoomInstance = new RoomModel(newRoom);
    await newRoomInstance.save();
    
    await createNotification({
        type: 'create',
        collection: 'rooms',
        details: { 
            message: `New room added: ${newRoom.room_name}`, 
            id: newRoom.id 
        }
    });
    
    return newRoomInstance;
};

export const editRoom = async (id: number, updatedRoom: Room) => {
    
    await createNotification({
        type: 'edit',
        collection: 'rooms',
        details: { 
            message: `Room updated: ${updatedRoom.room_name}`, 
            id: id
        }
    });

    return await RoomModel.findOneAndUpdate({id}, updatedRoom, { new: true });
}

export const removeRoom = async (id: number) => {

    const room = await RoomModel.findOne({ id: id });
    if (room) {
        await createNotification({
            type: 'delete',
            collection: 'rooms',
            details: { 
                message: `Room deleted: ${room.room_name}`, 
                redo: room
            }
        });        
    }

    await BookingModel.deleteMany({ room_id: id });
    return await RoomModel.findOneAndDelete({ id });
}
import { Room } from "../interfaces/room";
import RoomModel from "../models/roomModel";

export const fetchAllRooms = async () => {
    return await RoomModel.find();
}

export const fetchRoomById = async (id: number) => {
    return await RoomModel.findById(id);
}

export const addRoom = async (newRoom: Room) => {
    if ( !newRoom.room_name || !newRoom.bed_type || !newRoom.room_floor || !newRoom.facilities || !newRoom.rate || newRoom.avaiable === undefined || !newRoom.image ) {
        throw new Error('All fields are required');
    }
    const newRoomInstance = new RoomModel(newRoom);
    await newRoomInstance.save();

    return newRoomInstance;
};

export const editRoom = async (id: number, updatedRoom: Room) => {
    return await RoomModel.findByIdAndUpdate(id, updatedRoom, { new: true });
}

export const removeRoom = async (id: number) => {
    return await RoomModel.findByIdAndDelete(id);
}
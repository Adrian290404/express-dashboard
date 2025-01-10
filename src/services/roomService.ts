import { Room } from "../interfaces/room";
import { rooms as roomsData } from "../data/rooms";

let rooms: Room[] = roomsData;

export const fetchAllRooms = () => {
    return rooms;
}

export const fetchRoomById = (id: number) => {
    return rooms.find((room) => room.id === id);
}

export const addRoom = (newRoom: Room) => {
    if ( !newRoom.room_name || !newRoom.bed_type || !newRoom.room_floor || !newRoom.facilities || !newRoom.rate || newRoom.avaiable === undefined || !newRoom.image ) {
        throw new Error('All fields are required');
    }
    rooms.push(newRoom);
    return rooms;
};

export const editRoom = (id: number, updatedRoom: Room) => {
    rooms = rooms.map((room) =>
        room.id === id ? { ...room, ...updatedRoom } : room
    );
    return rooms;
}

export const removeRoom = (id: number) => {
    rooms = rooms.filter((room) => room.id !== id);
    return rooms;
}
import { Router } from "express";
import { getAllRooms, getRoomById, updateRoom, createRoom, deleteRoom } from "../controllers/roomController";

const roomRouter = Router();

roomRouter.get('/', getAllRooms);
roomRouter.get('/:id', getRoomById);
roomRouter.post('/', createRoom);
roomRouter.put('/:id', updateRoom);
roomRouter.delete('/:id', deleteRoom);

export default roomRouter;
import mongoose, {Schema} from "mongoose";
import { Room } from "../interfaces/room";

export const roomSchema = new Schema<Room>({
    id: { type: Number, required: true, unique: true },
    room_name: { type: String, required: true },
    bed_type: { type: String, required: true },
    room_floor: { type: String, required: true },
    facilities: { type: String, required: true },
    rate: { type: Number, required: true },
    avaiable: { type: Boolean, required: true },
    image: { type: String, required: true}
});
const RoomModel = mongoose.model<Room>('Room', roomSchema);

export default RoomModel;
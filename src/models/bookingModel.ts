import mongoose, { Document, Schema } from "mongoose";
import { Booking } from "../interfaces/booking";

const bookingSchema = new Schema<Booking>({
    id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    room_id: { type: Number, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    special_request: { type: String, default: "" },
    order_date: { type: String, required: true },
    status: { type: String, required: true}
});
const BookingModel = mongoose.model<Booking>('Booking', bookingSchema);

export default BookingModel;
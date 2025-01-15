import { Booking } from "../interfaces/booking";
import BookingModel from "../models/bookingModel";

export const fetchAllBookings = async () => {
    return await BookingModel.find();
};

export const fetchBookingById = async (id: number) => {
    return await BookingModel.findById(id);
};

export const addBooking = async (newBooking: Booking) => {
    if (!newBooking.user_id || !newBooking.room_id || !newBooking.check_in || !newBooking.check_out || !newBooking.order_date || !newBooking.id) {
        throw new Error('Missing required fields');
    }
    const specialRequest = newBooking.special_request || "";
    const bookingWithDefaults: Booking = {
        ...newBooking,
        special_request: specialRequest,
    };
    const newBookingInstance = new BookingModel(bookingWithDefaults);
    await newBookingInstance.save();

    return newBookingInstance;
};

export const editBooking = async (id: number, updatedBooking: Booking) => {
    return await BookingModel.findByIdAndUpdate(id, updatedBooking, { new: true });
};

export const removeBooking = async (id: number) => {
    return await BookingModel.findByIdAndDelete(id);
};
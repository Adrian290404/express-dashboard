import { Booking } from "../interfaces/booking";
import BookingModel from "../models/bookingModel";
import EmployeeModel from "../models/employeeModel";
import NotificationModel from "../models/notificationModel";
import RoomModel from "../models/roomModel";
import { createNotification } from "./notificationService";

export const fetchAllBookings = async () => {
    return await BookingModel.find();
};

export const fetchBookingById = async (id: number) => {
    return await BookingModel.findOne({ id });
};

export const addBooking = async (newBooking: Booking) => {
    if (!newBooking.user_id || !newBooking.room_id || !newBooking.check_in || !newBooking.check_out || !newBooking.order_date || !newBooking.id) {
        throw new Error('Missing required fields');
    }
    const existingBooking = await BookingModel.findOne({ id: newBooking.id });
    if (existingBooking) {
        throw new Error(`Booking with id ${newBooking.id} already exists`);
    }
    const specialRequest = newBooking.special_request || "";
    const bookingWithDefaults: Booking = {
        ...newBooking,
        special_request: specialRequest,
    };
    const newBookingInstance = new BookingModel(bookingWithDefaults);
    await newBookingInstance.save();

    const employee = await EmployeeModel.findOne({ id: newBooking.user_id });
    const room = await RoomModel.findOne({ id: newBooking.room_id });
    await createNotification({
        type: 'create',
        collection: 'bookings',
        details: { 
            message: `Booking created: Room ${room?.room_name} booked by ${employee?.name}`, 
            id: newBooking.id,
            seeContent: true
        }
    });

    return newBookingInstance;
};

export const editBooking = async (id: number, updatedBooking: Booking) => {
    
    const employee = await EmployeeModel.findOne({ id: updatedBooking.user_id });
    const room = await RoomModel.findOne({ id: updatedBooking.room_id });
    await createNotification({
        type: 'update',
        collection: 'bookings',
        details: { 
            message: `Booking updated: Room ${room?.room_name} booked by ${employee?.name}`, 
            id: id,
            seeContent: true
        }
    });
    
    return await BookingModel.findOneAndUpdate({ id }, updatedBooking, { new: true });
};

export const removeBooking = async (id: number) => {

    const booking = await BookingModel.findOne({ id: id });
    const employee = await EmployeeModel.findOne({ id: booking?.user_id });
    const room = await RoomModel.findOne({ id: booking?.room_id });
    if (booking) {
        await NotificationModel.updateMany(
            {
                collection: 'bookings',
                'details.id': id,
                type: { $in: ['create', 'update'] }
            },
            {
                $set: { 'details.seeContent': false }
            }
        );

        await createNotification({
            type: 'delete',
            collection: 'bookings',
            details: { 
                message: `Booking deleted: Room ${room?.room_name} booked by ${employee?.name}`, 
            }
        });        
    }
    
    return await BookingModel.findOneAndDelete({ id });
};
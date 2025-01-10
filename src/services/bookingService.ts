import { Booking } from "../interfaces/booking";
import { bookings as bookingData } from "../data/bookings";

let bookings: Booking[] = bookingData;

export const fetchAllBookings = () => {
    return bookings;
};

export const fetchBookingById = (id: number) => {
    return bookings.find((booking) => booking.id === id);
};

export const addBooking = (newBooking: Booking) => {
    if (!newBooking.user_id || !newBooking.room_id || !newBooking.check_in || !newBooking.check_out || !newBooking.order_date || !newBooking.id) {
        throw new Error('Missing required fields');
    }
    const specialRequest = newBooking.special_request || "";
    const bookingWithDefaults: Booking = {
        ...newBooking,
        special_request: specialRequest, 
    };
    bookings.push(bookingWithDefaults);
    return bookingWithDefaults;
};

export const editBooking = (id: number, updatedBooking: Booking) => {
    bookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
    );
    return bookings;
};

export const removeBooking = (id: number) => {
    bookings = bookings.filter((booking) => booking.id !== id);
    return bookings;
};
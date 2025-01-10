import { Request, Response } from "express";
import { fetchAllBookings, fetchBookingById, addBooking, editBooking, removeBooking } from "../services/bookingService";

export const getAllBookings = (req: Request, res: Response) => {
    const bookings = fetchAllBookings();
    res.status(200).json(bookings)
}

export const getBooking = (req: Request, res: Response) => {
    const { id } = req.params;
    const bookingId = Number(id);
    const booking = fetchBookingById(bookingId);
    if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
}

export const createBooking = (req: Request, res: Response) => {
    const newBooking = req.body;
    const bookings = addBooking(newBooking);
    res.status(201).json(bookings)
}

export const updateBooking = (req: Request, res: Response) => {
    const updatedBooking = req.body;
    const { id } = req.params;
    const bookingId = Number(id);
    const bookings = editBooking(bookingId, updatedBooking)
    res.status(200).json(bookings);
}

export const deleteBooking = (req: Request, res: Response) => {
    const { id } = req.params;
    const bookingId = Number(id);
    const bookings = removeBooking(bookingId);
    res.status(200).json(bookings);
}
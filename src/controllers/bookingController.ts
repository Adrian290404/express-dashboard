import { Request, Response } from "express";
import { fetchAllBookings, fetchBookingById, addBooking, editBooking, removeBooking } from "../services/bookingService";

export const getAllBookings = async (req: Request, res: Response) => {
    const bookings = await fetchAllBookings();
    res.status(200).json(bookings)
}

export const getBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookingId = Number(id);
    const booking = await fetchBookingById(bookingId);
    if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
}

export const createBooking = async (req: Request, res: Response) => {
    try {
        const newBooking = req.body;
        const bookings = await addBooking(newBooking);
        res.status(201).json(bookings);
    } 
    catch (error) {
        console.error("Error on createBooking:", error);
        res.status(400).json({
            message: 'Booking already exists or missing data'
        });
    }
};

export const updateBooking = async (req: Request, res: Response) => {
    try{
        const updatedBooking = req.body;
        const { id } = req.params;
        const bookingId = Number(id);
        const bookings = await editBooking(bookingId, updatedBooking)
        res.status(200).json(bookings);
    }
    catch (error) {
        console.error("Error on updateBooking:", error);
        res.status(400).json({
            message: 'Booking not found or missing data'
        });
    }
}

export const deleteBooking = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bookingId = Number(id);
    const bookings = await removeBooking(bookingId);
    res.status(200).json(bookings);
}
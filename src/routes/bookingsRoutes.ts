import { Router } from "express";
import { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking } from "../controllers/bookingController"

const bookingRouter = Router();

bookingRouter.get('/', getAllBookings);
bookingRouter.get('/:id', getBooking);
bookingRouter.post('/', createBooking);
bookingRouter.put('/:id', updateBooking);
bookingRouter.delete('/:id', deleteBooking);

export default bookingRouter; 
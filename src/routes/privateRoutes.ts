import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import bookingRoutes from './bookingsRoutes'
import reviewRoutes from './reviewRoutes'
import employeesRoutes from "./employeesRoutes";
import roomRouter from "./roomsRoutes";

const router = Router();

router.use(authenticateToken);

router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/employees', employeesRoutes)
router.use('/rooms', roomRouter)

export default router;
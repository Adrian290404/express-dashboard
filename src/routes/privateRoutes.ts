import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import bookingRoutes from './bookingsRoutes'
import reviewRoutes from './reviewRoutes'
import employeesRoutes from "./employeesRoutes";
import roomRouter from "./roomsRoutes";
import notificationRouter from "./notificationRoutes";

const router = Router();

router.use(authenticateToken);

router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/employees', employeesRoutes)
router.use('/rooms', roomRouter)
router.use('/notifications', notificationRouter)

export default router;
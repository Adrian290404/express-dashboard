import { Router } from "express";
import { getAllNotifications, getCountNoRead, putAllAsRead } from "../controllers/notificationController";


const notificationRouter = Router();

notificationRouter.get('/', getAllNotifications);
notificationRouter.get('/count', getCountNoRead);
notificationRouter.put('/', putAllAsRead);

export default notificationRouter;
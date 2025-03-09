import { Request, Response } from "express";
import { getNotifications, getUnreadCount, markAsRead } from "../services/notificationService";

export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const notifications = await getNotifications(page, limit);
        const totalNotifications = await getUnreadCount();

        res.status(200).json({
            notifications,
            currentPage: page,
            totalPages: Math.ceil(totalNotifications / limit),
            totalNotifications,
        });
    } 
    catch (error) {
        res.status(500).json({ error: "Error al obtener las notificaciones" });
    }
};

export const getCountNoRead = async (req: Request, res: Response) => {
    try {
        const count = await getUnreadCount();
        res.status(200).json({ unreadCount: count });
    } 
    catch (error) {
        res.status(500).json({ error: "Error al obtener el número de notificaciones no leídas" });
    }
}

export const putAllAsRead = async (req: Request, res: Response) => {
    try {
        await markAsRead();
        res.status(200).json({ message: "Todas las notificaciones han sido marcadas como leídas" });
    } 
    catch (error) {
        res.status(500).json({ error: "Error al marcar las notificaciones como leídas" });
    }
}
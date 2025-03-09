import NotificationModel from "../models/notificationModel";

interface CreateNotification{
    type: string;
    collection: string;
    details?: any;
} 

export const getUnreadCount = async () => {
    return await NotificationModel.countDocuments({ read: false });
};

export const createNotification = async(notificationData: CreateNotification) => {
    const notification = new NotificationModel(notificationData);
    return await notification.save();
};

export const getNotifications = async (page: number = 1, limit: number = 10, query: object = {}) => {
    const notifications = await NotificationModel.find(query)
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    return notifications;
};
  
export const markAsRead = async () => {
    return await NotificationModel.updateMany({ read: false }, { read: true });
};
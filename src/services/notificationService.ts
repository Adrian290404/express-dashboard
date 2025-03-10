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

export const getNotifications = async (query: object = {}) => {
    const notifications = await NotificationModel.find(query).sort({ timestamp: -1 });
    return notifications;
};
  
export const markAsRead = async () => {
    return await NotificationModel.updateMany({ read: false }, { read: true });
};
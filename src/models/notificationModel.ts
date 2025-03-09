import mongoose, { Schema } from 'mongoose';
import { Notification } from '../interfaces/notification';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const NotificationSchema = new Schema<Notification>({
    id: { type: Number, unique: true },
    type: { type: String, required: true, enum: ['create', 'update', 'delete'] },
    collection: { type: String, required: true, enum: ['rooms', 'employees', 'reviews', 'bookings'] },
    timestamp: { type: Date, default: Date.now },
    details: { type: Schema.Types.Mixed, default: {} },
    read: { type: Boolean, default: false },
});

NotificationSchema.plugin(AutoIncrement, { inc_field: 'id' });

const NotificationModel = mongoose.model<Notification>('Notification', NotificationSchema);
export default NotificationModel;


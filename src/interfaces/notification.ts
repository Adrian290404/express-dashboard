export interface Notification{
    id: Number;
    type: string;
    collection: string;
    timestamp: Date;
    details?: any;
    read: boolean;
}
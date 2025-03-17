import mongoose from 'mongoose';
import connectDB from './conection';

import BookingModel from '../models/bookingModel';
import ReviewModel from '../models/reviewModel';
import RoomModel from '../models/roomModel';
import EmployeeModel from '../models/employeeModel';
import NotificationModel from '../models/notificationModel';

import { bookings } from '../data/bookings';
import { reviews } from '../data/reviews';
import { employees } from '../data/employees';
import { rooms } from '../data/rooms';

const seedDatabaseFromJSON = async () => {
    try {
        await connectDB();
        console.log("Conectado a MongoDB");

        await Promise.all([
            BookingModel.deleteMany({}),
            ReviewModel.deleteMany({}),
            EmployeeModel.deleteMany({}),
            RoomModel.deleteMany({}),
            NotificationModel.deleteMany({})
        ]);

        await Promise.all([
            BookingModel.insertMany(bookings),
            ReviewModel.insertMany(reviews),
            EmployeeModel.insertMany(employees),
            RoomModel.insertMany(rooms)
        ]);

        console.log("Base de datos llenada con los datos del JSON");
    } 
    catch (error) {
        console.error("Error al insertar los datos:", error);
    } 
    finally {
        mongoose.connection.close();
    }
};

seedDatabaseFromJSON();
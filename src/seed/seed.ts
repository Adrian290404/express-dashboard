import { faker } from '@faker-js/faker';
import { Booking } from '../interfaces/booking';
import { Review } from '../interfaces/review';
import { Employee } from '../interfaces/employee';
import { Room } from '../interfaces/room';
// import mongoose from 'mongoose';
// import connectDB from './conection';
import pool from './conection';
import { format } from 'date-fns';
// import BookingModel from '../models/bookingModel';
// import ReviewModel from '../models/reviewModel';
// import RoomModel from '../models/roomModel';
// import EmployeeModel from '../models/employeeModel';

let bookingIdCounter = 1;
const createRandomBooking = (): Booking => {
    return{
        id: bookingIdCounter++,
        user_id: faker.number.int({ min: 1, max: 10 }),
        room_id: faker.number.int({ min: 1, max: 10 }),
        check_in: format(faker.date.future(), 'yyyy-MM-dd HH:mm:ss'),
        check_out: format(faker.date.future(), 'yyyy-MM-dd HH:mm:ss'),
        special_request: faker.lorem.words(faker.number.int({ min: 1, max: 5 })),
        order_date: format(faker.date.past(), 'yyyy-MM-dd HH:mm:ss'),
        status: faker.helpers.arrayElement(['Booked', 'Refund', 'Pending', 'Cancelled'])
    }
}

let reviewIdCounter = 1;
const createRandomReview = (): Review => {
    return{
        order_id: reviewIdCounter++,
        user_id: faker.number.int({ min: 1, max: 10 }),
        date: format(faker.date.past(), 'yyyy-MM-dd HH:mm:ss'),
        rating: faker.number.int({ min: 1, max: 5 }),
        review: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
        action: faker.helpers.arrayElement(['pending', 'approved','rejected'])
    }
}

let employeeIdCounter = 1;
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const createRandomEmployee = (): Employee => {
    return{
        id: employeeIdCounter++,
        name: faker.person.fullName(),
        image: faker.image.avatar(),
        join_date: format(faker.date.past(), 'yyyy-MM-dd HH:mm:ss'),
        job_desk: faker.person.jobType(),
        schedule: faker.helpers.arrayElements(daysOfWeek, 2).join(", "),
        contact: faker.phone.number()
    }
}

let roomIdCounter = 1;
const createRandomRoom = (): Room => {
    const facilitiesFaked = Array.from({ length: 5 }, () => faker.lorem.word()).join(', ');
    return{
        id: roomIdCounter++,
        room_name: faker.lorem.words(faker.number.int({ min: 2, max: 5 })),
        bed_type: faker.helpers.arrayElement(['Suite', 'Double Bed', 'Single Bed']),
        room_floor: faker.helpers.arrayElement(['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4']),
        facilities: facilitiesFaked,
        rate: faker.number.int({ min: 100, max: 1000 }),
        avaiable: faker.datatype.boolean(),
        image: faker.image.avatarGitHub()
    }
}

const bookingSeed = faker.helpers.multiple(createRandomBooking, { count: 10 });
const reviewSeed = faker.helpers.multiple(createRandomReview, { count: 10 });
const employeeSeed = faker.helpers.multiple(createRandomEmployee, { count: 10 });
const roomSeed = faker.helpers.multiple(createRandomRoom, { count: 10 });

// const seedDatabase = async () => {
//     try {
//         await connectDB();
//         console.log("Conectado a MongoDB");

//         await Promise.all([
//             BookingModel.deleteMany({}),
//             ReviewModel.deleteMany({}),
//             EmployeeModel.deleteMany({}),
//             RoomModel.deleteMany({})
//         ]);

//         await Promise.all([
//             BookingModel.insertMany(bookingSeed),
//             ReviewModel.insertMany(reviewSeed),
//             EmployeeModel.insertMany(employeeSeed),
//             RoomModel.insertMany(roomSeed)
//         ]);

//         console.log("Base de datos llena");
//     } 
//     catch (error) {
//         console.error("Error al insertar los datos:", error);
//     } 
//     finally {
//         mongoose.connection.close();
//     }
// };

// seedDatabase();

const createTables = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS rooms (
                id INT AUTO_INCREMENT PRIMARY KEY,
                room_name VARCHAR(100) NOT NULL,
                bed_type VARCHAR(100) NOT NULL,
                room_floor VARCHAR(100) NOT NULL,
                facilities VARCHAR(200) NOT NULL,
                rate INT NOT NULL,
                avaiable TINYINT NOT NULL DEFAULT 1,
                image VARCHAR(500) NOT NULL
            );
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                image VARCHAR(500) NOT NULL,
                join_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                job_desk VARCHAR(100) NOT NULL,
                schedule VARCHAR(100) NOT NULL DEFAULT 'No definido',
                contact VARCHAR(50) NOT NULL
            );
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                order_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                rating INT NOT NULL,
                review VARCHAR(250) NOT NULL,
                action ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
                FOREIGN KEY (user_id) REFERENCES employees(id) ON DELETE CASCADE
            );
        `);
        
        await connection.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                room_id INT NOT NULL,
                check_in TIMESTAMP NOT NULL,
                check_out TIMESTAMP NOT NULL,
                special_request VARCHAR(200) DEFAULT '',
                order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                status ENUM('Booked', 'Refund', 'Cancelled', 'Pending') DEFAULT 'Pending',
                FOREIGN KEY (user_id) REFERENCES employees(id) ON DELETE CASCADE,
                FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
            );
        `);        

        console.log("Tablas creadas correctamente.");
    } 
    catch (error) {
        console.error("Error al crear las tablas:", error);
    } 
    finally {
        connection.release(); 
    }
};

const insertData = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Insertando datos en la base de datos...");

        for (const room of roomSeed) {
            await connection.query(
                `INSERT INTO rooms (room_name, bed_type, room_floor, facilities, rate, avaiable, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [room.room_name, room.bed_type, room.room_floor, room.facilities, room.rate, room.avaiable, room.image]
            );
        }

        for (const employee of employeeSeed) {
            await connection.query(
                `INSERT INTO employees (name, image, join_date, job_desk, schedule, contact) VALUES (?, ?, ?, ?, ?, ?)`,
                [employee.name, employee.image, employee.join_date, employee.job_desk, employee.schedule, employee.contact]
            );
        }

        for (const review of reviewSeed) {
            await connection.query(
                `INSERT INTO reviews (user_id, date, rating, review, action) VALUES (?, ?, ?, ?, ?)`,
                [review.user_id, review.date, review.rating, review.review, review.action]
            );
        }

        for (const booking of bookingSeed) {
            await connection.query(
                `INSERT INTO bookings (user_id, room_id, check_in, check_out, special_request, order_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [booking.user_id, booking.room_id, booking.check_in, booking.check_out, booking.special_request, booking.order_date, booking.status]
            );
        }

        console.log("Datos insertados correctamente.");
    } 
    catch (error) {
        console.error("Error al insertar datos:", error);
    } 
    finally {
        connection.release();
        pool.end();
    }
}

const seedDatabase = async () => {
    await createTables();
    await insertData();
};

seedDatabase();
import { Request, Response } from "express";

export const getHotelInfo = (req: Request, res: Response) => {
    res.json({
        name: `Hotel Miranda`,
        endpoints: {
            authentication: [
                {
                    method: 'POST',
                    path: '/api/auth',
                    description: 'Login to access to the information',
                    body: 'username, password'
                }
            ],
            bookings: [
                {
                    method: 'GET',
                    path: '/api/protected/bookings',
                    description: 'Get a list of all bookings'
                },
                {
                    method: 'GET',
                    path: '/api/protected/bookings/:id',
                    description: 'Get a specific booking'
                },
                {
                    method: 'POST',
                    path: '/api/protected/bookings',
                    description: 'Create a booking',
                    body: 'user_id, room_id, check_in, check_out, order_date, id, special_request (optional)'
                },
                {
                    method: 'PUT',
                    path: '/api/protected/bookings/:id',
                    description: 'Update a booking',
                    body: 'user_id, room_id, check_in, check_out, order_date, id, special_request'
                },
                {
                    method: 'DELETE',
                    path: '/api/protected/bookings/:id',
                    description: 'Delete a booking'
                }
            ],
            rooms: [
                {
                    method: 'GET',
                    path: '/api/protected/rooms',
                    description: 'Get a list of all rooms'
                },
                {
                    method: 'GET',
                    path: '/api/protected/rooms/:id',
                    description: 'Get a specific room'
                },
                {
                    method: 'POST',
                    path: '/api/protected/rooms',
                    description: 'Create a room',
                    body: 'id, room_name, bed_type, room_floor, facilities, rate, avaiable, image'
                },
                {
                    method: 'PUT',
                    path: '/api/protected/rooms/:id',
                    description: 'Update a room',
                    body: 'id, room_name, bed_type, room_floor, facilities, rate, avaiable, image'
                },
                {
                    method: 'DELETE',
                    path: '/api/protected/rooms/:id',
                    description: 'Delete a room'
                }
            ],
            reviews: [
                {
                    method: 'GET',
                    path: '/api/protected/reviews',
                    description: 'Get a list of all reviews'
                },
                {
                    method: 'GET',
                    path: '/api/protected/reviews/:id',
                    description: 'Get a specific review'
                },
                {
                    method: 'POST',
                    path: '/api/protected/reviews',
                    description: 'Create a review',
                    body: 'order_id, date, customer, rating, review, action'
                },
                {
                    method: 'PUT',
                    path: '/api/protected/reviews/:id',
                    description: 'Update a review',
                    body: 'order_id, date, customer, rating, review, action'
                },
                {
                    method: 'DELETE',
                    path: '/api/protected/reviews/:id',
                    description: 'Delete a review'
                }
            ],
            employee: [
                {
                    method: 'GET',
                    path: '/api/protected/employees',
                    description: 'Get a list of all employees'
                },
                {
                    method: 'GET',
                    path: '/api/protected/employees/:id',
                    description: 'Get a specific employee'
                },
                {
                    method: 'POST',
                    path: '/api/protected/employees',
                    description: 'Create a employee',
                    body: 'id, name, image, join, job_desk, schedule, contact'
                },
                {
                    method: 'PUT',
                    path: '/api/protected/employees/:id',
                    description: 'Update a employee',
                    body: 'id, name, image, join, job_desk, schedule, contact'
                },
                {
                    method: 'DELETE',
                    path: '/api/protected/employees/:id',
                    description: 'Delete a employee'
                }
            ]
        },
    });
};
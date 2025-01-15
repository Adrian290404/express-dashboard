import { faker } from '@faker-js/faker';
import { Booking } from '../interfaces/booking';
import { Review } from '../interfaces/review';
import { Employee } from '../interfaces/employee';
import { Room } from '../interfaces/room';

let bookingIdCounter = 1;
const createRandomBooking = (): Booking => {
    return{
        id: bookingIdCounter++,
        user_id: faker.number.int({ min: 0, max: 10 }),
        order_date: faker.date.past().toISOString(),
        check_in: faker.date.future().toISOString(),
        check_out: faker.date.future().toISOString(),
        special_request: faker.lorem.words(faker.number.int({ min: 0, max: 5 })),
        room_id: faker.number.int({ min: 0, max: 10 }),
        status: faker.helpers.arrayElement(['Booking', 'Refund', 'Pending', 'Cancelled'])
    }
}

let reviewIdCounter = 1;
const createRandomReview = (): Review => {
    return{
        order_id: reviewIdCounter++,
        date: faker.date.past().toISOString(),
        customer: faker.person.fullName(),
        rating: faker.number.int({ min: 1, max: 5 }),
        review: faker.lorem.sentences(faker.number.int({ min: 5, max: 20 })),
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
        join: faker.date.past().toISOString(),
        job_desk: faker.person.jobType(),
        schedule: faker.helpers.arrayElements(daysOfWeek, 2).join(", "),
        contact: faker.phone.number()
    }
}

let roomIdCounter = 1;
const createRandomRoom = (): Room => {
    return{
        id: roomIdCounter++,
        room_name: faker.lorem.words(faker.number.int({ min: 2, max: 5 })),
        bed_type: faker.helpers.arrayElement(['Suite', 'Double Bed', 'Single Bed']),
        room_floor: faker.helpers.arrayElement(['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4']),
        facilities: faker.lorem.sentence(),
        rate: faker.number.int({ min: 100, max: 1000 }),
        avaiable: faker.datatype.boolean(),
        image: faker.image.avatarGitHub()
    }
}

export const bookingSeed = faker.helpers.multiple(createRandomBooking, { count: 10 });
export const reviewSeed = faker.helpers.multiple(createRandomReview, { count: 10 });
export const employeeSeed = faker.helpers.multiple(createRandomEmployee, { count: 10 });
export const roomSeed = faker.helpers.multiple(createRandomRoom, { count: 10 });
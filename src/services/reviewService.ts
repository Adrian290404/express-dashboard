import { Review } from "../interfaces/review";
import ReviewModel from "../models/reviewModel";

export const fetchAllReviews = async () => {
    return await ReviewModel.find();
};

export const fetchReviewById = async (order_id: number) => {
    return await ReviewModel.findOne({ order_id });
};

export const fetchRandomReviews = async () => {
    let preferredReviews = await ReviewModel.aggregate([
       { $match: { customer_id: { $ne: 0 } } },
       { $sample: { size: 3 } }
    ]);

    if (preferredReviews.length < 3) {
       const extraNeeded = 3 - preferredReviews.length;
       const extraReviews = await ReviewModel.aggregate([
            { $match: { _id: { $nin: preferredReviews.map(r => r._id) } } },
            { $sample: { size: extraNeeded } }
       ]);
       preferredReviews = preferredReviews.concat(extraReviews);
    }
    return preferredReviews;
};

export const addReview = async (newReview: Review) => {
    const { order_id, date, customer_id, rating, review, action } = newReview;
    if (!order_id || !date || (customer_id === undefined) || !rating || !review || !action) {
        throw new Error('Todos los campos son obligatorios');
    }
    if (rating < 1 || rating > 5) {
        throw new Error('El rating debe estar entre 1 y 5');
    }
    if (!['pending', 'approved', 'rejected'].includes(action)) {
        throw new Error('El estado (action) debe ser "pending", "approved" o "rejected"');
    }
    const existingReview = await ReviewModel.findOne({ order_id: newReview.order_id });
    if (existingReview) {
        throw new Error(`Ya existe una review con order_id ${newReview.order_id}`);
    }
    const newReviewInstance = new ReviewModel(newReview);
    await newReviewInstance.save();

    return newReviewInstance;
};

export const updateReviewStatus = async (order_id: number, newStatus: string) => {
    if (!['pending', 'approved', 'rejected'].includes(newStatus)) {
        throw new Error('El estado (action) debe ser "pending", "approved" o "rejected"');
    }
    return await ReviewModel.findOneAndUpdate({ order_id }, { action: newStatus }, { new: true });
};
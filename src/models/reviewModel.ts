import mongoose, {Schema} from "mongoose";
import { Review } from "../interfaces/review";

export const reviewSchema = new Schema<Review>({
    order_id: { type: Number, required: true, unique: true },
    date: { type: String, required: true },
    customer_id: { type: Number, default: 0 },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    action: { type: String, required: true, enum: ['pending', 'approved', 'rejected']}
});
const ReviewModel = mongoose.model<Review>('Review', reviewSchema);

export default ReviewModel;
import { Router } from "express";
import { getAllReviews, getReview, deleteReview, createReview, updateReview } from "../controllers/reviewController";

const reviewRouter = Router();

reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReview);
reviewRouter.post('/', createReview);
reviewRouter.put('/:id', updateReview);
reviewRouter.delete('/:id', deleteReview)

export default reviewRouter;
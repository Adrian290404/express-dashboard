import { Router } from "express";
import { getAllReviews, getReview, getRandomReviews, createReview, updateReviewAction } from "../controllers/reviewController";

const reviewRouter = Router();

reviewRouter.get('/', getAllReviews);
reviewRouter.get('/random', getRandomReviews);
reviewRouter.get('/:id', getReview);
reviewRouter.post('/', createReview);
reviewRouter.put('/:id/status', updateReviewAction);

export default reviewRouter;
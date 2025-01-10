import { Router } from "express";
import { getHotelInfo } from "../controllers/hotelController";

const publicRoutes = Router();

publicRoutes.get('/', getHotelInfo);

export default publicRoutes;
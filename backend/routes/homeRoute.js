import { Router } from "express";
// import { allVideos } from "../controllers/videoController.js";
import { getDashboardDetails, latestvideo } from "../controllers/homeController.js";

const router = Router();

router.get("/dashboardDetails", getDashboardDetails);
router.get("/latestvideo", latestvideo);

export default router;

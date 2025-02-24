import { Router } from "express";
import { signup, login, dashboard } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", dashboard);

export default router;

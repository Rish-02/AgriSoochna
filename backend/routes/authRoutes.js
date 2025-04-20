import { Router } from "express";

import { signup  , login, dashboard  } from "../controllers/authController.js";
 
import { getUserInfo } from "../controllers/authController.js";


const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard",  dashboard);
// router.get("/getUserInfo", getUserInfo);

router.get("/getUserInfo", getUserInfo);



export default router;

import { checkUser } from "../controllers/AuthController.js"
import { Router } from "express";


const router = Router();

router.post("/check-user", checkUser);

export default router;

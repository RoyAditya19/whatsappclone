import { checkUser, onBoardUser } from "../controllers/AuthController.js"
import { Router } from "express";


const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onBoardUser);

export default router;

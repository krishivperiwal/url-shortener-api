import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { registerUserApi, loginUserApi } from "../controllers/authController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);

router.post("/api/register", registerUserApi);
router.post("/api/login", loginUserApi);

export default router;
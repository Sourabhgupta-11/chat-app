import express from 'express';
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { jwtAuthMiddleware } from '../middleware/jwt.js';

const router=express.Router()

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.put("/update-profile",jwtAuthMiddleware,updateProfile)
router.get("/check",jwtAuthMiddleware,checkAuth)

export default router;
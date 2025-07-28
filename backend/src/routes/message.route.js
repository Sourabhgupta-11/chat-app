import express from 'express';
import { jwtAuthMiddleware } from '../middleware/jwt.js';
import { getMessages, getUsersForSidebar } from '../controllers/message.controller.js';

const router=express.Router()

router.get("/users",jwtAuthMiddleware,getUsersForSidebar)
router.get("/:id",jwtAuthMiddleware,getMessages)

export default router;
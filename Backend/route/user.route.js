import express from 'express';
import { signup, login, createOrUpdateUser, getUserCart, addToCart, updateCartItem } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-or-update", createOrUpdateUser);
router.get("/cart/:uid", verifyToken, getUserCart);
router.post("/cart/add", verifyToken, addToCart);
router.put("/cart/update", verifyToken, updateCartItem);

export default router;
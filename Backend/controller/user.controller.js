import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword
        });
        await createdUser.save();
        // Changed status code from 202 to 201 to indicate resource creation
        res.status(201).json({
            message: "User successfully created!", user: {
                _id: createdUser.id,
                fullname: createdUser.fullname,
                email: createdUser.email
            }
        });
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ message: "Something went wrong:(" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // First check if user exists
        if (!user) {
            return res.status(400).json({ message: "Invalid Username or Password!" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Username or Password!" });
        }
        res.status(200).json({
            message: "Logged in successfully!", user: {
                _id: user.id,
                fullname: user.fullname,
                email: user.email
            }
        });
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createOrUpdateUser = async (req, res) => {
    try {
        const { uid, email, fullname } = req.body;
        let user = await User.findOne({ uid });
        
        if (!user) {
            user = new User({
                uid,
                email,
                fullname,
                cart: []
            });
        }
        
        await user.save();
        res.status(200).json({
            success: true,
            user: {
                uid: user.uid,
                email: user.email,
                fullname: user.fullname,
                cart: user.cart
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error creating/updating user" 
        });
    }
};

export const getUserCart = async (req, res) => {
    try {
        const { uid } = req.params;
        
        const user = await User.findOne({ uid });
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        res.status(200).json({
            success: true,
            cart: user.cart
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching cart" 
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const uid = req.user.uid; // Gets UID from the verified token
        const { bookId, name, price, image } = req.body;
        
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if item already exists in cart
        const existingItem = user.cart.find(item => item.bookId === bookId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Add new item to cart
            user.cart.push({ bookId, name, price, image, quantity: 1 });
        }
        
        await user.save();
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const uid = req.user.uid;
        const { bookId, quantity } = req.body;
        
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = user.cart.find(item => item.bookId === bookId);
        if (!cartItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        if (quantity === 0) {
            user.cart = user.cart.filter(item => item.bookId !== bookId);
        } else {
            cartItem.quantity = quantity;
        }
        
        await user.save();
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: error.message });
    }
};
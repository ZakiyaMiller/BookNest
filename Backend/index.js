import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import { checkFirebaseConnection } from './middleware/authMiddleware.js';

const app = express()

dotenv.config();

const URI = process.env.MONGODB_URI;
if (!URI) {
    console.error("Error: MONGODB_URI is undefined");
    process.exit(1);
}

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

//connecting to mongoDB
try { 
    mongoose.connect(URI);  // Remove deprecated options
    console.log("Connected to MongoDB Database");
} catch (error){
    console.log("Error:", error);
}

// Add before your routes
app.get('/health', async (req, res) => {
    const firebaseStatus = await checkFirebaseConnection();
    res.json({
        status: 'ok',
        firebase: firebaseStatus ? 'connected' : 'disconnected'
    });
});

//defining routes 
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong on the server' 
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
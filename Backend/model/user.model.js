import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    image: {
        type: String,
        required: true
    }
});

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false  // Changed to false since we're using Firebase auth
    },
    uid: {
        type: String,
        unique: true,
        required: true  // Added required: true
    },
    cart: [cartItemSchema]
});

const User = mongoose.model("User", userSchema);
export default User;
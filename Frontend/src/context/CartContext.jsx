import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [authUser] = useAuth();

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const token = authUser ? await authUser.getIdToken() : null;
            console.log('Token being sent:', token); // Debug log
            const response = await axios.get(`http://localhost:4001/user/cart/${authUser?.uid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(response.data.cart);
            localStorage.setItem('cart', JSON.stringify(response.data.cart));
        } catch (error) {
            setError(error.message);
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    }, [authUser]);

    useEffect(() => {
        if (authUser) {
            const localCart = localStorage.getItem('cart');
            if (localCart) {
                setCart(JSON.parse(localCart));
            }
            fetchCart();
        } else {
            setCart([]);
            localStorage.removeItem('cart');
        }
    }, [authUser, fetchCart]);

    const addToCart = async (item) => {
        try {
            const token = await authUser.getIdToken();
            console.log('Token being sent:', token); // Debug log
            const response = await axios.post('http://localhost:4001/user/cart/add',
                item,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data.cart);
            localStorage.setItem('cart', JSON.stringify(response.data.cart));
            await fetchCart(); // Add this line to refresh the cart
            return response.data; // Return for success handling
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error; // Throw error for error handling in components
        }
    };

    const updateCartItem = async (bookId, quantity) => {
        try {
            const token = await authUser.getIdToken();
            console.log('Token being sent:', token); // Debug log
            const response = await axios.put('http://localhost:4001/user/cart/update',
                { bookId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data.cart);
            localStorage.setItem('cart', JSON.stringify(response.data.cart));
            await fetchCart(); // Add this line to refresh the cart
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateCartItem,
            loading,
            error
        }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };

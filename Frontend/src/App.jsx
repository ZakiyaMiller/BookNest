import React from "react";
import Home from "./home/Home";
import Shop from "./shop/Shop";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { CartProvider } from './context/CartContext';
import AuthProvider from './context/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="dark:bg-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/shop"
              element={<ProtectedRoute><Shop /></ProtectedRoute>}
            />
            <Route
              path="/cart"
              element={<ProtectedRoute><Cart /></ProtectedRoute>}
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
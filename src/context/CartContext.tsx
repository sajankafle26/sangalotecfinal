"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { VideoCourse } from "@/types";

interface CartContextType {
    cartItems: VideoCourse[];
    addToCart: (course: VideoCourse) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<VideoCourse[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("st_cart");
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("st_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (course: VideoCourse) => {
        if (!cartItems.find((item) => item.id === course.id)) {
            setCartItems([...cartItems, course]);
        }
    };

    const removeFromCart = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            itemCount: cartItems.length
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

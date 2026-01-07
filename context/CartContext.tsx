
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of a cart item
export type CartItem = {
    id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
};

type CartContextType = {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    toggleCart: () => void;
    cartTotal: number;
    cartCount: number;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('eyira_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isOpen, setIsOpen] = useState(false);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('eyira_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === product.id);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { ...product, quantity: 1 }];
        });
        setIsOpen(true); // Open cart when adding item
    };

    const removeFromCart = (id: string) => {
        setItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems(currentItems => {
            return currentItems.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            });
        });
    };

    const toggleCart = () => setIsOpen(!isOpen);

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            isOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            cartTotal,
            cartCount,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

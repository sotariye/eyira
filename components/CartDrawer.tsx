
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
    const { items, isOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useCart();

    // Delivery Method State
    const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'pickup'>('ship');

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = async () => {
        if (items.length === 0) return;

        // Close the drawer intentionally before navigation
        // toggleCart(); 

        try {
            // Using relative path '/api/checkout'.
            // Locally: request goes to Vite -> Proxy -> server.js (http://localhost:4242/api/checkout)
            // Production: request goes to Vercel -> api/checkout.js
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items, deliveryMethod }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                alert('Something went wrong initiating checkout.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Could not connect to checkout service. Ensure server is running.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="relative z-50">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className="fixed top-0 right-0 w-full md:w-[480px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-500 animate-in slide-in-from-right">

                {/* Header */}
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#FCFCFC]">
                    <h2 className="font-serif text-3xl text-black">Your Cart ({itemCount})</h2>
                    <button
                        onClick={toggleCart}
                        className="font-sans text-[11px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity"
                    >
                        Close
                    </button>
                </div>

                {/* Scrollable Items Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-12">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <span className="font-serif text-4xl italic mb-4">It's empty.</span>
                            <a href="#/product/standard" onClick={toggleCart} className="font-sans text-xs tracking-widest uppercase hover:text-black border-b border-transparent hover:border-black transition-all">Shop our products.</a>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                <div className="w-24 h-32 flex-shrink-0 bg-gray-50 border border-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[10%]" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-serif text-xl text-black">{item.name}</h4>
                                            <span className="font-serif text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <span className="font-sans text-[10px] tracking-[0.2em] text-gray-400 uppercase">{item.size}</span>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-4 border border-gray-200 px-3 py-1">
                                            <button
                                                onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-black transition-colors px-1"
                                            >
                                                -
                                            </button>
                                            <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="text-gray-400 hover:text-black transition-colors px-1"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-red-900 border-b border-transparent hover:border-red-900 transition-all"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="p-8 border-t border-gray-100 bg-[#FCFCFC]">
                        {/* Delivery Toggle */}
                        <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
                            <button
                                onClick={() => setDeliveryMethod('ship')}
                                className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-medium transition-all rounded-md ${deliveryMethod === 'ship' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Ship
                            </button>
                            <button
                                onClick={() => setDeliveryMethod('pickup')}
                                className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-medium transition-all rounded-md ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Pickup
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-500">Subtotal</span>
                            <span className="font-serif text-2xl">${cartTotal.toFixed(2)}</span>
                        </div>

                        {deliveryMethod === 'pickup' && (
                            <p className="font-sans text-[10px] text-black text-center mb-8 border border-gray-200 bg-white p-3">
                                Pickup available at our <strong>Ottawa</strong> kitchen.<br />Address provided in email.
                            </p>
                        )}

                        {deliveryMethod === 'ship' && (
                            <p className="font-sans text-[10px] text-gray-400 text-center mb-8">Shipping & taxes calculated at checkout.</p>
                        )}

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-6 font-sans text-[11px] tracking-[0.4em] uppercase hover:bg-zinc-800 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;

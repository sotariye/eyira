
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();

    useEffect(() => {
        if (sessionId) {
            clearCart();
            window.scrollTo(0, 0);
        }
    }, [sessionId, clearCart]);

    return (
        <div className="bg-white min-h-screen flex items-center justify-center animate-in fade-in duration-700">
            <div className="text-center px-6 max-w-lg mx-auto">
                <span className="font-sans text-[11px] tracking-[0.4em] text-gray-400 block mb-12 uppercase font-medium">Order Confirmed</span>
                <div className="w-24 h-24 bg-gray-50 rounded-full mx-auto mb-12 flex items-center justify-center">
                    <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl text-black font-medium leading-tight mb-8">
                    It's on <br />
                    <span className="italic font-normal text-gray-300">the way.</span>
                </h1>
                <p className="font-sans text-eyira-grey font-light leading-relaxed text-lg mb-16">
                    Thank you for your order. We've sent a confirmation email with your tracking details. Time to get the rice ready.
                </p>
                <a
                    href="#/"
                    className="font-sans text-[12px] tracking-[0.4em] uppercase bg-black text-white px-12 py-5 hover:bg-zinc-800 transition-all duration-500 font-medium inline-block"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
};

export default SuccessPage;

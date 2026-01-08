
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            clearCart();
            window.scrollTo(0, 0);

            // Fetch secure session details
            fetch(`/api/get-session?id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    setSession(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching session:', err);
                    setLoading(false);
                });
        } else {
            // Case where no session ID is present (e.g. direct access)
            setLoading(false);
        }
    }, [sessionId, clearCart]);

    const isPickup = session?.delivery_type === 'pickup';
    const rawName = session?.customer_name || 'there';
    const customerName = rawName === 'Jollof Lover' ? rawName : rawName.split(' ')[0];

    // 1. Loading State
    if (loading) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-4"></div>
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400">Loading Order...</p>
            </div>
        );
    }

    // 2. Render Final State
    const hasError = !session && !loading;
    // Explicitly check for shipping to avoid falling through to it on unknown/error states
    const isShipping = session?.delivery_type === 'shipping';

    const showGeneric = hasError || (!isPickup && !isShipping);

    return (
        <div className="bg-white min-h-screen flex flex-col items-center pt-32 pb-20 animate-in fade-in duration-700">
            <div className="text-center px-6 max-w-lg mx-auto">
                <span className="font-sans text-[10px] tracking-[0.3em] text-gray-400 block mb-6 uppercase font-medium">Order Confirmed</span>
                <div className="w-16 h-16 bg-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl text-black font-medium leading-tight mb-6">
                    {showGeneric ? 'Order Confirmed.' : (isPickup ? `See you soon, ${customerName === 'Jollof Lover' ? 'Jollof Lover' : customerName}.` : (
                        <>
                            It's on <br />
                            <span className="italic font-normal text-gray-400">the way.</span>
                        </>
                    ))}
                </h1>

                <div className="font-sans text-eyira-grey font-light leading-relaxed text-base md:text-lg mb-12">
                    {showGeneric ? (
                        <p className="text-gray-600">
                            Thank you for your order. We've sent a detailed confirmation email to your inbox.
                        </p>
                    ) : (isPickup ? (
                        <>
                            <p className="mb-8 text-gray-600">Your order is being prepped in <strong>Ottawa (Boyd Ave area)</strong>.</p>
                            <div className="bg-[#fdfcf0] p-6 rounded-lg border border-[#f1ebd4] max-w-sm mx-auto text-left shadow-sm">
                                <p className="text-sm text-gray-800 leading-relaxed">
                                    <strong className="block mb-1 text-[#8B0000]">What Happens Next?</strong>
                                    Wait for our "Ready for Collection" email. It will contain the exact address and unit number.
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-600">
                            Thank you for your order. We've sent a confirmation email with your tracking details. Time to get the rice ready.
                        </p>
                    ))}
                </div>

                <a
                    href="/"
                    className="group relative font-sans text-[11px] tracking-[0.3em] uppercase bg-transparent text-black border border-black px-10 py-4 hover:bg-black hover:text-white transition-all duration-300 font-medium inline-block"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );

};

export default SuccessPage;

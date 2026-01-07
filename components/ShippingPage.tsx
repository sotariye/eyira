
import React, { useEffect } from 'react';

const ShippingPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="font-serif text-5xl md:text-6xl text-black mb-12 tracking-tight">Shipping Policy.</h1>

            <div className="space-y-12 font-sans text-xs md:text-sm tracking-wide text-gray-500 leading-relaxed max-w-2xl">

                <section>
                    <h2 className="font-serif text-2xl text-black mb-4 normal-case">Dispatch Timing</h2>
                    <p>
                        We are a small-batch operation. Orders are typically processed and dispatched within 2-3 business days of receipt. During high volume periods or seasonal releases, please allow up to 5 business days for dispatch.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl text-black mb-4 normal-case">Domestic Shipping (Canada)</h2>
                    <p>
                        We ship across Canada via Canada Post or UPS.
                        <br /><br />
                        <strong>Standard Shipping ($15 flat rate):</strong> Estimated delivery is 3-7 business days depending on province.
                        <br />
                        <strong>Free Shipping:</strong> Orders over $75 CAD ship free.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl text-black mb-4 normal-case">Local Pickup</h2>
                    <p>
                        We offer free local pickup from our Ottawa Kitchen. If you select "Pickup" at checkout, you will receive an email notification when your order is ready with specific pickup instructions and address details. Pickup hours are typically Monday-Friday, 10am-4pm.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl text-black mb-4 normal-case">International Shipping</h2>
                    <p>
                        Currently, we ship to Canada and the Contiguous United States. International shipping rates are calculated at checkout based on weight and destination. Please check back as we expand our shipping capabilities.
                    </p>
                </section>

                <section>
                    <h2 className="font-serif text-2xl text-black mb-4 normal-case">Damages & Issues</h2>
                    <p>
                        Please inspect your order upon reception. If the item is defective, damaged, or if you received the wrong item, please contact us at <a href="mailto:hello@eyira.shop" className="text-black border-b border-black">hello@eyira.shop</a> immediately so that we can evaluate the issue and make it right.
                    </p>
                </section>

            </div>

            <div className="mt-20 pt-10 border-t border-gray-100">
                <a href="#/" className="font-sans text-[10px] tracking-[0.2em] uppercase text-black hover:opacity-50 transition-opacity">← Return Home</a>
            </div>
        </div>
    );
};

export default ShippingPage;

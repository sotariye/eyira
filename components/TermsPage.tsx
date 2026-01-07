
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen animate-in fade-in duration-700">
            {/* Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-6 pt-36">
                <Link
                    to="/"
                    className="font-sans text-[10px] tracking-[0.3em] uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-2"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </div>

            <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                <div className="mb-24">
                    <span className="font-sans text-[11px] tracking-[0.5em] text-gray-400 block mb-8 uppercase font-medium">Legal</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-black font-medium leading-tight mb-8">
                        Terms of <br />
                        <span className="italic font-normal text-gray-300">Service.</span>
                    </h1>
                    <p className="font-sans text-sm text-gray-400 uppercase tracking-widest">Last Updated: January 2026</p>
                </div>

                <div className="space-y-16 font-sans text-gray-600 font-light leading-relaxed text-lg">
                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">1. Acceptance of Terms</h3>
                        <p>
                            By accessing or using the Eyira website ("Site"), you agree to comply with and be bound by these Terms of Service. These terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">2. Boutique Integrity</h3>
                        <p>
                            We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">3. Products & Availability</h3>
                        <p>
                            Our products are made in small batches to ensure quality. Occasionally, a product may be available for purchase when it is actually out of stock. In such cases, we will notify you immediately and issue a full refund. We reserve the right to limit the quantities of any products or services that we offer.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">4. Quality & Returns</h3>
                        <p>
                            Due to the perishable nature of our artisanal bases, we do not accept returns. However, if your order arrives damaged or if you are unsatisfied with the quality, please contact our concierge at <a href="mailto:hello@eyira.shop" className="text-black border-b border-black pb-0.5 hover:opacity-50">hello@eyira.shop</a> within 14 days of receipt, and we will make it right.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">5. Shipping</h3>
                        <p>
                            We ship across Canada and the Continental US. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. We are not responsible for packages delivered to incorrect addresses provided by the customer.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsPage;

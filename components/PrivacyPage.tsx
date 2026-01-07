
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
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
                    <span className="font-sans text-[11px] tracking-[0.5em] text-gray-400 block mb-8 uppercase font-medium">Data</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-black font-medium leading-tight mb-8">
                        Privacy <br />
                        <span className="italic font-normal text-gray-300">Policy.</span>
                    </h1>
                    <p className="font-sans text-sm text-gray-400 uppercase tracking-widest">Last Updated: January 2026</p>
                </div>

                <div className="space-y-16 font-sans text-gray-600 font-light leading-relaxed text-lg">
                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">1. Information Collection</h3>
                        <p>
                            When you make a purchase from our boutique, we collect the personal information you give us such as your name, address, and email address. This is strictly for the purpose of fulfilling your order and providing you with a seamless hosting experience.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">2. Consent</h3>
                        <p>
                            By providing us with personal information to complete a transaction, verify your credit card, place an order, or arrange for a delivery, we imply that you consent to our collecting it and using it for that specific reason only.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">3. Disclosure</h3>
                        <p>
                            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you (such as payment processors and shipping partners), so long as those parties agree to keep this information confidential.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">4. Data Security</h3>
                        <p>
                            To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed. Payment information is processed securely using PCI-DSS compliant providers.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-black mb-6">5. Questions</h3>
                        <p>
                            If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at <a href="mailto:hello@eyira.shop" className="text-black border-b border-black pb-0.5 hover:opacity-50">hello@eyira.shop</a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPage;

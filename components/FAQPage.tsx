
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FAQ_DATA = [
    {
        category: "The Product",
        questions: [
            {
                q: "What exactly is a 'Jollof Base'?",
                a: "Our base is a double-concentrated reduction of tomatoes and aromatics, infused with all the flavour you need to make authentic Nigerian Jollof. It is designed to replace the 4-hour frying process usually required for authentic Jollof. You simply mix it with washed rice and allow to bake at 350 degrees for 60 minutes."
            },
            {
                q: "Is the base spicy?",
                a: "The Eyira base is not spicy by design. We have crafted a mild, aromatic foundation that captures the soul of Jollof without the heat. This allows you to adjust the spice level to your exact preference—or your guests'—by adding fresh Scotch Bonnets or chili flakes during the mixing stage."
            },
            {
                q: "Is Eyira vegan-friendly?",
                a: "Yes. We use a high-quality plant-based butter to achieve the signature shine and silkiness of traditional party Jollof."
            }
        ]
    },
    {
        category: "Preparation",
        questions: [
            {
                q: "What type of rice should I use?",
                a: "While the base works with any long-grain rice, we recommend parboiled long-grain rice (Golden Sella) for the most authentic texture and individual grain separation."
            },
            {
                q: "Can I cook it on the stovetop instead of the oven?",
                a: "You can, though we perfected the formula specifically for the oven. The oven method provides consistent, 'bottom-pot' heat without the risk of burning the rice."
            },
            {
                q: "How many people does one jar serve?",
                a: "The Standard (500ml) serves 8-10 people. The Sample Jar (250ml) is perfect for 3-4, and The Hungry Man (1L) comfortably feeds a gathering of 20."
            }
        ]
    },
    {
        category: "Shipping & Storage",
        questions: [
            {
                q: "How long does the base last?",
                a: "Unopened jars last for 12 months. Once opened, keep refrigerated and consume within 14 days."
            },
            {
                q: "Where do you ship?",
                a: "Currently, we ship across Canada and the Continental US. All orders are processed within 24 hours of purchase."
            }
        ]
    }
];

interface FAQPageProps {
    onBack: () => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
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
                <div className="text-center mb-32">
                    <span className="font-sans text-[11px] tracking-[0.5em] text-gray-400 block mb-8 uppercase font-medium">Assistance</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-black font-medium leading-tight">
                        Frequently <br />
                        <span className="italic font-normal text-gray-300">Asked.</span>
                    </h1>
                </div>

                <div className="space-y-24">
                    {FAQ_DATA.map((group, idx) => (
                        <div key={idx} className="border-t border-gray-100 pt-12">
                            <h2 className="font-sans text-[11px] tracking-[0.4em] uppercase text-gray-400 mb-12 font-semibold">
                                {group.category}
                            </h2>
                            <div className="divide-y divide-gray-50">
                                {group.questions.map((item, qIdx) => (
                                    <details key={qIdx} className="group py-10">
                                        <summary className="flex justify-between items-center cursor-pointer list-none">
                                            <h3 className="font-serif text-xl md:text-2xl text-eyira-grey font-medium tracking-tight pr-8">
                                                {item.q}
                                            </h3>
                                            <span className="text-gray-300 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                                        </summary>
                                        <div className="mt-8 font-sans text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-2xl border-l border-gray-100 pl-8">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-40 p-12 bg-[#FAFAFA] border border-gray-100 text-center">
                    <h4 className="font-serif text-2xl mb-4">Still have questions?</h4>
                    <p className="font-sans text-sm text-gray-500 mb-8">Our culinary concierge is available to help with specific hosting needs.</p>
                    <a
                        href="mailto:support@eyira.shop"
                        className="font-sans text-[11px] tracking-[0.3em] uppercase text-black border-b border-black pb-1 hover:opacity-50 transition-opacity"
                    >
                        Email Support
                    </a>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;

import React, { useEffect } from 'react';

const AboutPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen animate-in fade-in duration-700">
            {/* Header / Hero */}
            <div className="pt-36 md:pt-48 pb-12 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <span className="font-sans text-[11px] tracking-[0.4em] text-gray-400 block mb-8 uppercase font-medium">Eyira. The Foundation.</span>
                <h1 className="font-serif text-5xl md:text-7xl text-black font-medium leading-tight max-w-5xl mx-auto">
                    We did the hard part. <br />
                    <span className="italic text-gray-300">You get the credit.</span>
                </h1>
            </div>

            {/* Section 1: The Philosophy (Text Left, Image Right) */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
                    <div>
                        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-400 font-semibold mb-8 block">01 / The Why</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-black mb-8 leading-tight">"There’s rice at home."</h2>
                        <div className="font-sans text-eyira-grey font-light leading-relaxed space-y-6 text-lg">
                            <p>
                                It’s the phrase we all heard growing up. But we know the truth: rice is easy. It’s the sauce that takes hours.
                            </p>
                            <p>
                                Authentic Jollof requires patience. It demands a perfect balance of heat, aromatics, and a tomato base that has been reduced down until it’s rich, dark, and intense. We realized that while everyone craves that "Party Jollof" taste, nobody has the time to watch a pot simmer on a Tuesday night.
                            </p>
                            <p className="font-medium text-black">So we bottled the foundation.</p>
                        </div>
                    </div>
                    <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative">
                        <img
                            src="/images/about_texture_spoon.png"
                            alt="Rich tomato stew reduction on a spoon"
                            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                </div>
            </section>

            {/* Section 2: The Process (Image Left, Text Right) */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
                    <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative order-2 md:order-1">
                        <img
                            src="/images/about_jollof_bowl_gloss.png"
                            alt="Glossy finished Jollof rice"
                            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-400 font-semibold mb-8 block">02 / The How</span>
                        <h2 className="font-serif text-3xl md:text-5xl text-black mb-8 leading-tight">Mastery in the Reduction.</h2>
                        <div className="font-sans text-eyira-grey font-light leading-relaxed space-y-6 text-lg">
                            <p>
                                Eyira isn't just mixed ingredients; it is a labor of love. We skip the fillers and focus on the essentials: ripe crushed tomatoes, concentrated paste, and a heavy hand of fresh ginger and garlic.
                            </p>
                            <p>
                                We fry our base slowly—starting high to lock in the flavor, then simmering low to extract the sweetness, and finishing with a high-heat sear to capture that signature smoky aroma.
                            </p>
                            <p>
                                Finally, we finish every batch with plant-based butter. It creates a velvety, glossy sheen that clings to every grain of rice, giving you that rich mouthfeel without the dairy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Ingredients (Centered) */}
            <section className="py-24 px-6 md:px-12 bg-[#FAFAFA] my-12">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-400 font-semibold mb-8 block">03 / The Ingredients</span>
                    <h2 className="font-serif text-3xl md:text-5xl text-black mb-12 leading-tight">Simple. Savory. Plant-Based.</h2>
                    <p className="font-sans text-eyira-grey font-light leading-relaxed text-lg mb-16 max-w-2xl mx-auto">
                        No hidden preservatives. No fillers. Just a robust blend of tomatoes, onions, garlic, ginger, and spices, enriched with plant butter for a smooth finish.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-serif text-xl md:text-2xl text-black">
                        <div className="space-y-4">
                            <h4 className="italic text-gray-400 text-lg font-sans uppercase tracking-widest mb-4 not-italic">The Base</h4>
                            <p>Crushed Tomatoes & Paste</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="italic text-gray-400 text-lg font-sans uppercase tracking-widest mb-4 not-italic">The Aromatics</h4>
                            <p>Purple Onions, Fresh Ginger, Garlic</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="italic text-gray-400 text-lg font-sans uppercase tracking-widest mb-4 not-italic">The Finish</h4>
                            <p>Plant-Based Butter & Canola Oil</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto mt-16 aspect-[2/1] bg-gray-200 overflow-hidden">
                    <img
                        src="/images/about_aromatics_board.png"
                        alt="Fresh aromatics on board"
                        className="w-full h-full object-cover opacity-90"
                    />
                </div>
            </section>

            {/* Section 4: Use Case / CTA */}
            <section className="py-32 px-6 md:px-12 max-w-3xl mx-auto text-center">
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-400 font-semibold mb-8 block">04 / The Ritual</span>
                <h2 className="font-serif text-3xl md:text-5xl text-black mb-8 leading-tight">From Jar to Oven.</h2>
                <p className="font-sans text-eyira-grey font-light leading-relaxed text-lg mb-12">
                    We designed Eyira to be "Oven Ready." Mix the sauce with rice and water, slide it into the oven, and walk away. Forty-five minutes later, you have perfectly cooked, smoky Jollof that tastes like you spent all day in the kitchen.
                </p>
                <div className="flex flex-col items-center gap-8">
                    <p className="font-serif text-2xl italic">This is modern tradition.</p>
                    <a
                        href="/product/standard"
                        className="font-sans text-[12px] tracking-[0.4em] uppercase bg-black text-white px-16 py-6 hover:bg-zinc-800 transition-all duration-500 font-medium inline-block"
                    >
                        Shop the Base
                    </a>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

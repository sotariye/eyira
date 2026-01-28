import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center scroll-mt-24">
      <div className="w-full bg-gray-50 mb-16 overflow-hidden relative border border-gray-100">
        <img
          src="/images/hero_16x9_v2.jpg"
          alt="Artisanal Kitchen"
          className="w-full h-auto block grayscale-[20%] hover:scale-105 transition-transform duration-[3000ms]"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      <div className="max-w-4xl text-center">

        <h1 className="font-serif text-5xl md:text-8xl text-black mb-10 leading-[1.1] font-medium">
          The Jollof Base. <br />
          <span className="italic font-normal text-gray-300">And Beyond.</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-eyira-grey mb-12 font-light leading-relaxed max-w-xl mx-auto">
          Our well-seasoned base turns your pantry staple into authentic Nigerian Jollof—without the stress.
        </p>
        <div className="flex flex-col items-center gap-8">
          <a
            href="/product/standard"
            className="font-sans text-[12px] tracking-[0.4em] uppercase bg-black text-white px-16 py-6 hover:bg-zinc-800 transition-all duration-500 font-medium inline-block"
          >
            Shop Now
          </a>
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400 font-sans text-[10px] tracking-[0.2em] uppercase">
            <span>Classic Jollof</span>
            <span className="text-gray-300 hidden md:inline">•</span>
            <span>Beef Stew</span>
            <span className="text-gray-300 hidden md:inline">•</span>
            <span>Jollof Spaghetti</span>
            <span className="text-gray-300 hidden md:inline">•</span>
            <span>Fish Sauce</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
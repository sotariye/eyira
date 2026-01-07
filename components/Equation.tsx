
import React from 'react';

const Equation: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto border-y border-eyira-border py-24 flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Narrative Side */}
        <div className="text-center md:text-left md:w-5/12">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gray-400 block mb-4 font-medium uppercase">The Aspiration</span>
          <h3 className="font-serif text-3xl md:text-4xl text-black font-medium leading-tight">
            Cook Jollof Rice <br className="hidden md:block" />
            <span className="italic font-normal text-gray-400 text-2xl md:text-3xl">Like A Pro.</span>
          </h3>
        </div>

        {/* Formula Side */}
        <div className="md:w-6/12 flex flex-col items-center md:items-end">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex flex-col items-center">
              <span className="font-sans text-[10px] tracking-[0.2em] text-gray-400 mb-2 uppercase">Sauce</span>
              <div className="h-[1px] w-6 bg-gray-200"></div>
            </div>
            <span className="text-gray-200 font-light text-xl">+</span>
            <div className="flex flex-col items-center">
              <span className="font-sans text-[10px] tracking-[0.2em] text-gray-400 mb-2 uppercase">Rice</span>
              <div className="h-[1px] w-6 bg-gray-200"></div>
            </div>
            <span className="text-gray-200 font-light text-xl">+</span>
            <div className="flex flex-col items-center">
              <span className="font-sans text-[10px] tracking-[0.2em] text-gray-400 mb-2 uppercase">Heat</span>
              <div className="h-[1px] w-6 bg-gray-200"></div>
            </div>
            <span className="text-black font-light text-3xl mx-2">=</span>
            <span className="font-serif text-3xl md:text-4xl font-medium tracking-tight">The Vibe.</span>
          </div>
          <p className="mt-8 font-sans text-[11px] tracking-widest text-gray-400 uppercase text-center md:text-right font-light">
            Zero Prep. Zero Mess. 100% Authentic Flavor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Equation;

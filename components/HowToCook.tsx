import React from 'react';

const HowToCook: React.FC = () => {
  const steps = [
    {
      num: "I",
      label: "Step 01: Pour",
      title: "Mix",
      desc: "Mix the sauce with three cups of rice and two cups of water. Stir until the color is deep and uniform.",
      img: "/images/step-mix.jpg"
    },
    {
      num: "II",
      label: "Step 02",
      title: "Bake",
      desc: "Seal tightly with foil and leave to bake at 350°F for 60 minutes. The steam is where the magic lives.",
      img: "/images/step-bake.jpg"
    },
    {
      num: "III",
      label: "Step 03",
      title: "Serve",
      desc: "Rest for five minutes, then fluff with a fork. Serve with dodo and the confidence of a pro.",
      img: "/images/step-serve.jpg"
    }
  ];

  return (
    <section id="method" className="py-40 px-6 md:px-12 bg-white border-y border-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <span className="font-sans text-[12px] tracking-[0.5em] text-gray-500 block mb-10 uppercase font-medium">The Oven Jollof Method</span>
          <h2 className="font-serif text-6xl md:text-8xl text-eyira-grey font-medium leading-[1.1] mb-12 tracking-tight">
            How It <span className="italic font-normal text-gray-300">Works.</span>
          </h2>
          <div className="inline-flex items-center gap-4 md:gap-8 px-8 md:px-12 py-6 border border-gray-100 bg-[#FCFCFC] rounded-full">
            <span className="font-serif text-xl md:text-2xl italic text-gray-400">Oven Jollof</span>
            <span className="text-gray-200 text-lg md:text-2xl">=</span>
            <span className="font-sans text-[11px] tracking-widest uppercase text-eyira-grey font-medium">Sauce</span>
            <span className="text-gray-200 text-lg md:text-2xl">+</span>
            <span className="font-sans text-[11px] tracking-widest uppercase text-eyira-grey font-medium">Rice</span>
            <span className="text-gray-200 text-lg md:text-2xl">+</span>
            <span className="font-sans text-[11px] tracking-widest uppercase text-eyira-grey font-medium">Water</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-start text-center">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-full aspect-square bg-gray-50 border border-gray-100 mb-12 overflow-hidden relative">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                <div className="absolute top-8 right-8 font-serif text-5xl text-white/50 italic mix-blend-overlay select-none">{step.num}</div>
              </div>
              <div className="px-2">
                <span className="font-sans text-[11px] tracking-[0.3em] text-gray-400 block mb-4 uppercase font-medium">{step.label}</span>
                <h4 className="font-serif text-2xl mb-4 text-eyira-grey font-medium tracking-tight uppercase tracking-[0.1em]">{step.title}</h4>
                <p className="font-sans text-eyira-grey text-base font-light leading-relaxed max-w-[280px] mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToCook;
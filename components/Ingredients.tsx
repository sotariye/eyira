import React from 'react';

const Ingredients: React.FC = () => {
  const items = [
    {
      name: "The Reduction.",
      desc: "Double-concentrated tomato reduction for that deep, rich red colour."
    },
    {
      name: "The Spices.",
      desc: "Our signature spice blend for that perfectly seasoned taste."
    },
    {
      name: "The Finish.",
      desc: "Plant-based butter integrated for that signature party-jollof shine."
    }
  ];

  return (
    <section id="blueprint" className="py-40 px-6 md:px-12 bg-white border-t border-gray-50 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <div className="lg:col-span-5">
            <span className="font-sans text-[12px] tracking-[0.4em] text-gray-500 block mb-10 uppercase font-medium">The Blueprint</span>
            <h3 className="font-serif text-5xl md:text-6xl text-black font-medium leading-[1.2]">
              Precision <br />
              <span className="italic font-normal text-gray-300">Engineered Flavour.</span>
            </h3>
            <div className="h-px w-24 bg-gray-100 mt-16"></div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-32">
              {items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-6 group">
                  <h4 className="font-serif text-3xl text-black font-medium tracking-tight group-hover:text-gray-400 transition-colors duration-500">
                    {item.name}
                  </h4>
                  <p className="font-sans text-lg text-eyira-grey font-light leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;
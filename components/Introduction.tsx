import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 px-6 md:px-12 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <span className="font-sans text-[12px] tracking-[0.4em] text-gray-500 block mb-12 uppercase font-medium">Our Promise</span>
        <h2 className="font-serif text-4xl md:text-6xl text-eyira-grey leading-[1.3] font-medium mb-16">
          Cook Jollof Rice <br />
          <span className="italic font-normal text-gray-300">Like A Pro.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left border-t border-gray-100 pt-16">
          <p className="font-sans text-eyira-grey font-light leading-relaxed text-base">
            Authentic Jollof requires hours of patient frying and precise steaming. For the busy professional or the modern host, those are hours you don’t have. 
          </p>
          <p className="font-sans text-eyira-grey font-light leading-relaxed text-base">
            We spent four years perfecting the jollof base so you can get professional and consistent results with minimal effort.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
import React from 'react';

const Ingredients: React.FC = () => {


  return (
    <section id="blueprint" className="py-32 px-6 md:px-12 bg-white border-t border-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-24 max-w-2xl">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gray-400 block mb-6 uppercase font-medium">The Blueprint</span>
          <h3 className="font-serif text-5xl md:text-7xl text-black font-medium leading-[1.1]">
            Precision <br />
            <span className="italic font-normal text-gray-300">Engineered Flavor.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

          {/* LEFT COLUMN: THE CORE (The Hard Part) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h4 className="font-sans text-[11px] tracking-[0.2em] uppercase text-black border-b border-black pb-4 mb-8">01 / The Core</h4>

              <div className="space-y-8 pr-8">
                <div>
                  <h5 className="font-serif text-3xl text-black mb-4">The Hard Part.</h5>
                  <p className="font-sans text-eyira-grey font-light leading-relaxed text-sm mb-4">
                    Authentic flavor is a commitment—hours of patient frying and precise reducing until the base is just right. We’ve handled that labor so you don't have to.
                  </p>
                  <p className="font-sans text-eyira-grey font-light leading-relaxed text-sm">
                    Eyira is a double-concentrated, spice-infused reduction designed to be the consistent foundation for your kitchen, whether you’re following the blueprint or making it up as you go.
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-block px-3 py-2 bg-gray-50 text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium">Status: Ready to Deploy</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VERSATILITY (One Base. Infinite Results.) */}
          <div className="lg:col-span-8">
            <h4 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 border-b border-gray-100 pb-4 mb-10">02 / Versatility</h4>

            <div className="mb-12">
              <h5 className="font-serif text-4xl text-black mb-4">One Base. Infinite Results.</h5>
              <p className="font-sans text-eyira-grey font-light leading-relaxed text-base max-w-2xl">
                While optimized for the perfect Oven Jollof, our base is a versatile shortcut for the modern host. It is the secret ingredient for any dish that requires depth, heat, and soul.
              </p>
            </div>

            <div className="flex flex-col">
              {/* Item 1 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">Jollof (The Standard)</h5>
                </div>
                <div className="md:w-2/3">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Wash your rice, add the base, and leave to bake in the oven.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">West African Pasta</h5>
                </div>
                <div className="md:w-2/3">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Toss with al dente pasta and a splash of pasta water for an instant classic.</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">The Sunday Stew</h5>
                </div>
                <div className="md:w-2/3">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Add the base to seared protein and simmer for professional results in minutes.</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">Concoction Rice</h5>
                </div>
                <div className="md:w-2/3">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Stir the base into white rice with smoked fish and crayfish for a quick, one-pot savory meal.</p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">Nigerian Egg Sauce</h5>
                </div>
                <div className="md:w-2/3">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Sauté the base with onions and fold in whisked eggs for the ultimate breakfast pairing.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-right opacity-60">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">
                Note: Technically for Jollof. Practically for everything else.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ingredients;
import React from 'react';

const Ingredients: React.FC = () => {


  return (

    <section id="blueprint" className="pt-32 pb-20 px-6 md:px-12 bg-white border-t border-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-24 max-w-2xl">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gray-400 block mb-6 uppercase font-medium">The Blueprint</span>
          <h3 className="font-serif text-5xl md:text-7xl text-black font-medium leading-[1.1]">
            One Jar, <br />
            <span className="italic font-normal text-gray-300">Multiple Recipes.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

          {/* LEFT COLUMN: THE CORE (Versatility) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h4 className="font-sans text-[11px] tracking-[0.2em] uppercase text-black border-b border-black pb-4 mb-8">01 / The Core</h4>

              <div className="space-y-8 pr-8">
                <div>
                  <h5 className="font-serif text-3xl text-black mb-4">Versatility.</h5>
                  <p className="font-sans text-eyira-grey font-light leading-relaxed text-sm mb-4">
                    While optimized for the perfect Oven Jollof, our base is the perfect shortcut for any dish that requires a fried tomato-stew base.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RECIPES */}
          <div className="lg:col-span-8">
            <h4 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 border-b border-gray-100 pb-4 mb-10">02 / Recipes</h4>

            <div className="flex flex-col">
              {/* Item 1 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">Jollof (The Standard)</h5>
                </div>
                <div className="md:w-1/2 mb-2 md:mb-0">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Wash rice, add base, and leave to bake.</p>
                </div>
                <div className="md:w-auto text-right">
                  <span className="font-mono text-xs text-gray-400">2 min prep</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">West African Pasta</h5>
                </div>
                <div className="md:w-1/2 mb-2 md:mb-0">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Toss with al dente pasta + a splash of pasta water.</p>
                </div>
                <div className="md:w-auto text-right">
                  <span className="font-mono text-xs text-gray-400">2 min prep</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">The Sunday Stew</h5>
                </div>
                <div className="md:w-1/2 mb-2 md:mb-0">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Add base to seared protein and simmer.</p>
                </div>
                <div className="md:w-auto text-right">
                  <span className="font-mono text-xs text-gray-400">5 min prep</span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">Concoction Rice</h5>
                </div>
                <div className="md:w-1/2 mb-2 md:mb-0">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Stir base into white rice with smoked fish and crayfish.</p>
                </div>
                <div className="md:w-auto text-right">
                  <span className="font-mono text-xs text-gray-400">3 min prep</span>
                </div>
              </div>

              {/* Item 5 */}
              <div className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-gray-100 hover:border-black transition-colors duration-500">
                <div className="md:w-1/3 mb-2 md:mb-0">
                  <h5 className="font-serif text-2xl text-black">Nigerian Egg Sauce</h5>
                </div>
                <div className="md:w-1/2 mb-2 md:mb-0">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">Sauté base with onions and fold in whisked eggs.</p>
                </div>
                <div className="md:w-auto text-right">
                  <span className="font-mono text-xs text-gray-400">5 min prep</span>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </section>
  );
};

export default Ingredients;
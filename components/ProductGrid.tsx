import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface ProductGridProps {
  onProductClick: (id: string) => void;
}

const products = [
  {
    id: 'pilot',
    name: 'The Pilot',
    size: '250ml',
    price: '$15.00',
    desc: 'Curious? Perfect for a solo trial run or date night.',
    img: '/images/product-single.jpg'
  },
  {
    id: 'standard',
    name: 'The Standard',
    size: '500ml',
    price: '$26.00',
    desc: ' Perfect for hosting large gatherings.',
    img: '/images/product-standard.jpg'
  },
  {
    id: 'hungry-man',
    name: 'The Hungry Man',
    size: '1L',
    price: '$48.00',
    desc: 'For serious meal preppers. Best value.',
    img: '/images/product-hungry-man.jpg'
  }
];

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: typeof products[0]) => {
    // Convert price string to number for the cart
    const priceNumber = parseFloat(product.price.replace('$', ''));

    addToCart({
      id: product.id,
      name: product.name,
      price: priceNumber,
      size: product.size,
      image: product.img
    });

    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="shop" className="py-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
      <div className="flex justify-between items-end mb-24 border-b border-gray-100 pb-12">
        <div className="max-w-lg text-left">
          <span className="font-sans text-[12px] tracking-[0.4em] text-gray-500 block mb-6 uppercase font-medium">Available Sizes</span>
          <h3 className="font-serif text-5xl md:text-7xl text-eyira-grey font-medium leading-none">Shop Eyira</h3>
        </div>
        <span className="hidden md:block font-sans text-[11px] tracking-[0.3em] text-gray-400 uppercase">Direct-To-Home Kitchen Staples</span>
      </div>

      <div className="space-y-48">
        {/* Product 1 & 2: Staggered Pair */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
          <div className="md:col-span-5 flex flex-col">
            <div
              className="aspect-[4/5] bg-gray-50 border border-gray-100 overflow-hidden mb-12 cursor-pointer group"
              onClick={() => onProductClick(products[0].id)}
            >
              <img src={products[0].img} alt={products[0].name} className="w-full h-full object-cover opacity-90 grayscale-[10%] group-hover:scale-105 transition-transform duration-[2000ms]" />
            </div>
            <div className="px-2 text-left">
              <span className="font-sans text-[11px] tracking-[0.3em] text-gray-500 mb-4 block uppercase font-medium">{products[0].size}</span>
              <h4 className="font-serif text-3xl text-eyira-grey mb-4 font-medium">{products[0].name}</h4>
              <p className="font-sans text-sm text-eyira-grey font-light mb-8 max-w-xs leading-relaxed">{products[0].desc}</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                <span className="font-serif text-xl">{products[0].price}</span>
                <button
                  onClick={() => handleAddToCart(products[0])}
                  className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 pb-1 font-medium ${addedItems[products[0].id] ? 'text-gray-400 border-b-transparent' : 'text-black border-b border-black hover:opacity-50'
                    }`}
                >
                  {addedItems[products[0].id] ? 'Added' : 'Add To Cart'}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 md:mt-48 flex flex-col">
            <div
              className="aspect-[4/5] bg-gray-50 border border-gray-100 overflow-hidden mb-12 cursor-pointer group"
              onClick={() => onProductClick(products[1].id)}
            >
              <img src={products[1].img} alt={products[1].name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms]" />
            </div>
            <div className="px-2 text-left">
              <span className="font-sans text-[11px] tracking-[0.3em] text-gray-500 mb-4 block uppercase font-medium">{products[1].size}</span>
              <h4 className="font-serif text-4xl text-eyira-grey mb-4 font-medium">{products[1].name}</h4>
              <p className="font-sans text-sm text-eyira-grey font-light mb-8 max-w-sm leading-relaxed">{products[1].desc}</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                <span className="font-serif text-xl">{products[1].price}</span>
                <button
                  onClick={() => handleAddToCart(products[1])}
                  className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 pb-1 font-medium ${addedItems[products[1].id] ? 'text-gray-400 border-b-transparent' : 'text-black border-b border-black hover:opacity-50'
                    }`}
                >
                  {addedItems[products[1].id] ? 'Added' : 'Add To Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product 3: Large Central Anchor */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 pt-24">
          <div
            className="w-full aspect-square md:aspect-[4/3] bg-gray-50 mb-12 border border-gray-100 overflow-hidden grayscale-[10%] hover:grayscale-0 transition-all duration-700 cursor-pointer"
            onClick={() => onProductClick(products[2].id)}
          >
            <img src={products[2].img} alt={products[2].name} className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="w-full md:w-4/12 flex flex-col items-start order-2 md:order-1 text-left">
            <span className="font-sans text-[11px] tracking-[0.4em] text-gray-500 mb-6 uppercase font-medium">{products[2].size}</span>
            <h4 className="font-serif text-5xl text-eyira-grey mb-6 font-medium leading-tight">{products[2].name}</h4>
            <p className="font-sans text-eyira-grey font-light mb-10 leading-relaxed text-lg">{products[2].desc}</p>
            <p className="font-serif text-3xl text-black mb-12">{products[2].price}</p>
            <button
              onClick={() => handleAddToCart(products[2])}
              className={`w-full py-6 font-sans text-[12px] tracking-[0.4em] uppercase transition-all duration-500 font-medium ${addedItems[products[2].id] ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-zinc-800'
                }`}
            >
              {addedItems[products[2].id] ? 'Added to Cart' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
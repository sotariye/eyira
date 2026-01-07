
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductSize {
    id: string;
    name: string;
    size: string;
    price: string;
    desc: string;
    note: string;
}

const SIZES: ProductSize[] = [
    {
        id: 'pilot',
        name: 'The Sample Jar',
        size: '250ml',
        price: '$15.00',
        desc: 'Perfect for a solo trial run or an intimate date night. Yields approximately 3-4 servings of authentic classic jollof.',
        note: 'Ideal for curiosity.'
    },
    {
        id: 'standard',
        name: 'The Standard',
        size: '500ml',
        price: '$26.00',
        desc: 'Our most popular choice. Designed for the modern host. Yields 8-10 servings. The perfect balance of volume and value.',
        note: 'The Host\'s Choice.'
    },
    {
        id: 'hungry-man',
        name: 'The Hungry Man',
        size: '1L',
        price: '$48.00',
        desc: 'For the serious host or the meal-prep enthusiast. Yields 18-20 servings. Maximum flavour, maximum value.',
        note: 'Best Value.'
    }
];

interface ProductPageProps {
    initialSizeId?: string;
    onBack: () => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ initialSizeId = 'standard', onBack }) => {
    const [selectedSize, setSelectedSize] = useState<ProductSize>(
        SIZES.find(s => s.id === initialSizeId) || SIZES[1]
    );
    const [isAdded, setIsAdded] = useState(false);

    // Connect to the Cart Context
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAddToCart = () => {
        // Convert price string directly to number for Cart
        const priceNumber = parseFloat(selectedSize.price.replace('$', ''));

        // Use the images from the main site
        let imageUrl = '/images/product-single.jpg';
        if (selectedSize.id === 'standard') imageUrl = '/images/product-standard.jpg';
        if (selectedSize.id === 'hungry-man') imageUrl = '/images/product-hungry-man.jpg';

        addToCart({
            id: selectedSize.id,
            name: selectedSize.name,
            price: priceNumber,
            size: selectedSize.size,
            image: imageUrl
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen animate-in fade-in duration-700">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36">
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

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

                    {/* Product Gallery */}
                    <div className="space-y-8">
                        <div className="aspect-[4/5] bg-gray-50 border border-gray-100 overflow-hidden">
                            {/* Dynamic image based on selection */}
                            <img
                                src={
                                    selectedSize.id === 'pilot' ? '/images/product-single.jpg' :
                                        selectedSize.id === 'standard' ? '/images/product-standard.jpg' :
                                            '/images/product-hungry-man.jpg'
                                }
                                alt={`Eyira Base - ${selectedSize.name}`}
                                className="w-full h-full object-cover grayscale-[5%] hover:scale-105 transition-transform duration-[3000ms]"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="aspect-square bg-gray-50 border border-gray-100 overflow-hidden">
                                <img src="/images/step-mix-new.jpg" className="w-full h-full object-cover opacity-80" alt="Texture shot" />
                            </div>
                            <div className="aspect-square bg-gray-50 border border-gray-100 overflow-hidden">
                                <img src="/images/step-serve.jpg" className="w-full h-full object-cover opacity-80" alt="Lifestyle shot" />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:sticky lg:top-32">
                        <div className="mb-12 border-b border-gray-100 pb-12">
                            <span className="font-sans text-[11px] tracking-[0.4em] text-gray-400 block mb-6 uppercase font-medium">Small Batch Base</span>
                            <h1 className="font-serif text-5xl md:text-6xl text-black font-medium mb-6 leading-tight">
                                The <br />Jollof Base.
                            </h1>
                            <p className="font-serif text-3xl text-eyira-grey italic">{selectedSize.price}</p>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-16">
                            <span className="font-sans text-[10px] tracking-[0.3em] text-gray-400 block mb-8 uppercase font-semibold">Select Volume</span>
                            <div className="space-y-4">
                                {SIZES.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-full flex justify-between items-center p-6 border transition-all duration-300 group ${selectedSize.id === size.id
                                            ? 'border-black bg-white'
                                            : 'border-gray-100 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-left">
                                            <span className={`block font-serif text-lg transition-colors ${selectedSize.id === size.id ? 'text-black' : 'text-gray-400'}`}>
                                                {size.name}
                                            </span>
                                            <span className="font-sans text-[10px] tracking-widest text-gray-400 uppercase">{size.size}</span>
                                        </div>
                                        <span className="font-sans text-[10px] tracking-widest text-gray-400 uppercase italic opacity-0 group-hover:opacity-100 transition-opacity">
                                            {size.note}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-16">
                            <p className="font-sans text-eyira-grey font-light leading-relaxed mb-12 text-lg">
                                {selectedSize.desc}
                            </p>
                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-8 font-sans text-[12px] tracking-[0.5em] uppercase transition-all duration-700 font-medium ${isAdded ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-zinc-800'
                                    }`}
                            >
                                {isAdded ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                            <div className="mt-8 flex justify-center gap-12 border-t border-gray-50 pt-8">
                                <div className="text-center">
                                    <span className="block font-sans text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-2">Ships</span>
                                    <span className="block font-sans text-[10px] tracking-widest text-black uppercase">Within 24h</span>
                                </div>
                                <div className="text-center">
                                    <span className="block font-sans text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-2">Origin</span>
                                    <span className="block font-sans text-[10px] tracking-widest text-black uppercase">Canada</span>
                                </div>

                            </div>
                        </div>

                        {/* Accordion Style Details */}
                        <div className="border-t border-gray-100">
                            <details className="group py-8 border-b border-gray-100">
                                <summary className="flex justify-between items-center cursor-pointer list-none">
                                    <span className="font-sans text-[11px] tracking-[0.3em] uppercase font-semibold">Ingredients</span>
                                    <span className="text-gray-300 group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="mt-6 font-sans text-sm text-gray-500 font-light leading-relaxed">
                                    Ingredients: Tomatoes, Canola oil, Plant-based butter Onion, Garlic, Ginger and Spices and herbs
                                </div>
                            </details>
                            <details className="group py-8 border-b border-gray-100">
                                <summary className="flex justify-between items-center cursor-pointer list-none">
                                    <span className="font-sans text-[11px] tracking-[0.3em] uppercase font-semibold">The Story</span>
                                    <span className="text-gray-300 group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="mt-6 font-sans text-sm text-gray-500 font-light leading-relaxed">
                                    Eyira was born from a simple frustration: why does authentic Jollof take 4 hours to make? We've spent years creating the perfect spice blend to bring you the "Party Jollof" taste in an oven-baked format.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;

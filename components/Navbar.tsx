import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { toggleCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'py-4 bg-white/90 backdrop-blur-md border-b border-gray-100' : 'py-8 md:py-12 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#/product/standard" className="font-sans text-[11px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-medium hidden md:block">Shop</a>

        <a href="#/" className="font-serif text-3xl md:text-4xl tracking-tight text-center absolute left-1/2 -translate-x-1/2">
          Eyira
        </a>

        <button onClick={toggleCart} className="font-sans text-[11px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity font-medium">
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
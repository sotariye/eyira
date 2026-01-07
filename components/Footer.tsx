import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 px-6 md:px-12 bg-white border-t border-eyira-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="md:w-1/3">
            <a href="#home" className="font-serif text-3xl tracking-tighter text-black font-semibold mb-8 block">
              Eyira
            </a>
            <p className="font-sans text-[11px] tracking-widest text-gray-400 uppercase leading-relaxed">
              There's rice at home.
            </p>
          </div>


          <div className="flex gap-16 md:gap-32 md:text-right">
            <div>
              <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase text-black font-semibold mb-8">Support</h4>
              <ul className="space-y-4 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-500">
                <li><a href="/faq" className="hover:text-black transition-colors">F.A.Q.</a></li>
                <li><a href="/shipping" className="hover:text-black transition-colors">Shipping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-[11px] tracking-[0.3em] uppercase text-black font-semibold mb-8">Connect</h4>
              <ul className="space-y-4 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-500">
                <li><a href="https://www.instagram.com/eyira.shop/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a></li>
                <li><a href="mailto:shopeyira@gmail.com" className="hover:text-black transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-100 gap-8">
          <p className="font-sans text-[10px] tracking-widest text-gray-400 uppercase">
            Eyira Foods &copy; {currentYear} | Small-batch made in Canada.
          </p>
          <div className="flex gap-8 font-sans text-[10px] tracking-widest text-gray-400 uppercase">
            <a href="/terms" className="hover:text-black transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-black transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import ProductGrid from './components/ProductGrid';
import HowToCook from './components/HowToCook';
import Ingredients from './components/Ingredients';
import Footer from './components/Footer';
import RecipeHelper from './components/RecipeHelper';
import ProductPage from './components/ProductPage';
import FAQPage from './components/FAQPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import SuccessPage from './components/SuccessPage';
import ShippingPage from './components/ShippingPage';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

// Wrapper to handle product page params
const ProductPageWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <ProductPage initialSizeId={id} onBack={() => navigate('/')} />;
};

// Wrapper for FAQ page
const FAQPageWrapper = () => {
  const navigate = useNavigate();
  return <FAQPage onBack={() => navigate('/')} />;
};

// Main Home Content
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Hero />
      <Introduction />
      <ProductGrid onProductClick={(id) => navigate(`/product/${id}`)} />
      <HowToCook />
      <div className="h-12 md:h-20" />
      <Ingredients />
      <div className="h-12 md:h-20" />
      <RecipeHelper />
      <div className="h-12 md:h-20" />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col font-sans selection:bg-black selection:text-white bg-white">
          <Navbar />
          <CartDrawer />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductPageWrapper />} />
              <Route path="/faq" element={<FAQPageWrapper />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;

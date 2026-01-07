import React, { useState } from 'react';
import { getFastRecipeSuggestion } from '../services/geminiService';

const RecipeHelper: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const result = await getFastRecipeSuggestion(query);
    setResponse(result);
    setLoading(false);
  };

  return (
    <section id="concierge" className="py-40 px-6 md:px-12 bg-[#FAFAFA] border-y border-gray-100 scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <span className="font-sans text-[11px] tracking-[0.4em] text-gray-400 block mb-10 uppercase font-medium">Hosting Support</span>
        <h3 className="font-serif text-4xl md:text-6xl text-black mb-10 font-medium leading-tight tracking-tight">
          First time making <br />
          <span className="italic font-normal text-gray-400">Jollof rice?</span>
        </h3>
        <p className="font-sans text-eyira-grey font-light text-base md:text-lg mb-16 max-w-xl mx-auto leading-relaxed">
          Whether you're surprising a partner or hosting the in-laws, ask for advice on pairings, portions, or presentation.
        </p>

        <form onSubmit={handleSubmit} className="mb-20 relative max-w-2xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="I'm hosting my partner's family for the first time..."
            className="w-full bg-transparent border-b border-gray-200 py-6 text-xl md:text-2xl font-serif italic text-center focus:outline-none focus:border-black transition-all duration-700 placeholder:text-gray-300"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="mt-12 font-sans text-[11px] tracking-[0.4em] uppercase text-white bg-black px-12 py-5 hover:bg-zinc-800 transition-all duration-500 font-medium"
          >
            {loading ? 'Consulting Host...' : 'Get Advice'}
          </button>
        </form>

        {response && (
          <div className="p-12 md:p-16 bg-white border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000 text-left">
            <span className="font-sans text-[10px] tracking-[0.3em] text-gray-400 block mb-8 uppercase font-medium">Advice from Eyira Host</span>
            <div className="font-serif text-xl md:text-2xl text-eyira-grey leading-relaxed border-l-2 border-gray-100 pl-8 space-y-6">
              {response.split('\n').map((paragraph, idx) => {
                if (!paragraph.trim()) return null;

                // Parse bold formatting **text**
                const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={idx} className="block">
                    {parts.map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <span key={i} className="font-medium text-black not-italic">{part.slice(2, -2)}</span>;
                      }
                      return <span key={i} className="italic text-gray-600">{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeHelper;
export const TrustTicker = () => {
    return (
        <div className='relative overflow-hidden bg-black text-white h-7 flex items-center w-full z-40 fixed top-0'>
            <div className='animate-ticker-slide-slow flex whitespace-nowrap will-change-transform'>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className='flex items-center mx-8'>
                        <span className='font-sans text-[10px] tracking-[0.2em] uppercase font-medium'>
                            Free local delivery in Ottawa-Gatineau area
                        </span>
                        <span className='mx-8 text-[10px]'>•</span>
                    </div>
                ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className='animate-ticker-slide-slow flex whitespace-nowrap will-change-transform absolute top-0 left-full'>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className='flex items-center mx-8'>
                         <span className='font-sans text-[10px] tracking-[0.2em] uppercase font-medium'>
                            Free local delivery in Ottawa-Gatineau area
                        </span>
                        <span className='mx-8 text-[10px]'>•</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

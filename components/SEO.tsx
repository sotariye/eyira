import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // 1. Construct Canonical URL
        const baseUrl = 'https://eyira.shop';
        // Standardize: Remove trailing slash from non-root paths to prevent duplicates
        const path = location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '');
        const canonicalUrl = `${baseUrl}${path}`;

        // 2. Update/Create Canonical Link Tag
        let linkTag = document.querySelector("link[rel='canonical']");
        if (!linkTag) {
            linkTag = document.createElement('link');
            linkTag.setAttribute('rel', 'canonical');
            document.head.appendChild(linkTag);
        }
        linkTag.setAttribute('href', canonicalUrl);

        // 3. Update OG:URL Tag (for social sharing consistency)
        let ogUrlTag = document.querySelector("meta[property='og:url']");
        if (ogUrlTag) {
            ogUrlTag.setAttribute('content', canonicalUrl);
        }

        // Debug log for verification (can be removed in prod)
        // console.log(`SEO Updated: Canonical -> ${canonicalUrl}`);

    }, [location]);

    return null; // Headless component
};

export default SEO;

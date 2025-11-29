import { useEffect } from 'react';

const useDynamicFavicon = () => {
  useEffect(() => {
    const updateFavicon = (e) => {
      const isDark = e.matches;
      const favicon = document.getElementById('favicon');
      if (favicon) {
        favicon.href = isDark ? '/icons/logo_font_white.png' : '/icons/logo_font_black.png';
      }
    };

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initial check
    updateFavicon(darkModeMediaQuery);

    // Listener
    darkModeMediaQuery.addEventListener('change', updateFavicon);

    return () => {
      darkModeMediaQuery.removeEventListener('change', updateFavicon);
    };
  }, []);
};

export default useDynamicFavicon;

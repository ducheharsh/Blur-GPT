import { useState, useEffect } from 'react';
import type { ThemeMode } from '../types';

export function useTheme(themePreference: ThemeMode) {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const applyTheme = () => {
            let shouldUseDark = false;

            if (themePreference === 'dark') {
                shouldUseDark = true;
            } else if (themePreference === 'light') {
                shouldUseDark = false;
            } else { // system
                shouldUseDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }

            // Apply theme to the popup's document
            document.documentElement.classList.toggle('dark', shouldUseDark);

            // Also apply to body for better coverage
            document.body.classList.toggle('dark', shouldUseDark);

            // Update state to force re-render
            setCurrentTheme(shouldUseDark ? 'dark' : 'light');
        };

        applyTheme();

        // Listen for system theme changes when using system theme
        if (themePreference === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleSystemThemeChange = () => applyTheme();
            mediaQuery.addListener(handleSystemThemeChange);

            return () => {
                mediaQuery.removeListener(handleSystemThemeChange);
            };
        }
    }, [themePreference]);

    return currentTheme;
}

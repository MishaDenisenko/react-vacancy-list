import React, { createContext, useState } from 'react';


type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => null
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState('dark' as 'dark' | 'light');
    
    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    
    return (
        <ThemeContext.Provider value={ { theme, toggleTheme } }>
            <main className={ `${ theme } bg-background text-foreground` }>
                { children }
            </main>
        </ThemeContext.Provider>
    );
};

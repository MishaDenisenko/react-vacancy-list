import { heroui } from '@heroui/react';


/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [heroui(
        {
            themes: {
                dark: {
                    colors: {
                        background: '#141414'
                    }
                },
                light: {
                    colors: {
                        background: '#f3f3f3'
                    }
                }
            }
        }
    )],
};


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { HeroUIProvider, ToastProvider } from '@heroui/react';

import { ThemeProvider } from './context/ThemeProvider';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { AddVacancy } from './pages/AddVacancy';
import { Statistics } from './pages/Statistics';
import './styles/index.css';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '/vacancies/add',
                element: <AddVacancy />
            },
            {
                path: '/statistics',
                element: <Statistics />
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HeroUIProvider>
            <ThemeProvider>
                <ToastProvider />
                <RouterProvider router={ router } />
            </ThemeProvider>
        </HeroUIProvider>
    </StrictMode>
);

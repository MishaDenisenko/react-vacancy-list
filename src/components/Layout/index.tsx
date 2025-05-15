import * as React from 'react';
import { Header } from '../Header';
import { Container } from '../Container';
import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';

export const Layout = () => {
    const { pathname } = useLocation();
    
    useEffect(() => {
        switch (pathname) {
            case '/': document.title = 'VacanSee | Home'; break;
            case '/vacancies/add': document.title = 'VacanSee | Add Vacancy'; break;
            case '/statistics': document.title = 'VacanSee | Statistics'; break;
            default: document.title = 'VacanSee';
        }
    }, [pathname]);
    
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    );
};
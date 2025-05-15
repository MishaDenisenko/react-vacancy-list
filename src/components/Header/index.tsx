import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Switch } from '@heroui/react';

import { MoonIcon, SunIcon } from '../../share/icons';
import { PATHS } from '../../constants/paths.ts';
import { useTheme } from '../../hooks';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    
    const { pathname } = useLocation();
    
    const menuItems = [
        {
            path: PATHS.home,
            content: 'Home'
        },
        {
            path: PATHS.vacancyAdd,
            content: 'Add Vacancy'
        },
        {
            path: PATHS.statistics,
            content: 'Statistics'
        }
    ];
    
    return (
        <Navbar isBordered isMenuOpen={ isMenuOpen } onMenuOpenChange={ setIsMenuOpen } className={ 'mb-5' }>
            <NavbarContent style={ { flexGrow: 0 } } className='sm:hidden' justify='start'>
                <NavbarMenuToggle />
            </NavbarContent>
            
            <NavbarBrand>
                <p className='font-bold text-inherit text-2xl hidden sm:flex'>VacanSee</p>
                <p className='font-bold text-inherit text-2xl sm:hidden'>VSee</p>
            </NavbarBrand>
            <NavbarContent className='hidden sm:flex gap-3'>
                {
                    menuItems.map(({ path, content }, i) => (
                        <NavbarItem key={ path } className={ `flex gap-3 items-center font-bold ${ pathname === path && 'text-secondary-600' }` }>
                            <Link to={ path }>
                                { content }
                            </Link>
                            {
                                i !== menuItems.length - 1 && <Divider orientation='vertical' className='h-5' />
                            }
                        </NavbarItem>
                    ))
                }
            </NavbarContent>
            <NavbarContent justify={ 'end' }>
                <Switch
                    defaultSelected
                    color='secondary'
                    size='sm'
                    endContent={ <SunIcon /> }
                    startContent={ <MoonIcon /> }
                    onChange={ () => toggleTheme() }
                />
            </NavbarContent>
            
            <NavbarMenu className={ theme }>
                { menuItems.map(({ path, content }, index) => (
                    <NavbarMenuItem
                        key={ `${ content }-${ index }` }
                        className={ `text-foreground font-bold ${ pathname === path && 'text-violet-400' }` }
                        onClick={ () => setIsMenuOpen(false) }
                        isActive={ pathname === path }
                    >
                        <Link to={ path }>{ content }</Link>
                    </NavbarMenuItem>
                )) }
            </NavbarMenu>
        </Navbar>
    );
};
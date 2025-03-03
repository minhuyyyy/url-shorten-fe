'use client';
// import { useI18n } from '@/app/contexts/I18nContext';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@heroui/navbar';
import Link from 'next/link';
import React from 'react';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    // const { t } = useI18n();

    const menuItems = [
        'Profile',
        'Dashboard',
        'Activity',
        'Analytics',
        'System',
        'Deployments',
        'My Settings',
        'Team Settings',
        'Help & Feedback',
        'Log Out',
    ];
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className='sm:hidden'
                />
                <NavbarBrand>
                    <h1 className='font-bold text-2xl text-blue-600 text-start' >Shortify</h1>
                </NavbarBrand>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className='w-full'
                            color={
                                index === 2
                                    ? 'primary'
                                    : index === menuItems.length - 1
                                    ? 'danger'
                                    : 'foreground'
                            }
                            href='#'
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;

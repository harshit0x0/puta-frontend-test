'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { AlignJustify } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About PUTA', href: '/about' },
    { name: 'Members', href: '/members' },
    { name: 'Activities', href: '/activities' },
    { name: 'Register', href: '/register' },
    { name: 'Login', href: '/login' },
]

export default function NavMenu() {
    const [collapsed, setCollapsed] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Call it initially to set the initial state
        const handleClick = () => {
            if (!collapsed) setCollapsed(true);
            console.log("clicked");
        }
        window.addEventListener('resize', () => {
            handleResize();
            console.log("resized");
        });
        window.addEventListener('click', () => {
            handleClick();
        });
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('click', handleClick);
        };
    }, []);


    return (
        <nav className="bg-blue-800 sticky top-0 z-10 shadow-md flex justify-center">
            <div className="container flex">
                <ul className={`flex mx-auto justify-center lg:space-x-4 flex-col md:flex-row`}>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`block text-center px-4 py-4 text-white hover:bg-blue-700 transition duration-300 ` + (!isDesktop && collapsed ? 'hidden' : '') + ` `}
                                onClick={() => setCollapsed(true)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    {
                        !isDesktop &&
                        <button onClick={() => setCollapsed(!collapsed)} className={`text-white py-2 mx-auto ` + (collapsed ? '  ' : 'mx-auto ')}> <AlignJustify size={24} /> </button>}
                </ul>
            </div>
        </nav>
    )
}


"use client";

import React, { useEffect, useState, ReactNode } from 'react';
import { Models } from 'appwrite';
import { account } from '@/configs/AppWriteConfig';
import Login from '@/app/(auth)/login/page';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

interface AuthContextProps {
    children: ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
    const [session, setSession] = useState<Models.Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
    const [theme, setTheme] = useState<'light' | 'dark'>('light'); // mặc định là light
    const pathname = usePathname()

    useEffect(() => {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }, []);

    const handleSetTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const savedTheme = localStorage.getItem('theme') || 'light';
    //         setTheme(savedTheme);
    //         console.log("themeContext", theme);

    //     }
    // }, []);


    useEffect(() => {
        const fetchSession = async () => {
            try {
                // const user = await account.get()
                const currentSession = await account.getSession('current');
                setSession(currentSession);
                // console.log("user", user);

            } catch (error) {
                console.warn("Error fetching session:", error);
                setSession(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div data-theme={theme}>
            {session && pathname !== '/login' ? (
                <div className='bg-base-300'>
                    <Navbar onSetTheme={handleSetTheme} currentTheme={theme} />
                    {children}
                    <Footer />
                </div>
            ) : (
                <div>
                    {!session && <Login />}
                </div>
            )}
        </div>
    );
}

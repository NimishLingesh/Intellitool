import React from 'react';
import { NavBarProps, Navbar } from './navbar';
import { Footer } from './footer';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="Intellitool" />
        <meta
          name="description"
          content="Your Powerful All-In-One Learning Companion Powered by ChatGPT"
        />

        {/* Icons */}
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        {/* https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/512/external-fox-origami-vitaliy-gorbachev-blue-vitaly-gorbachev.png */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        <title>Intellitool</title>
      </Head>

      <div className="min-h-screen">
        {/* Toaster */}
        <Toaster />

        {/* Navbar */}
        <Navbar {...navbarProps} />

        {/* Body */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

const navbarProps: NavBarProps = {
  links: [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/summariser', label: 'Summarise' },
    { href: '/explainer', label: 'Explain' },
    { href: '/flash-card-generator', label: 'Flash Card' }
    
  ]
};

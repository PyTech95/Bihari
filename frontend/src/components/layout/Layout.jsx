import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const Layout = ({ children, transparentNav = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant={transparentNav ? 'transparent' : 'solid'} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

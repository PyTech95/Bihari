import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle
} from '@/components/ui/sheet';
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuList, NavigationMenuTrigger, NavigationMenuLink
} from '@/components/ui/navigation-menu';
import { NAV_PRIMARY, SITE } from '@/lib/site';
import { cn } from '@/lib/utils';

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

export const Navbar = ({ variant = 'transparent' }) => {
  const scrolled = useScrolled();
  const isSolid = variant === 'solid' || scrolled;

  return (
    <motion.header
      data-testid="top-nav"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-colors duration-500',
        isSolid
          ? 'bg-[rgba(11,27,43,0.92)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(11,27,43,0.78)] border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
          : 'bg-transparent'
      )}
    >
      <div className="bahari-container flex items-center justify-between h-20 sm:h-24 lg:h-28">
        <Link to="/" className="flex items-center group" data-testid="nav-logo-link" aria-label="Bahari Global Holdings home">
          <motion.img
            src="/assets/logo-shield.jpg"
            alt="Bahari Global Holdings"
            className="h-14 w-14 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-md object-cover ring-1 ring-[rgba(200,162,74,0.55)] shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </Link>

        {/* Desktop */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-2">
            {NAV_PRIMARY.map((item) => (
              <NavigationMenuItem key={item.label} className="flex-shrink-0">
                {item.children ? (
                  <>
                    <NavigationMenuTrigger
                      data-testid={`nav-${item.label.toLowerCase()}-trigger`}
                      className="bg-transparent text-[#F6F3EC] hover:text-[#F6F3EC] focus:text-[#F6F3EC] hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-[#F6F3EC] data-[active]:bg-transparent text-[12px] tracking-[0.14em] uppercase font-medium px-3 py-2 h-auto whitespace-nowrap"
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[420px] p-5 bg-[#10263D] text-[#F6F3EC] border border-white/10">
                        <div className="text-[11px] tracking-[0.18em] uppercase text-[#C8A24A] mb-3">{item.label} Services</div>
                        <ul className="grid grid-cols-1 gap-1">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={c.to}
                                  className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-white/10 transition-colors"
                                  data-testid={`nav-mega-${c.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-link`}
                                >
                                  <span className="text-sm">{c.label}</span>
                                  <ChevronRight className="w-4 h-4 text-[#C8A24A] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    data-testid={`nav-${item.label.toLowerCase()}-link`}
                    className={({ isActive }) => cn(
                      'inline-flex items-center px-3 py-2 text-[12px] tracking-[0.14em] uppercase font-medium transition-colors rounded-md hover:bg-white/10 whitespace-nowrap',
                      isActive ? 'text-[#C8A24A]' : 'text-[#F6F3EC] hover:text-[#F6F3EC]'
                    )}
                  >
                    {item.label}
                  </NavLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link
            to="/contact"
            data-testid="nav-quote-cta-button"
            className="group inline-flex items-center h-11 px-5 rounded-xl bg-[#C8A24A] text-[#0B1B2B] text-[12px] tracking-[0.14em] uppercase font-semibold hover:bg-[#B8923E] transition-colors shadow-[0_6px_18px_rgba(200,162,74,0.25)] whitespace-nowrap"
          >
            <span>Request a Quote</span>
            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              data-testid="nav-mobile-menu-button"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#F6F3EC] hover:bg-white/10 active:bg-white/15 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#0B1B2B] text-[#F6F3EC] border-l border-white/10 w-[88vw] sm:w-[420px] p-0 overflow-y-auto"
          >
            <SheetTitle className="sr-only">Main navigation</SheetTitle>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Link to="/" className="flex items-center gap-2">
                <img src="/assets/logo-shield.jpg" alt="" className="h-12 w-12 rounded-md object-cover ring-1 ring-[rgba(200,162,74,0.45)]" />
                <span className="font-display text-lg">BAHARI</span>
              </Link>
            </div>
            <nav className="px-2 py-4">
              {NAV_PRIMARY.map((item) => (
                <div key={item.label} className="px-3 py-1">
                  <SheetClose asChild>
                    <Link
                      to={item.to}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}-link`}
                      className="block py-3 text-[14px] uppercase tracking-[0.14em] text-[#F6F3EC] hover:text-[#C8A24A] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                  {item.children && (
                    <div className="pl-4 border-l border-white/10 ml-1">
                      {item.children.map((c) => (
                        <SheetClose asChild key={c.label}>
                          <Link
                            to={c.to}
                            className="block py-2 text-sm text-[#F6F3EC]/80 hover:text-[#C8A24A] transition-colors"
                            data-testid={`mobile-nav-sub-${c.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-link`}
                          >
                            {c.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* News & Contact only available in footer per brand decision — also surface on mobile */}
              <div className="px-3 py-1 border-t border-white/10 mt-2">
                <SheetClose asChild>
                  <Link
                    to="/news"
                    className="block py-3 text-[14px] uppercase tracking-[0.14em] text-[#F6F3EC] hover:text-[#C8A24A] transition-colors"
                  >News</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/contact"
                    className="block py-3 text-[14px] uppercase tracking-[0.14em] text-[#F6F3EC] hover:text-[#C8A24A] transition-colors"
                  >Contact</Link>
                </SheetClose>
              </div>
            </nav>
            <div className="px-5 py-5 border-t border-white/10">
              <SheetClose asChild>
                <Link
                  to="/contact"
                  data-testid="mobile-nav-quote-cta"
                  className="inline-flex w-full items-center justify-center h-12 px-5 rounded-xl bg-[#C8A24A] text-[#0B1B2B] text-[12px] tracking-[0.14em] uppercase font-semibold hover:bg-[#B8923E] transition-colors"
                >
                  Request a Quote
                </Link>
              </SheetClose>
              <div className="mt-5 text-xs text-[#F6F3EC]/60 leading-relaxed">
                <div>{SITE.contact.address}</div>
                <div className="mt-1">{SITE.contact.email}</div>
                <div>{SITE.contact.phones.join(' • ')}</div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { ShieldCheck, Menu, X } from 'lucide-react';
import ScrambleText from './ScrambleText';

const Nav: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Get current section from URL path
  const currentSection = location.pathname.replace('/', '') || 'identify';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505] border-b border-edition-border text-sm md:text-base font-mono uppercase tracking-wider text-gray-400 selection:bg-nist-identify selection:text-black">
      <div className="relative max-w-[1600px] mx-auto h-12 px-3 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-6 z-10 relative">
          <Link to="/identify" className="flex items-center gap-2 text-white hover:text-nist-identify transition-colors group">
            <ShieldCheck className="w-4 h-4 text-nist-identify animate-pulse" />
            <span className="font-bold group-hover:underline decoration-nist-identify underline-offset-4">ANAND.SYS</span>
          </Link>
        </div>

        {/* DESKTOP LINKS - Changed to lg:flex to avoid overlap on tablets/small laptops */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full items-center gap-px bg-edition-border/30 px-px">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = currentSection === sectionId;
            return (
              <Link
                key={link.name}
                to={`/${sectionId}`}
                className={`
                  relative h-full flex items-center px-6 transition-all duration-200
                  ${isActive ? `${link.color} text-black font-bold` : 'hover:bg-white/5 hover:text-white'}
                `}
              >
                <ScrambleText text={link.name} duration={600} disableVisualGlitch={true} />
              </Link>
            );
          })}
        </div>

        {/* RIGHT SECTION: CLOCK & HAMBURGER */}
        <div className="flex items-center gap-4 md:gap-6 z-10 relative">
          <div className="hidden sm:block h-4 w-px bg-edition-border"></div>
          <div className="hidden sm:flex items-center gap-2 text-white">
            <span>{time.toLocaleTimeString([], { hour12: true })}</span>
          </div>

          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 text-white hover:text-nist-identify transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN - Visible on screens smaller than lg */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-12 left-0 w-full bg-[#050505] border-b border-edition-border animate-fade-in flex flex-col shadow-2xl">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = currentSection === sectionId;
            return (
              <Link
                key={link.name}
                to={`/${sectionId}`}
                className={`
                  py-4 px-6 border-t border-edition-border/20 text-left transition-all duration-200 flex items-center gap-4
                  ${isActive ? `${link.color} text-black font-bold pl-8` : 'text-gray-400 hover:text-white hover:bg-white/5 hover:pl-8'}
                `}
              >
                <ScrambleText text={link.name} duration={600} disableVisualGlitch={true} />
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Nav;
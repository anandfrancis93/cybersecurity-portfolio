import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { ShieldCheck } from 'lucide-react';

const Nav: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Get current section from URL path
  const currentSection = location.pathname.replace('/', '') || 'identify';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505] border-b border-edition-border text-sm md:text-base font-mono uppercase tracking-wider text-gray-400 selection:bg-nist-identify selection:text-black">
      <div className="relative max-w-[1600px] mx-auto h-12 px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6 z-10 relative">
          <Link to="/identify" className="flex items-center gap-2 text-white hover:text-nist-identify transition-colors group">
            <ShieldCheck className="w-4 h-4 text-nist-identify animate-pulse" />
            <span className="font-bold group-hover:underline decoration-nist-identify underline-offset-4">ANAND.SYS</span>
          </Link>
        </div>

        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full items-center gap-px bg-edition-border/30 px-px">
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
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 md:gap-6 z-10 relative">
          <div className="h-4 w-px bg-edition-border"></div>
          <div className="flex items-center gap-2 text-white">
            <span>{time.toLocaleTimeString([], { hour12: true })}</span>
          </div>

        </div>
      </div>

      <div className="md:hidden flex w-full border-t border-edition-border bg-[#0a0a0a]">
        {NAV_LINKS.map((link) => {
          const sectionId = link.href.substring(1);
          const isActive = currentSection === sectionId;
          const color = link.color.replace('bg-', 'text-');
          return (
            <Link
              key={link.name}
              to={`/${sectionId}`}
              className={`
                flex-1 py-3 text-center transition-all duration-200 text-sm font-bold
                ${isActive ? `${color} border-b-2 ${link.color.replace('bg-', 'border-')} bg-white/5` : 'text-gray-500'}
              `}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
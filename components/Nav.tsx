import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Wifi, Radio, Battery, ShieldCheck } from 'lucide-react';

const Nav: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('identify');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = '';
      
      // If we're at the very top, default to the first section
      if (window.scrollY < 100) {
        current = sections[0];
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Using a relative offset to detect which section is currently "active" in the viewport
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = section;
              break;
            }
          }
        }
      }

      // Special check for the bottom of the page
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
         current = sections[sections.length - 1];
      }
      
      if (current) {
        setActiveSection(current);
      }
    };

    // Initialize state on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505] border-b border-edition-border text-[10px] md:text-xs font-mono uppercase tracking-wider text-gray-400 selection:bg-nist-identify selection:text-black">
      <div className="flex justify-between items-center h-12 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <a href="#" onClick={(e) => scrollTo(e, '#')} className="flex items-center gap-2 text-white hover:text-nist-identify transition-colors group">
            <ShieldCheck className="w-4 h-4 text-nist-identify animate-pulse" />
            <span className="font-bold group-hover:underline decoration-nist-identify underline-offset-4">ANAND.SYS</span>
            <span className="hidden md:inline text-gray-600">// V.2026.1</span>
          </a>
          <div className="hidden md:flex gap-1">
             <span className="text-nist-identify">●</span>
             <span>NET_SECURE</span>
          </div>
        </div>

        <div className="hidden md:flex h-full items-center gap-px bg-edition-border/30 px-px">
          {NAV_LINKS.map((link) => {
             const isActive = activeSection === link.href.substring(1);
             return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className={`
                  relative h-full flex items-center px-6 transition-all duration-200
                  ${isActive ? `${link.color} text-black font-bold` : 'hover:bg-white/5 hover:text-white'}
                `}
              >
                {link.name}
              </a>
             );
          })}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="h-4 w-px bg-edition-border"></div>
          <div className="flex items-center gap-2 text-white">
            <span>{time.toLocaleTimeString([], { hour12: false })}</span>
          </div>
          <div className="flex gap-3 text-nist-recover">
            <Wifi className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="md:hidden flex w-full border-t border-edition-border bg-[#0a0a0a]">
        {NAV_LINKS.map((link) => {
           const isActive = activeSection === link.href.substring(1);
           const color = link.color.replace('bg-', 'text-');
           return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={`
                flex-1 py-3 text-center transition-all duration-200 text-[10px] font-bold
                ${isActive ? `${color} border-b-2 ${link.color.replace('bg-', 'border-')} bg-white/5` : 'text-gray-500'}
              `}
            >
              {link.name}
            </a>
           );
        })}
      </div>
    </nav>
  );
};

export default Nav;
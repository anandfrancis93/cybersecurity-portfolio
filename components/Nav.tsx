import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Shield, FileKey, Eye, Network, Code, Cloud, Terminal, Menu, X } from 'lucide-react';
import ScrambleText from './ScrambleText';
import GlitchHover from './GlitchHover';

const LOGO_TERMS = ['CYBERSECURITY', 'INFORMATION SECURITY', 'OPERATIONS SECURITY', 'NETWORK SECURITY', 'APPLICATION SECURITY', 'CLOUD SECURITY', 'DEVELOPER SECURITY'];
const LOGO_ICONS = [Shield, FileKey, Eye, Network, Code, Cloud, Terminal];

const Nav: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Calculate logo index based on time to keep it synced across page navigations
  const logoIndex = Math.floor(time.getTime() / 10000) % LOGO_TERMS.length;
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
  const currentSection = location.pathname.replace('/', '') || 'about-me';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505] border-b border-edition-border text-sm md:text-base font-mono uppercase tracking-wider text-white selection:bg-asset selection:text-black">
      <div className="relative max-w-[1600px] mx-auto h-12 px-3 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-6 z-10 relative">
          <Link to="/about-me" className={`flex items-center gap-2 text-white transition-colors group ${currentSection === 'about-me' ? 'hover:text-asset' :
            currentSection === 'projects' ? 'hover:text-lab' :
              currentSection === 'work-experience' ? 'hover:text-recon' :
                currentSection === 'certifications' ? 'hover:text-clearance' :
                  currentSection === 'logs' ? 'hover:text-logs' :
                    'hover:text-handshake'
            }`}>
            <span className={`font-bold group-hover:underline underline-offset-4 ${currentSection === 'about-me' ? 'decoration-asset' :
              currentSection === 'projects' ? 'decoration-lab' :
                currentSection === 'work-experience' ? 'decoration-recon' :
                  currentSection === 'certifications' ? 'decoration-clearance' :
                    currentSection === 'logs' ? 'decoration-logs' :
                      'decoration-handshake'
              }`}>
              <GlitchHover>
                <ScrambleText text={LOGO_TERMS[logoIndex]} duration={800} triggerReveal={true} />
              </GlitchHover>
            </span>
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
                  ${isActive
                    ? `${link.color} text-black font-bold`
                    : `hover:text-black ${link.name === 'ASSET' ? 'hover:bg-asset' :
                      link.name === 'LAB' ? 'hover:bg-lab' :
                        link.name === 'RECON' ? 'hover:bg-recon' :
                          link.name === 'CLEARANCE' ? 'hover:bg-clearance' :
                            link.name === 'LOGS' ? 'hover:bg-logs' :
                              'hover:bg-handshake'}`
                  }
                `}
              >
                <ScrambleText text={link.name} duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
              </Link>
            );
          })}
        </div>

        {/* RIGHT SECTION: CLOCK & HAMBURGER */}
        <div className="flex items-center gap-4 md:gap-6 z-10 relative">
          <div className="hidden sm:block h-4 w-px bg-edition-border"></div>
          <div className="hidden sm:flex items-center gap-2 text-white">
            <ScrambleText
              text={time.toLocaleTimeString([], { hour12: true })}
              duration={600}
              autoRepeatInterval={10000}
              scrambleOnTextChange={false}
              disableVisualGlitch={true}
            />
          </div>

          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 text-white hover:text-asset transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN - Visible on screens smaller than lg */}
      {
        isMenuOpen && (
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
                  ${isActive
                      ? `${link.color} text-black font-bold pl-8`
                      : `text-white hover:text-black hover:pl-8 ${link.name === 'ASSET' ? 'hover:bg-asset' :
                        link.name === 'LAB' ? 'hover:bg-lab' :
                          link.name === 'RECON' ? 'hover:bg-recon' :
                            link.name === 'CLEARANCE' ? 'hover:bg-clearance' :
                              link.name === 'LOGS' ? 'hover:bg-logs' :
                                'hover:bg-handshake'}`
                    }
                `}
                >
                  <ScrambleText text={link.name} duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
                </Link>
              );
            })}
          </div>
        )
      }
    </nav >
  );
};

export default Nav;
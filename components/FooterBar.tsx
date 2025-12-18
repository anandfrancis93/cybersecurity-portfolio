import React from 'react';
import { Github, Linkedin, ArrowUp } from 'lucide-react';

const FooterBar: React.FC = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const socialLinks = [
        { Icon: Github, href: 'https://github.com/anandfrancis93/' },
        { Icon: Linkedin, href: 'https://www.linkedin.com/in/anandfrancis93/' }
    ];

    return (
        <footer className="bg-black py-6 sm:py-8 px-3 sm:px-6 border-t border-edition-border/50">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                    <div className="flex gap-6 sm:gap-8 order-2 sm:order-1">
                        {socialLinks.map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors p-2 -m-2"
                            >
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
                        <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-widest font-mono text-center sm:text-right">
                            © 2026 EDITION <span className="hidden sm:inline">//</span> <br className="sm:hidden" />RESPOND_PROTOCOL_ACTIVE
                        </span>
                        <button onClick={scrollToTop} className="p-3 sm:p-4 border border-edition-border hover:bg-white hover:text-black transition-all">
                            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterBar;

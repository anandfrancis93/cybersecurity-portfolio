import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import TypewriterIntro from '../components/TypewriterIntro';
import ScrambleText from '../components/ScrambleText';
import GlitchHover from '../components/GlitchHover';
import SteganographyRain from '../components/SteganographyRain';
import TypewriterAnimation from '../components/TypewriterAnimation';
import { NIST_MODULES } from '../constants';
import { useIntro } from '../contexts/IntroContext';
import { Terminal, FileText, AlertCircle } from 'lucide-react';

const LogsPage: React.FC = () => {
    const [isLocalIntroComplete, setIsLocalIntroComplete] = useState(false);
    const { setIsIntroComplete } = useIntro();

    const module = NIST_MODULES.find(m => m.id === 'logs')!;

    const logs = [
        {
            id: 'log_001',
            title: 'Deconstructing Zero Trust Architecture',
            date: '2025-10-15',
            summary: 'An in-depth analysis of "Never Trust, Always Verify." This entry explores the shift from perimeter-based security to identity-centric models, focusing on micro-segmentation and continuous authentication protocols.',
            tags: ['#ZeroTrust', '#IdentityAlert', '#Architecture'],
            readTime: '04 MIN READ'
        }
    ];

    const handleIntroComplete = () => {
        setIsLocalIntroComplete(true);
        setIsIntroComplete(true);
    };

    useEffect(() => {
        setIsIntroComplete(false);
    }, []);

    if (!isLocalIntroComplete) {
        return <TypewriterIntro moduleName="logs" accentColor="text-logs" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-logs selection:text-black flex flex-col">
            <SteganographyRain color="#3B82F6" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1 w-full">
                <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative w-full">


                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative z-10 w-full">
                        <div className="flex-1">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-12 uppercase">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-mono leading-tight border-l-2 sm:border-l-4 border-edition-border pl-4 sm:pl-6 md:pl-8 text-white">
                                {module.description}
                            </p>
                            <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-sm sm:text-base uppercase text-gray-600 mt-4 pl-4 sm:pl-6 md:pl-8">
                                <span className="text-logs flex items-center gap-2 border border-logs/30 bg-logs/5 px-3 py-1">
                                    <Terminal size={12} />
                                    [{logs.length}] RECORDS
                                </span>
                            </div>
                        </div>

                        {/* Right side - Typewriter Animation */}
                        <div className="hidden md:flex flex-shrink-0 w-64 lg:w-80 h-72 lg:h-80 items-center justify-center">
                            <TypewriterAnimation />
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {logs.map((log) => (
                            <article
                                key={log.id}
                                className="group relative bg-[#0a0a0a] border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 p-6 sm:p-8 overflow-hidden"
                                style={{
                                    boxShadow: `
                                        0 25px 60px -15px rgba(0, 0, 0, 0.9),
                                        0 0 0 1px rgba(59, 130, 246, 0.05),
                                        inset 0 1px 0 0 rgba(255, 255, 255, 0.06)
                                    `
                                }}
                            >
                                {/* Glass reflection overlay */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, transparent 100%)'
                                    }}
                                />
                                <div className="absolute top-0 right-0 p-4 opacity-50 text-xs font-mono text-gray-500 z-10">
                                    ID: {log.id}
                                </div>

                                <div className="flex flex-col gap-4 relative z-10">
                                    <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-logs/80 uppercase tracking-widest">
                                        <span>{log.date}</span>
                                        <span className="w-px h-3 bg-edition-border"></span>
                                        <span>{log.readTime}</span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold font-display group-hover:text-logs transition-colors">
                                        {log.title}
                                    </h3>

                                    <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-3xl">
                                        {log.summary}
                                    </p>

                                    <div className="flex gap-3 pt-2">
                                        {log.tags.map(tag => (
                                            <span key={tag} className="text-xs font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 mt-2 border-t border-white/5 flex items-center gap-2 text-logs text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                                        <span>ACCESS_FILE</span>
                                        <span className="text-lg">›</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            <FooterBar />
        </div>
    );
};

export default LogsPage;

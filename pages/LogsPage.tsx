import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import SensorIntro from '../components/SensorIntro';
import ScrambleText from '../components/ScrambleText';
import SteganographyRain from '../components/SteganographyRain';
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
        return <SensorIntro moduleName="logs" accentColor="text-logs" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-logs selection:text-black flex flex-col">
            <SteganographyRain color="#3B82F6" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1 w-full">
                <section className="py-12 sm:py-16 md:py-20 relative">
                    <div className="absolute top-0 right-0 text-[4rem] sm:text-[6rem] md:text-[10rem] font-bold text-white/[0.02] font-display pointer-events-none select-none -translate-y-4 md:-translate-y-8 overflow-hidden whitespace-nowrap">
                        {module.title}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative z-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2 sm:mb-3 md:mb-4 uppercase text-logs">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-gray-400 max-w-2xl font-mono text-sm sm:text-base border-l-2 border-edition-border pl-3 sm:pl-4">
                                {module.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-sm sm:text-base uppercase text-gray-600">
                            <span className="text-logs flex items-center gap-2 border border-logs/30 bg-logs/5 px-3 py-1">
                                <Terminal size={12} />
                                [{logs.length}] RECORDS
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {logs.map((log) => (
                            <article key={log.id} className="group relative border border-edition-border bg-black/50 hover:bg-logs/5 transition-colors duration-300 p-6 sm:p-8">
                                <div className="absolute top-0 right-0 p-4 opacity-50 text-xs font-mono text-gray-500">
                                    ID: {log.id}
                                </div>

                                <div className="flex flex-col gap-4">
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
                                            <span key={tag} className="text-xs font-mono text-gray-500 bg-edition-border/20 px-2 py-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 mt-2 border-t border-edition-border/30 flex items-center gap-2 text-logs text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
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

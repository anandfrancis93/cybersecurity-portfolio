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

    // Placeholder logs data - in a real app this would come from a CMS or markdown files
    const logs: any[] = [];

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
            <SteganographyRain color="#F43F5E" revealRadius={180} />
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

                    {logs.length === 0 && (
                        <div className="border border-dashed border-edition-border p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center space-y-4 rounded-sm bg-white/[0.01]">
                            <div className="w-16 h-16 bg-logs/10 rounded-full flex items-center justify-center text-logs mb-2">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-xl font-bold font-display text-white">System Logs Empty</h3>
                            <p className="text-gray-500 font-mono max-w-md">
                                No entries have been committed to the archive yet. Check back later for system updates and technical analysis.
                            </p>
                            <div className="pt-4">
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-600 uppercase tracking-widest px-3 py-1 border border-edition-border">
                                    <span className="w-2 h-2 bg-logs rounded-full animate-pulse"></span>
                                    Awaiting Input
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <FooterBar />
        </div>
    );
};

export default LogsPage;

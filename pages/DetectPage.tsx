import React, { useState } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import TerminalIntro from '../components/TerminalIntro';
import ExperienceCard from '../components/ExperienceCard';
import ScrambleText from '../components/ScrambleText';
import { EXPERIENCES, NIST_MODULES } from '../constants';

const DetectPage: React.FC = () => {
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    const module = NIST_MODULES.find(m => m.id === 'detect')!;
    const moduleExperience = EXPERIENCES.filter(e => e.module === 'detect');

    if (!isIntroComplete) {
        return <TerminalIntro moduleName="detect" accentColor="text-nist-detect" onComplete={() => setIsIntroComplete(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-nist-detect selection:text-black flex flex-col">
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1">
                <section className="py-12 sm:py-16 md:py-20 relative">
                    <div className="absolute top-0 right-0 text-[4rem] sm:text-[6rem] md:text-[10rem] font-bold text-white/[0.02] font-display pointer-events-none select-none -translate-y-4 md:-translate-y-8 overflow-hidden whitespace-nowrap">
                        {module.title}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10 gap-8">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 uppercase text-nist-detect">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isIntroComplete} />
                            </h2>
                            <p className="text-gray-400 font-mono text-sm sm:text-base border-l-2 border-edition-border pl-4 whitespace-pre-line leading-relaxed">
                                {module.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 font-mono text-sm uppercase text-gray-600 self-start md:self-end">
                            <span className="text-nist-detect border border-nist-detect/30 bg-nist-detect/5 px-3 py-1">[{moduleExperience.length}] System Entries</span>
                        </div>
                    </div>

                    {moduleExperience.length > 0 && (
                        <div className="space-y-8">
                            {moduleExperience.map((exp, index) => (
                                <ExperienceCard key={index} experience={exp} accentColor={module.colorClass} />
                            ))}
                        </div>
                    )}

                    {moduleExperience.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-edition-border">
                            <p className="text-gray-500 font-mono">No experience entries in this module yet.</p>
                        </div>
                    )}
                </section>
            </main>
            <FooterBar />
        </div>
    );
};

export default DetectPage;

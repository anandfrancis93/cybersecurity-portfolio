import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import SensorIntro from '../components/SensorIntro';
import ExperienceCard from '../components/ExperienceCard';
import ScrambleText from '../components/ScrambleText';
import SteganographyRain from '../components/SteganographyRain';
import { EXPERIENCES, NIST_MODULES } from '../constants';
import { useIntro } from '../contexts/IntroContext';

const ReconPage: React.FC = () => {
    const [isLocalIntroComplete, setIsLocalIntroComplete] = useState(false);
    const { setIsIntroComplete } = useIntro();

    const module = NIST_MODULES.find(m => m.id === 'work-experience')!;
    const moduleExperience = EXPERIENCES.filter(e => e.module === 'work-experience');

    const handleIntroComplete = () => {
        setIsLocalIntroComplete(true);
        setIsIntroComplete(true);
    };

    useEffect(() => {
        setIsIntroComplete(false);
    }, []);

    if (!isLocalIntroComplete) {
        return <SensorIntro moduleName="recon" accentColor="text-recon" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-recon selection:text-black flex flex-col">
            <SteganographyRain color="#F59E0B" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1">
                <section className="py-12 sm:py-16 md:py-20 relative">
                    <div className="absolute top-0 right-0 text-[4rem] sm:text-[6rem] md:text-[10rem] font-bold text-white/[0.02] font-display pointer-events-none select-none -translate-y-4 md:-translate-y-8 overflow-hidden whitespace-nowrap">
                        {module.title}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10 gap-8">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6 uppercase text-recon">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-gray-400 font-mono text-sm sm:text-base border-l-2 border-edition-border pl-4 whitespace-pre-line leading-relaxed">
                                {module.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 font-mono text-sm uppercase text-gray-600 self-start md:self-end">
                            <span className="text-recon border border-recon/30 bg-recon/5 px-3 py-1">[{moduleExperience.length}] System Entries</span>
                        </div>
                    </div>

                    {moduleExperience.length > 0 && (
                        <div className="space-y-6 md:space-y-10">
                            {moduleExperience.map((exp, index) => (
                                <ExperienceCard key={exp.id} experience={exp} index={index} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <FooterBar />
        </div>
    );
};

export default ReconPage;

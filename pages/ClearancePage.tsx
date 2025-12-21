import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import SensorIntro from '../components/SensorIntro';
import CertificateCard from '../components/CertificateCard';
import ScrambleText from '../components/ScrambleText';
import SteganographyRain from '../components/SteganographyRain';
import { CERTIFICATES, NIST_MODULES } from '../constants';
import { useIntro } from '../contexts/IntroContext';

const ClearancePage: React.FC = () => {
    const [isLocalIntroComplete, setIsLocalIntroComplete] = useState(false);
    const { setIsIntroComplete } = useIntro();

    const module = NIST_MODULES.find(m => m.id === 'certifications')!;
    const moduleCertificates = CERTIFICATES.filter(c => c.module === 'certifications');

    const handleIntroComplete = () => {
        setIsLocalIntroComplete(true);
        setIsIntroComplete(true);
    };

    useEffect(() => {
        setIsIntroComplete(false);
    }, []);

    if (!isLocalIntroComplete) {
        return <SensorIntro moduleName="clearance" accentColor="text-clearance" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-clearance selection:text-black flex flex-col">
            <SteganographyRain color="#22C55E" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1">
                <section className="py-12 sm:py-16 md:py-20 relative">
                    <div className="absolute top-0 right-0 text-[4rem] sm:text-[6rem] md:text-[10rem] font-bold text-white/[0.02] font-display pointer-events-none select-none -translate-y-4 md:-translate-y-8 overflow-hidden whitespace-nowrap">
                        {module.title}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative z-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2 sm:mb-3 md:mb-4 uppercase text-clearance">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-gray-400 max-w-2xl font-mono text-sm sm:text-base border-l-2 border-edition-border pl-3 sm:pl-4">
                                {module.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-sm sm:text-base uppercase text-gray-600">
                            <span className="text-clearance">[{moduleCertificates.length}] Credentials</span>
                        </div>
                    </div>

                    {moduleCertificates.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {moduleCertificates.map((cert, index) => (
                                <CertificateCard key={index} certificate={cert} accentColor={module.colorClass} />
                            ))}
                        </div>
                    )}

                    {moduleCertificates.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-edition-border">
                            <p className="text-gray-500 font-mono">No certificates in this module yet.</p>
                        </div>
                    )}
                </section>
            </main>
            <FooterBar />
        </div>
    );
};

export default ClearancePage;

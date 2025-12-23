import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import PrinterIntro from '../components/PrinterIntro';
import CertificateCard from '../components/CertificateCard';
import ScrambleText from '../components/ScrambleText';
import GlitchHover from '../components/GlitchHover';
import SteganographyRain from '../components/SteganographyRain';
import ClearanceVerifier from '../components/ClearanceVerifier';
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
        return <PrinterIntro moduleName="clearance" accentColor="text-clearance" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-clearance selection:text-black flex flex-col">
            <SteganographyRain color="#22C55E" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1">
                <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative w-full">


                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative z-10 w-full">
                        <div className="flex-1">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-12 uppercase">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-mono leading-tight border-l-2 sm:border-l-4 border-edition-border pl-4 sm:pl-6 md:pl-8 text-white">
                                {module.description}
                            </p>

                        </div>

                        {/* Right side - Clearance Verifier Animation */}
                        <div className="hidden md:flex flex-shrink-0 w-64 lg:w-80 h-72 lg:h-80 items-center justify-center">
                            <ClearanceVerifier />
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

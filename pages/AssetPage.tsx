import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import PrinterIntro from '../components/PrinterIntro';
import BarcodeScanAnimation from '../components/BarcodeScanAnimation';
import ScrambleText from '../components/ScrambleText';
import GlitchHover from '../components/GlitchHover';
import SteganographyRain from '../components/SteganographyRain';
import { NIST_MODULES, PROFILE } from '../constants';
import { User, Terminal, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { useIntro } from '../contexts/IntroContext';

const IdentifyPage: React.FC = () => {
    const [isLocalIntroComplete, setIsLocalIntroComplete] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const { setIsIntroComplete } = useIntro();

    const module = NIST_MODULES.find(m => m.id === 'about-me')!;
    const accentColor = module.colorClass;
    const visibleSkills = showAllSkills ? PROFILE.skills : PROFILE.skills.slice(0, 6);

    const handleIntroComplete = () => {
        setIsLocalIntroComplete(true);
        setIsIntroComplete(true);
    };

    // Reset global intro state when navigating to this page
    useEffect(() => {
        setIsIntroComplete(false);
    }, []);

    if (!isLocalIntroComplete) {
        return <PrinterIntro moduleName="asset" accentColor="text-asset" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-asset selection:text-black flex flex-col">
            <SteganographyRain color="#22D3EE" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1">
                <section className="py-12 sm:py-16 md:py-20 relative">
                    <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 sm:mb-16 md:mb-24 relative z-10 gap-8 lg:gap-12">
                        {/* Left side - Name and details */}
                        <div className="max-w-4xl flex-1">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-12">
                                <ScrambleText text="ANAND" duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} /> <br />
                                <ScrambleText text="FRANCIS" className="text-asset" duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h1>

                            <div className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-mono leading-tight border-l-2 sm:border-l-4 ${module.borderClass} pl-4 sm:pl-6 md:pl-8 mb-6 md:mb-8 flex flex-col gap-1.5 sm:gap-2 text-white`}>
                                <div>Cybersecurity Major</div>
                                <div>AI Research Assistant</div>
                                <div>CompTIA Security+ Certified</div>
                            </div>
                        </div>

                        {/* Right side - Barcode Scan Animation */}
                        <div className="hidden md:flex flex-shrink-0 w-[400px] h-[400px] items-center justify-center">
                            <BarcodeScanAnimation />
                        </div>
                    </div>

                    {/* Profile Card - 3D Effect Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 md:gap-10 relative z-10">
                        {/* Left Card - Profile Info */}
                        <div
                            className="bg-black border border-white/5 p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 relative overflow-hidden group"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div className="group/profile flex items-center gap-4 sm:gap-6 transition-colors duration-300 w-fit cursor-default">
                                <div className="bg-black flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/30 text-white group-hover/profile:text-asset group-hover/profile:border-asset/50 shrink-0 transition-colors duration-300">
                                    <User size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover/profile:text-asset truncate transition-colors duration-300"><ScrambleText text="Anand Francis" duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} /></h3>
                                    <p className="text-sm sm:text-base text-gray-500 group-hover/profile:text-asset font-mono transition-colors duration-300">Based in ID, US</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 relative z-10">
                                {[0, 1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="group/stat bg-black p-2.5 sm:p-3 border border-white/10 transition-all hover:border-white/20 cursor-default"
                                    >
                                        <div className="text-sm sm:text-base text-gray-500 group-hover/stat:text-asset uppercase tracking-wider mb-0.5 sm:mb-1 transition-colors duration-300">
                                            {['Experience', 'Certifications', 'Projects', 'Status'][i]}
                                        </div>
                                        <div className="text-sm sm:text-base font-mono text-white group-hover/stat:text-asset truncate transition-colors duration-300">
                                            {['10+ Years', '3', '4', 'Available'][i]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Card - Asset Description */}
                        <div
                            className="bg-black border border-white/5 p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 relative overflow-hidden group"
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div>
                                <h4 className="text-white hover:text-asset font-mono text-base sm:text-lg uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 transition-colors duration-300 w-fit cursor-default">
                                    <Terminal size={12} className="sm:w-3.5 sm:h-3.5" />
                                    <ScrambleText text="Asset Description" duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
                                </h4>
                                <p className="text-white hover:text-asset leading-relaxed text-sm sm:text-base transition-colors duration-300 cursor-default">{PROFILE.bio}</p>
                            </div>
                            <div>
                                <h4 className="text-white hover:text-asset font-mono text-sm sm:text-base uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2 transition-colors duration-300 w-fit cursor-default">
                                    <Cpu size={12} className="sm:w-3.5 sm:h-3.5" />
                                    <ScrambleText text="Capabilities" duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
                                </h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {visibleSkills.map((skill, i) => (
                                        <span key={i} className="px-2 sm:px-3 py-1.5 bg-black text-white text-sm sm:text-base font-mono border border-white/20 animate-fade-in hover:text-asset hover:border-asset/30 hover:bg-asset/5 transition-colors duration-300 cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                    {PROFILE.skills.length > 6 && (
                                        <button
                                            onClick={() => setShowAllSkills(!showAllSkills)}
                                            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 border border-dashed ${module.borderClass}/40 text-gray-500 text-sm sm:text-base font-mono hover:text-white hover:border-white transition-colors min-h-[36px] sm:min-h-[40px]`}
                                        >
                                            {showAllSkills ? (
                                                <>COLLAPSE <ChevronUp size={12} /></>
                                            ) : (
                                                <>+{PROFILE.skills.length - 6} MORE <ChevronDown size={12} /></>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FooterBar />
        </div>
    );
};

export default IdentifyPage;

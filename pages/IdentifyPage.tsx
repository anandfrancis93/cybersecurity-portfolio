import React, { useState } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import SensorIntro from '../components/SensorIntro';
import RadarAnimation from '../components/RadarAnimation';
import ScrambleText from '../components/ScrambleText';
import SteganographyRain from '../components/SteganographyRain';
import { NIST_MODULES, PROFILE } from '../constants';
import { User, Terminal, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

const IdentifyPage: React.FC = () => {
    const [isIntroComplete, setIsIntroComplete] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);

    const module = NIST_MODULES.find(m => m.id === 'identify')!;
    const accentColor = module.colorClass;
    const visibleSkills = showAllSkills ? PROFILE.skills : PROFILE.skills.slice(0, 6);

    if (!isIntroComplete) {
        return <SensorIntro moduleName="identify" accentColor="text-nist-identify" onComplete={() => setIsIntroComplete(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-nist-identify selection:text-black flex flex-col">
            <SteganographyRain color="#4bb2e0" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1">
                <section className="py-12 sm:py-16 md:py-20 relative">
                    <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-nist-identify/5 to-transparent pointer-events-none"></div>

                    <div className="flex flex-col lg:flex-row items-center justify-between mb-12 sm:mb-16 md:mb-24 relative z-10 gap-8 lg:gap-12">
                        {/* Left side - Name and details */}
                        <div className="max-w-4xl flex-1">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-12">
                                <ScrambleText text="ANAND" duration={600} disableVisualGlitch={true} triggerReveal={isIntroComplete} autoRepeatInterval={10000} /> <br />
                                <ScrambleText text="FRANCIS" className="text-nist-identify" duration={600} disableVisualGlitch={true} triggerReveal={isIntroComplete} autoRepeatInterval={10000} />
                            </h1>

                            <div className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-mono leading-tight border-l-2 sm:border-l-4 ${module.borderClass} pl-4 sm:pl-6 md:pl-8 mb-6 md:mb-8 flex flex-col gap-1.5 sm:gap-2 text-white`}>
                                <div>Cybersecurity Major</div>
                                <div>AI Research Assistant</div>
                                <div>CompTIA Security+ Certified</div>
                            </div>
                        </div>

                        {/* Right side - Radar Animation */}
                        <div className="hidden md:flex flex-shrink-0 w-80 lg:w-[400px] h-80 lg:h-[400px] items-center justify-center">
                            <RadarAnimation />
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 sm:gap-6 md:gap-8 relative z-10">
                        <div className="bg-edition-card border border-edition-border p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className={`${module.bgClass}/10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border ${module.borderClass}/30 ${accentColor} shrink-0`}>
                                    <User size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-display font-bold text-lg sm:text-xl text-white truncate"><ScrambleText text="Anand Francis" duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} /></h3>
                                    <p className="text-sm sm:text-base text-gray-500 font-mono">Based in ID, US</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white/5 p-2.5 sm:p-3 border border-white/5">
                                        <div className="text-sm sm:text-base text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">
                                            {['Experience', 'Certifications', 'Projects', 'Status'][i]}
                                        </div>
                                        <div className={`text-sm sm:text-base font-mono ${accentColor} truncate`}>
                                            {['10+ Years', '3', '4', 'Available'][i]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-edition-card border border-edition-border p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                            <div>
                                <h4 className={`${accentColor} font-mono text-base sm:text-lg uppercase tracking-widest mb-2 sm:mb-3 md:mb-4 flex items-center gap-2`}>
                                    <Terminal size={12} className="sm:w-3.5 sm:h-3.5" />
                                    <ScrambleText text="Asset Description" duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
                                </h4>
                                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{PROFILE.bio}</p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 font-mono text-sm sm:text-base uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2">
                                    <Cpu size={12} className="sm:w-3.5 sm:h-3.5" />
                                    <ScrambleText text="Capabilities" duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
                                </h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {visibleSkills.map((skill, i) => (
                                        <span key={i} className={`px-2 sm:px-3 py-1.5 ${module.bgClass}/5 ${accentColor} text-sm sm:text-base font-mono border ${module.borderClass}/20 animate-fade-in`}>
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

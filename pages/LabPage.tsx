import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import PrinterIntro from '../components/PrinterIntro';
import BentoGrid from '../components/BentoGrid';
import ScrambleText from '../components/ScrambleText';
import GlitchHover from '../components/GlitchHover';
import SteganographyRain from '../components/SteganographyRain';
import DigitalImmuneSystem from '../components/DigitalImmuneSystem';
import { PROJECTS, NIST_MODULES } from '../constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useIntro } from '../contexts/IntroContext';

const LabPage: React.FC = () => {
    const [isLocalIntroComplete, setIsLocalIntroComplete] = useState(false);
    const [isBlueTeamExpanded, setIsBlueTeamExpanded] = useState(false);
    const [isRedTeamExpanded, setIsRedTeamExpanded] = useState(false);
    const { setIsIntroComplete } = useIntro();

    const module = NIST_MODULES.find(m => m.id === 'projects')!;
    const moduleProjects = PROJECTS.filter(p => p.module === 'projects');
    const blueTeamProjects = moduleProjects.filter(p => p.team === 'blue');
    const redTeamProjects = moduleProjects.filter(p => p.team === 'red');

    const handleIntroComplete = () => {
        setIsLocalIntroComplete(true);
        setIsIntroComplete(true);
    };

    useEffect(() => {
        setIsIntroComplete(false);
    }, []);

    if (!isLocalIntroComplete) {
        return <PrinterIntro moduleName="lab" accentColor="text-white" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-gray-500 selection:text-black flex flex-col">
            <SteganographyRain color="#A855F7" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1 w-full">
                <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative w-full">


                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative z-10 w-full">
                        <div>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-12 uppercase">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-mono leading-tight border-l-2 sm:border-l-4 border-edition-border pl-4 sm:pl-6 md:pl-8 text-white">
                                {module.description}
                            </p>
                        </div>
                        {/* Right side - Digital Immune System Animation */}
                        <div className="hidden md:flex flex-shrink-0 w-64 lg:w-[300px] h-64 lg:h-[300px] items-center justify-center">
                            <DigitalImmuneSystem />
                        </div>
                    </div>

                    {/* Blue Team Section */}
                    {blueTeamProjects.length > 0 && (
                        <div
                            className="group/section mb-12 md:mb-16 w-full bg-black border border-white/10 p-5 sm:p-6 md:p-8 relative overflow-hidden"
                        >
                            {/* Header row - full width */}
                            <div className="flex items-center justify-between w-full mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-white group-hover/section:bg-blue-500 rounded-full animate-pulse flex-shrink-0 transition-colors duration-300"></div>
                                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover/section:text-blue-400 uppercase tracking-wider transition-colors duration-300">
                                        Blue Team
                                    </h3>
                                    <span className="text-xs font-mono text-gray-500 group-hover/section:text-blue-400 border border-white/30 group-hover/section:border-blue-500/30 px-2 py-0.5 rounded flex-shrink-0 transition-colors duration-300">DEFENSIVE</span>
                                </div>
                                <button
                                    onClick={() => setIsBlueTeamExpanded(!isBlueTeamExpanded)}
                                    className="flex items-center gap-2 text-gray-400 group-hover/section:text-blue-400 transition-colors duration-300 font-mono text-xs sm:text-sm uppercase tracking-wider flex-shrink-0"
                                >
                                    <span>{isBlueTeamExpanded ? 'HIDE' : 'VIEW'} {blueTeamProjects.length} PROJECT{blueTeamProjects.length !== 1 ? 'S' : ''}</span>
                                    {isBlueTeamExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-gray-500 font-mono text-sm mb-6 border-l-2 border-white/30 group-hover/section:border-blue-500/50 pl-4 w-full relative z-10 transition-colors duration-300">
                                Detection, monitoring, and incident response systems designed to protect infrastructure.
                            </p>

                            {isBlueTeamExpanded && (
                                <div className="animate-fade-in w-full relative z-10">
                                    <BentoGrid projects={blueTeamProjects} moduleColor="text-blue-400" singleColumn={true} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Red Team Section */}
                    {redTeamProjects.length > 0 && (
                        <div
                            className="group/section w-full bg-black border border-white/10 p-5 sm:p-6 md:p-8 relative overflow-hidden"
                        >
                            {/* Header row - full width */}
                            <div className="flex items-center justify-between w-full mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-white group-hover/section:bg-red-500 rounded-full animate-pulse flex-shrink-0 transition-colors duration-300"></div>
                                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover/section:text-red-400 uppercase tracking-wider transition-colors duration-300">
                                        Red Team
                                    </h3>
                                    <span className="text-xs font-mono text-gray-500 group-hover/section:text-red-400 border border-white/30 group-hover/section:border-red-500/30 px-2 py-0.5 rounded flex-shrink-0 transition-colors duration-300">OFFENSIVE</span>
                                </div>
                                <button
                                    onClick={() => setIsRedTeamExpanded(!isRedTeamExpanded)}
                                    className="flex items-center gap-2 text-gray-400 group-hover/section:text-red-400 transition-colors duration-300 font-mono text-xs sm:text-sm uppercase tracking-wider flex-shrink-0"
                                >
                                    <span>{isRedTeamExpanded ? 'HIDE' : 'VIEW'} {redTeamProjects.length} PROJECT{redTeamProjects.length !== 1 ? 'S' : ''}</span>
                                    {isRedTeamExpanded ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-gray-500 font-mono text-sm mb-6 border-l-2 border-white/30 group-hover/section:border-red-500/50 pl-4 w-full relative z-10 transition-colors duration-300">
                                Penetration testing, vulnerability assessment, and adversary simulation tools.
                            </p>

                            {isRedTeamExpanded && (
                                <div className="animate-fade-in w-full relative z-10">
                                    <BentoGrid projects={redTeamProjects} moduleColor="text-red-400" singleColumn={true} />
                                </div>
                            )}
                        </div>
                    )}

                    {moduleProjects.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-edition-border w-full">
                            <p className="text-gray-500 font-mono">No projects in this module yet.</p>
                        </div>
                    )}
                </section>
            </main>
            <FooterBar />
        </div >
    );
};

export default LabPage;

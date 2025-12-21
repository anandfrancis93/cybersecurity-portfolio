import React, { useState } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import SensorIntro from '../components/SensorIntro';
import BentoGrid from '../components/BentoGrid';
import ScrambleText from '../components/ScrambleText';
import SteganographyRain from '../components/SteganographyRain';
import { PROJECTS, NIST_MODULES } from '../constants';

const ProtectPage: React.FC = () => {
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    const module = NIST_MODULES.find(m => m.id === 'projects')!;
    const moduleProjects = PROJECTS.filter(p => p.module === 'projects');
    const blueTeamProjects = moduleProjects.filter(p => p.team === 'blue');
    const redTeamProjects = moduleProjects.filter(p => p.team === 'red');

    if (!isIntroComplete) {
        return <SensorIntro moduleName="protect" accentColor="text-nist-protect" onComplete={() => setIsIntroComplete(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-nist-protect selection:text-black flex flex-col">
            <SteganographyRain color="#9292ea" revealRadius={180} />
            <Nav />
            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1">
                <section className="py-12 sm:py-16 md:py-20 relative">
                    <div className="absolute top-0 right-0 text-[4rem] sm:text-[6rem] md:text-[10rem] font-bold text-white/[0.02] font-display pointer-events-none select-none -translate-y-4 md:-translate-y-8 overflow-hidden whitespace-nowrap">
                        {module.title}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative z-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2 sm:mb-3 md:mb-4 uppercase text-nist-protect">
                                <ScrambleText text={module.title} duration={600} disableVisualGlitch={true} triggerReveal={isIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-gray-400 max-w-2xl font-mono text-sm sm:text-base border-l-2 border-edition-border pl-3 sm:pl-4">
                                {module.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-sm sm:text-base uppercase text-gray-600">
                            <span className="text-blue-400">[{blueTeamProjects.length}] Blue Team</span>
                            <span className="text-red-400">[{redTeamProjects.length}] Red Team</span>
                        </div>
                    </div>

                    {/* Blue Team Section */}
                    {blueTeamProjects.length > 0 && (
                        <div className="mb-12 md:mb-16">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                <h3 className="text-xl sm:text-2xl font-display font-bold text-blue-400 uppercase tracking-wider">
                                    Blue Team
                                </h3>
                                <span className="text-xs font-mono text-gray-500 border border-blue-500/30 px-2 py-0.5 rounded">DEFENSIVE</span>
                            </div>
                            <p className="text-gray-500 font-mono text-sm mb-6 border-l-2 border-blue-500/30 pl-4">
                                Detection, monitoring, and incident response systems designed to protect infrastructure.
                            </p>
                            <BentoGrid projects={blueTeamProjects} moduleColor="text-blue-400" />
                        </div>
                    )}

                    {/* Red Team Section */}
                    {redTeamProjects.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <h3 className="text-xl sm:text-2xl font-display font-bold text-red-400 uppercase tracking-wider">
                                    Red Team
                                </h3>
                                <span className="text-xs font-mono text-gray-500 border border-red-500/30 px-2 py-0.5 rounded">OFFENSIVE</span>
                            </div>
                            <p className="text-gray-500 font-mono text-sm mb-6 border-l-2 border-red-500/30 pl-4">
                                Penetration testing, vulnerability assessment, and adversary simulation tools.
                            </p>
                            <BentoGrid projects={redTeamProjects} moduleColor="text-red-400" />
                        </div>
                    )}

                    {moduleProjects.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-edition-border">
                            <p className="text-gray-500 font-mono">No projects in this module yet.</p>
                        </div>
                    )}
                </section>
            </main>
            <FooterBar />
        </div>
    );
};

export default ProtectPage;

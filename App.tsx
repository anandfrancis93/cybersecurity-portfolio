import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import BentoGrid from './components/BentoGrid';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import ExperienceCard from './components/ExperienceCard';
import CertificateCard from './components/CertificateCard';
import { PROJECTS, EXPERIENCES, CERTIFICATES, NIST_MODULES, PROFILE } from './constants';
import { Terminal, User, Fingerprint, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  useEffect(() => {
    // SSH Login Simulation Sequence
    const sequence = [
      { text: "ssh root@127.0.0.1", delay: 50 },
      { text: "root@127.0.0.1's password: *****************", delay: 200 },
      { text: "ACCESS GRANTED.", delay: 400 },
      { text: "Last login: Mon, 15 Dec 2025 06:11 from 192.168.1.50", delay: 600 },
      { text: "", delay: 700 },
      { text: ">_ SYSTEM_INIT", delay: 900 },
      { text: "> INITIALIZING KERNEL...", delay: 1100 },
      { text: "> LOADING ASSET_MODULES: IDENTIFY, PROTECT, DETECT, RECOVER...", delay: 1300 },
      { text: "> SYSTEM READY.", delay: 1500 },
      { text: "> WELCOME, ADMIN._", delay: 1700 }
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ text, delay }) => {
      const timeout = setTimeout(() => {
        setTerminalLines(prev => [...prev, text]);
      }, delay);
      timeouts.push(timeout);
    });

    const completionTimeout = setTimeout(() => {
        setIsIntroComplete(true);
        setTerminalLines([]);
    }, 2000); 
    timeouts.push(completionTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  if (!isIntroComplete) {
      return (
        <div className="fixed inset-0 bg-[#020202] text-white flex items-center justify-center p-4 z-[9999] selection:bg-nist-identify selection:text-black">
            <div className="w-full max-w-xl bg-[#0a0a0a] border border-edition-border shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden animate-fade-in">
               <div className="bg-[#111] px-4 py-2 flex items-center gap-2 border-b border-edition-border">
                  <Terminal size={14} className="text-gray-500" />
                  <span className="text-xs text-gray-400 font-mono tracking-wider">>_ ROOT_ACCESS</span>
               </div>
               <div className="p-6 min-h-[300px] font-mono text-sm leading-relaxed">
                  <div className="text-gray-500 mb-4 select-none">------------------------------------------------</div>
                  {terminalLines.map((line, i) => (
                    <div key={i} className={`${line.startsWith('>') ? 'text-edition-accent' : 'text-gray-300'}`}>
                      {line}
                    </div>
                  ))}
                  <div className="text-edition-accent animate-pulse mt-1 inline-block">_</div>
               </div>
            </div>
        </div>
      );
  }

  // Selection color mapping for each module
  const selectionClasses: Record<string, string> = {
    identify: 'selection:bg-nist-identify',
    protect: 'selection:bg-nist-protect',
    detect: 'selection:bg-nist-detect',
    recover: 'selection:bg-nist-recover',
  };

  const visibleSkills = showAllSkills ? PROFILE.skills : PROFILE.skills.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans pt-12 animate-fade-in">
      <Nav />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        
        {NIST_MODULES.map((module) => {
          const moduleProjects = PROJECTS.filter(p => p.module === module.id);
          const moduleExperience = EXPERIENCES.filter(e => e.module === module.id);
          const moduleCertificates = CERTIFICATES.filter(c => c.module === module.id);
          const isIdentify = module.id === 'identify';
          const accentColor = module.colorClass;
          const selectionClass = `${selectionClasses[module.id] || 'selection:bg-nist-identify'} selection:text-black`;
          
          return (
            <section key={module.id} id={module.id} className={`py-20 border-b border-edition-border/30 last:border-0 relative ${selectionClass}`}>
               
               {isIdentify ? (
                 <>
                   <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>
                   <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-nist-identify/5 to-transparent pointer-events-none"></div>

                   <div className="flex flex-col mb-24 relative z-10">
                      <div className="max-w-4xl">
                          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.85] mb-12">
                            ANAND <br />
                            <span className="text-nist-identify">FRANCIS</span>
                          </h1>
                          
                          <div className={`text-xl md:text-2xl max-w-2xl font-mono leading-tight border-l-4 ${module.borderClass} pl-8 mb-8 flex flex-col gap-2 text-white`}>
                             <div>Cybersecurity Major</div>
                             <div>AI Research Assistant</div>
                             <div>CompTIA Security+ Certified</div>
                          </div>
                      </div>
                   </div>
                 </>
               ) : (
                 <>
                   <div className="absolute top-0 right-0 text-[6rem] md:text-[10rem] font-bold text-white/[0.02] font-display pointer-events-none select-none -translate-y-8 overflow-hidden whitespace-nowrap">
                      {module.title}
                   </div>

                   <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
                      <div>
                         <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">{module.title}</h2>
                         <p className="text-gray-400 max-w-2xl font-mono text-sm border-l-2 border-edition-border pl-4">
                            {module.description}
                         </p>
                      </div>
                      <div className="flex gap-4 font-mono text-[10px] uppercase text-gray-600">
                         <div className={`${module.bgClass}/5 px-3 py-1 border ${module.borderClass}/20 ${accentColor}`}>Status: Active</div>
                         <div className="px-3 py-1 border border-edition-border text-gray-400">Assets: {moduleProjects.length + moduleExperience.length + moduleCertificates.length}</div>
                      </div>
                   </div>
                 </>
               )}

               <div className="space-y-8 relative z-10">
                  {isIdentify && (
                    <div className={`w-full border border-edition-border bg-[#050505] p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 relative overflow-hidden group hover:${module.borderClass}/40 transition-colors`}>
                       <div className="absolute top-0 right-0 p-4 opacity-5">
                          <Fingerprint size={120} />
                       </div>
                       
                       <div className="md:w-1/3 space-y-6 border-r border-edition-border/30 pr-6">
                          <div className="flex items-center gap-4">
                             <div className={`${module.bgClass}/10 flex items-center justify-center w-16 h-16 rounded-full border ${module.borderClass}/30 ${accentColor}`}>
                                <User size={32} />
                             </div>
                             <div>
                                <h3 className="font-display font-bold text-xl text-white">{PROFILE.name}</h3>
                                <p className="text-xs text-gray-500 font-mono">{PROFILE.location}</p>
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
                             {PROFILE.stats.map((stat, i) => (
                                <div key={i} className="bg-white/5 p-3 border border-white/5">
                                   <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
                                   <div className={`text-sm font-mono ${accentColor}`}>{stat.value}</div>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div className="md:w-2/3 flex flex-col justify-between">
                          <div>
                             <h4 className={`${accentColor} font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2`}>
                                <Terminal size={14} />
                                Asset Description
                             </h4>
                             <p className="text-gray-300 leading-relaxed font-sans text-lg max-w-2xl">
                                {PROFILE.bio}
                             </p>
                          </div>
                          
                          <div className="mt-8">
                             <h4 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Cpu size={14} />
                                Capabilities
                             </h4>
                             <div className="flex flex-wrap gap-2 transition-all duration-500">
                                {visibleSkills.map((skill, i) => (
                                   <span key={i} className={`px-3 py-1 ${module.bgClass}/5 ${accentColor} text-xs font-mono border ${module.borderClass}/20 animate-fade-in`}>
                                      {skill}
                                   </span>
                                ))}
                                {PROFILE.skills.length > 6 && (
                                   <button 
                                      onClick={() => setShowAllSkills(!showAllSkills)}
                                      className={`flex items-center gap-2 px-3 py-1 border border-dashed ${module.borderClass}/40 text-gray-500 text-xs font-mono hover:text-white hover:border-white transition-colors`}
                                   >
                                      {showAllSkills ? (
                                        <>COLLAPSE <ChevronUp size={12} /></>
                                      ) : (
                                        <>+{PROFILE.skills.length - 6} MORE CAPABILITIES <ChevronDown size={12} /></>
                                      )}
                                   </button>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>
                  )}

                  {module.id === 'protect' && moduleProjects.length > 0 && (
                     <BentoGrid projects={moduleProjects} moduleColor={module.colorClass} />
                  )}

                  {module.id === 'detect' && moduleExperience.length > 0 && (
                     <div className="border border-edition-border bg-black">
                        {moduleExperience.map(exp => (
                           <ExperienceCard key={exp.id} experience={exp} accentColor={module.colorClass} />
                        ))}
                     </div>
                  )}

                  {module.id === 'recover' && moduleCertificates.length > 0 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        {moduleCertificates.map(cert => (
                           <CertificateCard key={cert.id} certificate={cert} accentColor={module.colorClass} />
                        ))}
                     </div>
                  )}
               </div>
            </section>
          );
        })}

      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;
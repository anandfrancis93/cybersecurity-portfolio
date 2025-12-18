import React, { useState } from 'react';
import { Experience } from '../types';
import { ChevronRight, Terminal, Building, ArrowUpRight } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  accentColor?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, accentColor = 'text-nist-detect' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const accentBorder = accentColor.replace('text-', 'border-');
  const accentBg = accentColor.replace('text-', 'bg-');

  return (
    <div className="w-full font-mono text-sm border-b border-edition-border last:border-b-0 hover:bg-[#0c0c0c] transition-colors group bg-black">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="grid grid-cols-1 md:grid-cols-[180px_1.5fr_1fr_auto] items-start md:items-center py-5 px-4 md:px-6 cursor-pointer gap-2 md:gap-4 relative"
      >
        <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors ${isOpen ? accentBg : 'bg-transparent group-hover:bg-edition-border'}`}></div>

        <div className={`flex items-center gap-3 text-gray-500 group-hover:${accentColor} transition-colors`}>
          <div className={`transition-transform duration-200 ${isOpen ? `rotate-90 ${accentColor}` : ''}`}>
             <ChevronRight size={14} />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold tabular-nums">
             {experience.period}
          </span>
        </div>

        <div className="font-bold text-white text-base md:text-sm md:pr-4 leading-tight">
          {experience.role}
        </div>

        <div className={`flex items-center gap-2 md:opacity-80 md:group-hover:opacity-100 transition-opacity text-gray-400 group-hover:${accentColor}`}>
           <span className="hidden md:inline text-gray-700 font-light">@</span>
           <span className="flex items-center gap-2 font-medium">
             <Building size={12} className="md:hidden opacity-50" />
             {experience.company}
           </span>
        </div>

        <div className="hidden md:flex justify-end">
           <div className={`p-2 rounded-full transition-all ${isOpen ? `${accentBg} text-black rotate-45` : 'text-gray-600 group-hover:text-white'}`}>
              <ArrowUpRight size={16} />
           </div>
        </div>
      </div>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden bg-[#050505]">
          <div className="p-6 md:pl-[204px] md:pr-12 pb-8 border-t border-edition-border/30 relative">
            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-edition-border/30 hidden md:block border-l border-dashed border-gray-800"></div>
            
            <div className="space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                  <Terminal size={12} className={accentColor} />
                  <span>Log Output // Tasks & Achievements</span>
                </div>
                
                <ul className="space-y-3">
                  {experience.description.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed max-w-3xl">
                      <span className={`${accentColor} mt-2 text-[6px]`}>◆</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-6 text-[10px] text-gray-600 font-mono uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 ${accentBg} rounded-full animate-pulse`}></div>
                    Status: Verified
                </span>
                <span>Hash: {experience.id.toUpperCase()}_LOG</span>
                <span>Module: Detect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
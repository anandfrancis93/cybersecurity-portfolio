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
    <div className="w-full font-mono text-base border border-edition-border hover:bg-[#0c0c0c] transition-colors group bg-black">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="grid grid-cols-1 md:grid-cols-[260px_1.5fr_1fr_auto] items-start md:items-center py-5 px-4 md:px-6 cursor-pointer gap-3 md:gap-8 relative"
      >
        <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors ${isOpen ? accentBg : 'bg-transparent group-hover:bg-edition-border'}`}></div>

        <div className={`flex items-center gap-3 transition-colors ${isOpen ? accentColor : `text-gray-500 group-hover:${accentColor}`}`}>
          <div className={`transition-transform duration-200 shrink-0 ${isOpen ? `rotate-90 ${accentColor}` : ''}`}>
            <ChevronRight size={16} />
          </div>
          <span className="text-sm sm:text-base uppercase tracking-wider font-semibold tabular-nums whitespace-nowrap">
            {experience.period}
          </span>
        </div>

        <div className={`font-bold text-lg md:text-xl md:pr-4 leading-tight transition-colors ${accentColor}`}>
          {experience.role}
        </div>

        <div className={`flex items-center gap-2 md:opacity-80 md:group-hover:opacity-100 transition-all text-sm sm:text-base ${isOpen ? accentColor : `text-gray-400 group-hover:${accentColor}`}`}>
          <span className="hidden md:inline text-gray-700 font-light">@</span>
          <span className="flex items-center gap-2 font-medium">
            <Building size={14} className="md:hidden opacity-50" />
            {experience.company}
          </span>
        </div>

        <div className="hidden md:flex justify-end">
          <span className={`text-xs font-mono uppercase tracking-wider border px-3 py-1 transition-all ${isOpen ? `${accentColor} ${accentBorder}` : 'text-gray-500 border-gray-800 group-hover:border-gray-600 group-hover:text-gray-300'}`}>
            {isOpen ? 'Hide Logs' : 'View Logs'}
          </span>
        </div>
      </div>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden bg-[#050505]">
          <div className="p-6 md:pl-[204px] md:pr-12 pb-8 border-t border-edition-border/30 relative">
            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-edition-border/30 hidden md:block border-l border-dashed border-gray-800"></div>

            <div className="space-y-6 animate-fade-in">
              <div>
                <div className="flex items-center gap-2 mb-3 text-sm sm:text-base text-gray-500 uppercase tracking-widest font-semibold">
                  <Terminal size={12} className={accentColor} />
                  <span>Log Output</span>
                </div>

                <ul className="space-y-3">
                  {experience.description.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300 text-base leading-relaxed max-w-3xl">
                      <span className={`${accentColor} mt-2 text-xs`}>◆</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-6 text-sm sm:text-base text-gray-600 font-mono uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 ${accentBg} rounded-full animate-pulse`}></div>
                  Integrity: Verified
                </span>
                <span>Hash: {experience.id.toUpperCase()}_LOG</span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
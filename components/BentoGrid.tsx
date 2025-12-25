import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Lock, Shield, Cpu, Activity } from 'lucide-react';
import ScrambleText from './ScrambleText';

interface BentoGridProps {
  projects: Project[];
  moduleColor?: string;
  singleColumn?: boolean;
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects, moduleColor = 'text-nist-protect', singleColumn = false }) => {
  const accentBorder = moduleColor.replace('text-', 'border-');
  const accentBg = moduleColor.replace('text-', 'bg-');

  const gridClass = singleColumn
    ? "grid grid-cols-1 gap-3 sm:gap-4 md:gap-6"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6";

  return (
    <div className={gridClass}>
      {projects.map((project, index) => {
        // In single column mode, ignore cols/rows for consistent sizing
        const colSpan = singleColumn ? '' : (project.cols ? `lg:col-span-${project.cols}` : 'lg:col-span-4');
        const rowSpan = singleColumn ? '' : (project.rows ? `lg:row-span-${project.rows}` : 'lg:row-span-1');
        const heightClass = singleColumn ? '' : (project.rows && project.rows > 1 ? 'min-h-[300px] sm:min-h-[350px] lg:min-h-[500px]' : 'min-h-[220px] sm:min-h-[250px]');
        const Icon = project.icon;

        return (
          <div
            key={project.id}
            className={`
              group relative ${colSpan} ${rowSpan} ${heightClass} 
              bg-black border border-white/10 overflow-hidden
              hover:${accentBorder} transition-colors duration-300
              active:scale-[0.99] touch-manipulation
              ${singleColumn ? 'py-4 sm:py-5 md:py-6' : ''}
            `}
          >
            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:${accentBorder} opacity-50 group-hover:opacity-100 transition-all duration-300`}></div>
            <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-hover:${accentBorder} opacity-50 group-hover:opacity-100 transition-all duration-300`}></div>
            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 group-hover:${accentBorder} opacity-50 group-hover:opacity-100 transition-all duration-300`}></div>
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:${accentBorder} opacity-50 group-hover:opacity-100 transition-all duration-300`}></div>

            <div className="absolute inset-0 z-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}>
            </div>

            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rotate-12 hidden sm:block">
              <Icon className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 text-white" />
            </div>

            <div className="relative z-10 p-4 sm:p-5 md:p-6 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className={`inline-block px-2 sm:px-3 py-1 text-sm sm:text-base font-mono border border-white/20 bg-black text-gray-400 uppercase group-hover:${moduleColor} group-hover:${accentBorder}/50 transition-colors duration-300`}>
                    {project.category}
                  </div>
                  <div className={`bg-white/10 border border-white/30 p-1 sm:p-1.5 rounded-sm group-hover:${accentBg} group-hover:text-black transition-all duration-300`}>
                    <ArrowUpRight size={12} className="sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-1.5 sm:mb-2 group-hover:${moduleColor} transition-colors duration-300 leading-tight`}>
                  <ScrambleText text={project.title} duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
                </h3>
                <p className={`text-white font-mono text-sm sm:text-base md:text-lg leading-relaxed border-l-2 border-white/30 pl-2.5 sm:pl-3 group-hover:${accentBorder}/50 transition-colors line-clamp-3 sm:line-clamp-none`}>
                  {project.description}
                </p>
              </div>

              <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center text-sm sm:text-base font-mono uppercase text-gray-600 group-hover:${moduleColor} transition-colors duration-300`}>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white group-hover:${accentBg} rounded-full animate-pulse transition-colors duration-300`}></div>
                  <span>System Active</span>
                </div>
                <span className="hidden xs:inline">SEC_LEVEL_5</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BentoGrid;

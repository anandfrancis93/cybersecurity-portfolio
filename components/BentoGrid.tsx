import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Lock, Shield, Cpu, Activity } from 'lucide-react';

interface BentoGridProps {
  projects: Project[];
  moduleColor?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects, moduleColor = 'text-nist-protect' }) => {
  const accentBorder = moduleColor.replace('text-', 'border-');
  const accentBg = moduleColor.replace('text-', 'bg-');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
      {projects.map((project, index) => {
        const colSpan = project.cols ? `lg:col-span-${project.cols}` : 'lg:col-span-4';
        const rowSpan = project.rows ? `lg:row-span-${project.rows}` : 'lg:row-span-1';
        const heightClass = project.rows && project.rows > 1 ? 'min-h-[400px] lg:min-h-[500px]' : 'min-h-[250px]';
        const Icon = project.icon;
        
        return (
          <div
            key={project.id}
            className={`
              group relative ${colSpan} ${rowSpan} ${heightClass} 
              bg-[#0A0A0A] border border-edition-border overflow-hidden
              hover:${accentBorder} transition-colors duration-300
            `}
          >
            <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${accentBorder} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${accentBorder} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${accentBorder} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${accentBorder} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

            <div className="absolute inset-0 z-0 opacity-10" 
                 style={{ 
                   backgroundImage: 'linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)', 
                   backgroundSize: '20px 20px' 
                 }}>
            </div>

            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 rotate-12">
               <Icon className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10 p-6 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest ${moduleColor}`}>
                    <Activity size={12} />
                    <span>MODULE_{project.id.padStart(2, '0')}</span>
                 </div>
                 <div className={`${accentBg}/10 border ${accentBorder}/30 p-1.5 rounded-sm group-hover:${accentBg} group-hover:text-black transition-all`}>
                    <ArrowUpRight size={14} />
                 </div>
              </div>

              <div className="mt-4">
                 <div className="inline-block px-2 py-0.5 mb-3 text-[10px] font-mono border border-gray-800 bg-black text-gray-400 uppercase">
                    {project.category}
                 </div>
                 <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {project.title}
                 </h3>
                 <p className="text-gray-400 font-mono text-xs md:text-sm leading-relaxed border-l-2 border-gray-800 pl-3 group-hover:${accentBorder}/50 transition-colors">
                    {project.description}
                 </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono uppercase text-gray-600">
                 <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 ${accentBg} rounded-full animate-pulse`}></div>
                    <span>System Active</span>
                 </div>
                 <span>SEC_LEVEL_5</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BentoGrid;
import React, { useState } from 'react';
import { Certificate } from '../types';
import { ShieldCheck, Award, Key, Lock, ExternalLink, Fingerprint, ChevronRight, BadgeCheck } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  accentColor?: string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, accentColor = 'text-nist-recover' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const accentBorder = accentColor.replace('text-', 'border-');
  const accentBg = accentColor.replace('text-', 'bg-');

  const statusColor = certificate.status === 'Active' || certificate.status === 'Verified'
    ? accentColor
    : 'text-gray-500';

  return (
    <div
      className={`group relative w-full bg-[#030303] border border-edition-border overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${isExpanded
        ? `min-h-[650px] shadow-[0_0_60px_rgba(0,255,157,0.12)]`
        : `min-h-[500px] md:h-[540px] hover:${accentBorder}/40 shadow-xl`
        }`}
    >
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cert-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className={accentColor} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cert-grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-between px-4 md:px-5 py-3 border-b border-edition-border bg-black/90 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="hidden sm:flex gap-1.5 mr-3">
            <div className="w-2 h-2 bg-red-900/40"></div>
            <div className="w-2 h-2 bg-yellow-900/40"></div>
            <div className="w-2 h-2 bg-green-900/40"></div>
          </div>
          <ShieldCheck size={14} className={accentColor} />
          <span className="text-sm md:text-base font-mono text-gray-400 uppercase tracking-[0.15em] font-medium truncate">
            VIEWER: {certificate.name.toUpperCase()}
          </span>
        </div>
        <Key size={12} className={`${accentColor}/40 group-hover:${accentColor} transition-colors shrink-0`} />
      </div>


      <div className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 md:p-8">
        {!isExpanded ? (
          <div className="flex-1 flex flex-col items-center justify-between animate-fade-in text-center space-y-6">
            <div className="relative pt-4">
              <div className={`absolute inset-0 ${accentBg}/5 blur-[40px]`}></div>
              <div className="relative w-20 h-20 md:w-24 md:h-24 border border-edition-border flex items-center justify-center shadow-inner bg-black/60">
                <div className="absolute inset-[10%] border border-edition-border/40"></div>
                <Award className={`${accentColor} w-9 h-9 md:w-10 md:h-10`} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight leading-tight">
                {certificate.name}
              </h3>
              <p className="text-sm md:text-base text-gray-500 font-mono tracking-[0.4em] uppercase">
                {certificate.issuer}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 md:gap-6 w-full pb-2">
              <div className="flex items-center gap-3 px-5 py-2 bg-black border border-white/5 shadow-md">
                <div className={`w-1.5 h-1.5 ${accentBg} animate-pulse-fast`}></div>
                <span className={`text-sm md:text-base font-mono font-bold uppercase tracking-[0.3em] ${statusColor}`}>
                  {certificate.status}
                </span>
              </div>

              <button
                onClick={() => setIsExpanded(true)}
                className={`group/btn relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-[#080808] border border-edition-border overflow-hidden transition-all duration-500 hover:${accentBorder} hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] active:scale-95`}
              >
                <Key size={12} className={`relative z-10 ${accentColor}`} />
                <span className="relative z-10 font-mono text-sm font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                  Unlock (Private Key)
                </span>
                <div className={`absolute inset-0 ${accentBg}/5 opacity-0 group-hover/btn:opacity-100 transition-opacity`}></div>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 animate-slide-up space-y-6 md:space-y-8 pb-4">
            <div className="text-center pb-6 border-b border-white/5">
              <div className="flex justify-center mb-4">
                <BadgeCheck className={`${accentColor} w-10 h-10`} />
              </div>
              <p className="text-sm md:text-base font-mono text-gray-500 uppercase tracking-[0.4em] px-2">OFFICIAL DIGITAL CREDENTIAL</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-edition-border overflow-hidden border border-edition-border shadow-xl">
              <div className="bg-[#050505] p-4 md:p-5">
                <p className="text-sm text-gray-600 uppercase tracking-widest mb-1.5 font-mono">Date_Issued</p>
                <p className="text-base md:text-lg text-white font-mono">{certificate.date}</p>
              </div>
              <div className="bg-[#050505] p-4 md:p-5 border-t sm:border-t-0 sm:border-l border-edition-border">
                <p className="text-sm text-gray-600 uppercase tracking-widest mb-1.5 font-mono">Date_Expires</p>
                <p className="text-base md:text-lg text-white font-mono">{certificate.expirationDate || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative p-4 md:p-6 bg-black border border-edition-border overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] hidden sm:block">
                  <Fingerprint size={70} />
                </div>
                <h4 className={`text-sm sm:text-base ${accentColor} font-mono uppercase tracking-[0.3em] mb-4 flex items-center gap-2`}>
                  <Lock size={12} /> CREDENTIAL_MANIFEST
                </h4>
                <div className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-gray-600 uppercase font-mono tracking-widest">Verification ID Hash</span>
                    <span className="text-sm md:text-base text-gray-300 font-mono bg-white/[0.02] p-3 border border-white/5 select-all break-all leading-relaxed shadow-inner">
                      {certificate.verificationId}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-600 uppercase font-mono tracking-widest">Validation Status</span>
                      <span className={`text-base md:text-lg font-mono font-bold tracking-[0.2em] ${statusColor}`}>
                        ● {certificate.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {certificate.link && (
                <a
                  href={certificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 md:p-5 ${accentBg}/5 border ${accentBorder}/20 group/link hover:${accentBg}/10 transition-all duration-300 active:scale-[0.98]`}
                >
                  <div className="flex items-center gap-3">
                    <ExternalLink size={16} className={accentColor} shrink-0 />
                    <span className="text-sm md:text-base font-mono text-white uppercase tracking-[0.2em]">Verify Ledger Integrity</span>
                  </div>
                  <ChevronRight size={16} className={`${accentColor} group-hover/link:translate-x-1.5 transition-transform shrink-0`} />
                </a>
              )}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm md:text-base font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-[0.4em]"
              >
                <Lock size={14} />
                <span>Encrypt (Public Key)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 pointer-events-none opacity-[0.15] border-t-2 border-l-2 ${accentBorder}`}></div>
      <div className={`absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 pointer-events-none opacity-[0.15] border-b-2 border-r-2 ${accentBorder}`}></div>
    </div>
  );
};

export default CertificateCard;
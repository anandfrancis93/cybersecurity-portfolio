import React, { useState } from 'react';
import { Github, Linkedin, ArrowUp, ShieldCheck, X, Terminal, Send, Lock } from 'lucide-react';
import ScrambleText from './ScrambleText';
import SteganographyRain from './SteganographyRain';

interface HandshakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HandshakeModal: React.FC<HandshakeModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [query, setQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate encryption/transmission delay
    setTimeout(() => {
      const recipient = 'anand.francis93@gmail.com';
      const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(query)}`;
      window.location.href = mailtoLink;

      setIsSending(false);
      setIsSent(true);

      // Auto close after success message
      setTimeout(() => {
        onClose();
        setSubject('');
        setQuery('');
        setIsSent(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in selection:bg-nist-respond selection:text-black">
      <div className="w-full max-w-lg bg-[#050505] border border-nist-respond/30 shadow-[0_0_50px_rgba(249,115,103,0.15)] rounded-sm overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-nist-respond/10 border-b border-nist-respond/20 p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2 text-nist-respond text-sm sm:text-base font-mono tracking-[0.15em] sm:tracking-[0.2em] font-bold">
            <Terminal size={14} className="sm:w-4 sm:h-4" />
            <span className="truncate">HANDSHAKE_PROTOCOL</span>
            <span className="hidden sm:inline">// V.1.0</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 -mr-1">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {isSent ? (
            <div className="py-8 sm:py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-nist-respond/10 border border-nist-respond rounded-full flex items-center justify-center text-nist-respond animate-pulse">
                <ShieldCheck size={28} className="sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-2 px-2">
                <h3 className="text-white font-display font-bold text-lg sm:text-xl uppercase tracking-wider"><ScrambleText text="Transmission Successful" duration={500} disableVisualGlitch={true} /></h3>
                <p className="text-gray-500 font-mono text-sm sm:text-base">Handshake packet delivered to destination node.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleExecute} className="space-y-4 sm:space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm sm:text-base text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                  <Lock size={12} className="text-nist-respond" />
                  Encryption_Subject
                </label>
                <input
                  required
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry regarding security architecture..."
                  className="w-full bg-black border border-edition-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white font-mono placeholder:text-gray-700 focus:outline-none focus:border-nist-respond/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm sm:text-base text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={12} className="text-nist-respond" />
                  Transmission_Payload
                </label>
                <textarea
                  required
                  rows={4}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter secure message contents..."
                  className="w-full bg-black border border-edition-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white font-mono placeholder:text-gray-700 focus:outline-none focus:border-nist-respond/50 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="group relative w-full flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-nist-respond text-black text-xs sm:text-sm font-bold uppercase tracking-widest overflow-hidden transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Encrypting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Execute Handshake</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>

              <div className="text-sm sm:text-base text-gray-600 font-mono uppercase tracking-widest text-center leading-relaxed">
                Cipher Suite: TLS_AES_256_GCM_SHA384 // ECDHE_RSA Active
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { Icon: Github, href: 'https://github.com/anandfrancis93/' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/anandfrancis93/' }
  ];

  return (
    <>
      <footer id="respond" className="flex-1 flex flex-col bg-black pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-12 px-3 sm:px-6 border-t border-edition-border/50 relative overflow-hidden selection:bg-nist-respond selection:text-black">
        <SteganographyRain color="#f97367" revealRadius={180} />
        <div className="max-w-[1600px] mx-auto relative z-10 flex-1 flex flex-col">

          <div className="absolute top-0 right-0 text-[4rem] sm:text-[6rem] md:text-[10rem] font-bold text-white/[0.02] font-display pointer-events-none select-none -translate-y-4 md:-translate-y-8 overflow-hidden whitespace-nowrap">
            RESPOND
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2 sm:mb-3 md:mb-4 uppercase text-nist-respond">
                <ScrambleText text="Respond" duration={600} disableVisualGlitch={true} triggerReveal={true} />
              </h2>
              <p className="text-gray-400 max-w-2xl font-mono text-sm sm:text-base border-l-2 border-edition-border pl-3 sm:pl-4">
                Incident Response protocol initiated. Available for immediate deployment on select projects and security consultations.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-sm sm:text-base uppercase text-gray-600">
              <div className="bg-nist-respond/5 px-2 sm:px-3 py-1 border border-nist-respond/20 text-nist-respond">Status: Available</div>
              <div className="px-2 sm:px-3 py-1 border border-edition-border">Protocol: Handshake</div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-10 lg:py-12 border border-edition-border/30 bg-[#050505] p-4 sm:p-6 lg:p-8 rounded-sm">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-nist-respond/10 flex items-center justify-center rounded-full border border-nist-respond/30 text-nist-respond shrink-0">
                <ShieldCheck size={28} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1"><ScrambleText text="Establish Connection" duration={500} disableVisualGlitch={true} /></h3>
                <p className="text-xs sm:text-sm text-gray-500 font-mono">Secure communication line available for professional inquiries.</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-nist-respond text-black text-base sm:text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Initiate Handshake</span>
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </div>

        </div>

        {/* Footer bar - outside max-width container for full-width border */}
        <div className="border-t border-edition-border/30 mt-auto pt-6 sm:pt-8 md:pt-10">
          <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
            <div className="flex gap-6 sm:gap-8 order-2 sm:order-1">
              {socialLinks.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? "_blank" : undefined}
                  rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="text-gray-500 hover:text-white transition-colors p-2 -m-2"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
              <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-widest font-mono text-center sm:text-right">
                © 2026 EDITION <span className="hidden sm:inline">//</span> <br className="sm:hidden" />RESPOND_PROTOCOL_ACTIVE
              </span>
              <button onClick={scrollToTop} className="p-3 sm:p-4 border border-edition-border hover:bg-white hover:text-black transition-all">
                <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <HandshakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import TypewriterIntro from '../components/TypewriterIntro';
import SteganographyRain from '../components/SteganographyRain';
import ScrambleText from '../components/ScrambleText';
import { useIntro } from '../contexts/IntroContext';
import { ShieldCheck, Terminal, Send, Lock, X } from 'lucide-react';

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

        setTimeout(() => {
            const recipient = 'anand.francis93@gmail.com';
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(query)}`;
            window.location.href = mailtoLink;

            setIsSending(false);
            setIsSent(true);

            setTimeout(() => {
                onClose();
                setSubject('');
                setQuery('');
                setIsSent(false);
            }, 3000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in selection:bg-handshake selection:text-black">
            <div className="w-full max-w-lg bg-[#050505] border border-handshake/30 shadow-[0_0_50px_rgba(20,184,166,0.15)] rounded-sm overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto">
                <div className="bg-handshake/10 border-b border-handshake/20 p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-handshake text-sm sm:text-base font-mono tracking-[0.15em] sm:tracking-[0.2em] font-bold">
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
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-handshake/10 border border-handshake rounded-full flex items-center justify-center text-handshake animate-pulse">
                                <ShieldCheck size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <div className="space-y-2 px-2">
                                <h3 className="text-white font-display font-bold text-lg sm:text-xl uppercase tracking-wider">
                                    <ScrambleText text="Transmission Successful" duration={600} disableVisualGlitch={true} triggerReveal={true} autoRepeatInterval={10000} />
                                </h3>
                                <p className="text-gray-500 font-mono text-sm sm:text-base">Handshake packet delivered to destination node.</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleExecute} className="space-y-4 sm:space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm sm:text-base text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                                    <Lock size={12} className="text-handshake" />
                                    Encryption_Subject
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Inquiry regarding security architecture..."
                                    className="w-full bg-black border border-edition-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white font-mono placeholder:text-gray-700 focus:outline-none focus:border-handshake/50 transition-colors"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm sm:text-base text-gray-500 font-mono uppercase tracking-widest flex items-center gap-2">
                                    <Terminal size={12} className="text-handshake" />
                                    Transmission_Payload
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter secure message contents..."
                                    className="w-full bg-black border border-edition-border px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-white font-mono placeholder:text-gray-700 focus:outline-none focus:border-handshake/50 transition-colors resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="group relative w-full flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-handshake text-black text-xs sm:text-sm font-bold uppercase tracking-widest overflow-hidden transition-all disabled:opacity-50 active:scale-[0.98]"
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

const HandshakePage: React.FC = () => {
    const [isLocalIntroComplete, setIsLocalIntroComplete] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setIsIntroComplete } = useIntro();

    const handleIntroComplete = () => {
        setIsLocalIntroComplete(true);
        setIsIntroComplete(true);
    };

    useEffect(() => {
        setIsIntroComplete(false);
    }, []);

    if (!isLocalIntroComplete) {
        return <TypewriterIntro moduleName="handshake" accentColor="text-handshake" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-handshake selection:text-black flex flex-col">
            <SteganographyRain color="#E11D48" revealRadius={180} />
            <Nav />

            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1 w-full">
                <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative w-full">


                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6 relative z-10 w-full">
                        <div>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-12 uppercase">
                                <ScrambleText text="Handshake" duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-mono leading-tight border-l-2 sm:border-l-4 border-edition-border pl-4 sm:pl-6 md:pl-8 text-white">
                                Secure communication channel for inquiries and collaboration.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-sm sm:text-base uppercase text-gray-600">
                            <div className="bg-handshake/5 px-2 sm:px-3 py-1 border border-handshake/20 text-handshake">Status: Available</div>
                            <div className="px-2 sm:px-3 py-1 border border-edition-border">Protocol: Handshake</div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-10 lg:py-12 border border-edition-border/30 bg-[#050505] p-4 sm:p-6 lg:p-8 rounded-sm">
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-handshake/10 flex items-center justify-center rounded-full border border-handshake/30 text-handshake shrink-0">
                                <ShieldCheck size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1">
                                    <ScrambleText text="Establish Connection" duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 font-mono">Secure communication line available for professional inquiries.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-handshake text-black text-base sm:text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Initiate Handshake</span>
                            <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </button>
                    </div>
                </section>
            </main>

            <FooterBar />
            <HandshakeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default HandshakePage;

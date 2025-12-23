import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import FooterBar from '../components/FooterBar';
import PrinterIntro from '../components/PrinterIntro';
import SteganographyRain from '../components/SteganographyRain';
import ScrambleText from '../components/ScrambleText';
import GlitchHover from '../components/GlitchHover';
import TLSHandshakeAnimation from '../components/TLSHandshakeAnimation';
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
            <div
                className="w-full max-w-lg bg-[#0a0a0a] border border-rose-500/20 rounded-sm overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto relative"
                style={{
                    boxShadow: `
                        0 25px 60px -15px rgba(0, 0, 0, 0.9),
                        0 0 50px rgba(225, 29, 72, 0.1),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.06)
                    `
                }}
            >
                {/* Glass reflection overlay */}
                <div
                    className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-20"
                    style={{
                        background: 'linear-gradient(180deg, rgba(225, 29, 72, 0.04) 0%, transparent 100%)'
                    }}
                />
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
        return <PrinterIntro moduleName="handshake" accentColor="text-handshake" onComplete={handleIntroComplete} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-handshake selection:text-black flex flex-col">
            <SteganographyRain color="#E11D48" revealRadius={180} />
            <Nav />

            <main className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 md:pb-32 flex-1 w-full">
                <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative w-full">


                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-8 lg:gap-12 relative z-10 w-full">
                        {/* Left side - Title and description */}
                        <div className="flex-1">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 md:mb-12 uppercase">
                                <ScrambleText text="Handshake" duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl font-mono leading-tight border-l-2 sm:border-l-4 border-edition-border pl-4 sm:pl-6 md:pl-8 text-white">
                                Secure communication channel for inquiries and collaboration.
                            </p>
                        </div>

                        {/* Right side - TLS Handshake Animation */}
                        <div className="hidden md:flex flex-shrink-0 w-80 lg:w-[320px] h-72 lg:h-[280px] items-center justify-center">
                            <TLSHandshakeAnimation />
                        </div>
                    </div>

                    <div
                        className="group flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-10 lg:py-12 p-4 sm:p-6 lg:p-8 rounded-sm relative overflow-hidden bg-[#0a0a0a] border border-rose-500/10"
                        style={{
                            boxShadow: `
                                0 25px 60px -15px rgba(0, 0, 0, 0.9),
                                0 0 0 1px rgba(225, 29, 72, 0.05),
                                inset 0 1px 0 0 rgba(255, 255, 255, 0.06)
                            `
                        }}
                    >
                        {/* Glass reflection overlay */}
                        <div
                            className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
                            style={{
                                background: 'linear-gradient(180deg, rgba(225, 29, 72, 0.03) 0%, transparent 100%)'
                            }}
                        />
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-handshake/10 flex items-center justify-center rounded-full border border-handshake/30 text-handshake shrink-0">
                                <ShieldCheck size={28} className="sm:w-8 sm:h-8" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-handshake font-display mb-1 transition-colors duration-300">
                                    <ScrambleText text="Establish Connection" duration={600} disableVisualGlitch={true} triggerReveal={isLocalIntroComplete} autoRepeatInterval={10000} />
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-handshake font-mono transition-colors duration-300">Secure communication line available for professional inquiries.</p>
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

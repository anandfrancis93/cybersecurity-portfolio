import React, { useState, useEffect } from 'react';

// List of attack types to cycle through
const ATTACK_TYPES = [
    "SQL Injection (SQLi)",
    "Cross-Site Scripting (XSS)",
    "Cross-Site Request Forgery (CSRF)",
    "Command Injection",
    "LDAP Injection",
    "XML External Entity (XXE)",
    "Server-Side Request Forgery",
    "Directory Traversal",
    "Ransomware",
    "Trojan (Backdoor, RATs)",
    "Worm",
    "Rootkit",
    "Spyware",
    "Keylogger",
    "Cryptojacking",
    "Fileless Malware",
    "Buffer Overflow",
    "Denial of Service (DoS)",
    "DDoS Attack",
    "Man-in-the-Middle (MITM)",
    "DNS Spoofing",
    "DNS Tunneling",
    "BGP Hijacking",
    "ARP Spoofing",
    "Packet Sniffing",
    "Brute Force Attack",
    "Credential Stuffing",
    "Password Spraying",
    "Session Hijacking",
    "Pass-the-Hash",
    "Golden Ticket Attack",
    "Phishing",
    "Smishing (SMS)",
    "Vishing (Voice)",
    "Business Email Compromise",
    "Baiting",
    "Pretexting",
    "Quid Pro Quo",
    "Supply Chain Compromise",
    "Zero-Day Exploit",
    "AI Data Poisoning",
    "Prompt Injection",
    "Side-Channel Attack",
];

const RadarAnimation: React.FC = () => {
    // Single threat that changes position every radar sweep (4 seconds)
    const [threat, setThreat] = useState({ angle: 45, distance: 0.6, key: 0 });
    // Cycling attack type display - synced with threat position
    const [attackIndex, setAttackIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Generate random position for the threat with new key to force remount
            setThreat(prev => ({
                angle: Math.random() * 360,
                distance: 0.3 + Math.random() * 0.5, // Between 0.3 and 0.8
                key: prev.key + 1, // Increment key to force remount
            }));
            // Change attack type at the same time
            setAttackIndex(prev => (prev + 1) % ATTACK_TYPES.length);
        }, 7000); // 7 seconds

        return () => clearInterval(interval);
    }, []);

    // Calculate threat position
    const angleRad = (threat.angle * Math.PI) / 180;
    const maxRadius = 45; // percentage from center
    const threatX = 50 + Math.cos(angleRad) * maxRadius * threat.distance;
    const threatY = 50 + Math.sin(angleRad) * maxRadius * threat.distance;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Outer glow */}
            <div className="absolute w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-nist-identify/5 blur-3xl animate-pulse"></div>

            {/* Main radar container */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">

                {/* Attack type display at top */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono text-red-400 uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span key={attackIndex} className="animate-fade-in">{ATTACK_TYPES[attackIndex]}</span>
                </div>

                {/* Concentric circles */}
                <div className="absolute inset-0 rounded-full border border-nist-identify/20"></div>
                <div className="absolute inset-[15%] rounded-full border border-nist-identify/15"></div>
                <div className="absolute inset-[30%] rounded-full border border-nist-identify/10"></div>
                <div className="absolute inset-[45%] rounded-full border border-nist-identify/10"></div>

                {/* Cross lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-nist-identify/20 to-transparent"></div>
                    <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-nist-identify/20 to-transparent"></div>
                    <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-nist-identify/10 to-transparent rotate-45"></div>
                    <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-nist-identify/10 to-transparent -rotate-45"></div>
                </div>

                {/* Rotating sweep line with gradient trail */}
                <div className="absolute inset-0 animate-radar-sweep origin-center">
                    {/* Sweep gradient cone */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(96, 165, 250, 0.15) 0deg, rgba(96, 165, 250, 0.05) 30deg, transparent 60deg)',
                        }}
                    ></div>
                    {/* Main sweep line */}
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left -translate-y-1/2 bg-gradient-to-r from-nist-identify to-transparent"></div>
                </div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-nist-identify shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>

                {/* Single threat blip - key forces remount for instant position change */}
                <div
                    key={threat.key}
                    className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 -translate-x-1/2 -translate-y-1/2 animate-fade-in"
                    style={{
                        left: `${threatX}%`,
                        top: `${threatY}%`,
                    }}
                >
                    {/* Threat ping effect */}
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-threat-ping"></div>
                    {/* Threat core */}
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-threat-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]"></div>
                </div>

                {/* Scan status text */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-mono text-nist-identify/70 uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nist-identify animate-pulse"></span>
                    <span>THREAT SCAN ACTIVE</span>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-nist-identify/40"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-nist-identify/40"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-nist-identify/40"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-nist-identify/40"></div>
            </div>
        </div>
    );
};

export default RadarAnimation;

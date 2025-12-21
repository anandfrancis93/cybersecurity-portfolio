import React, { useEffect, useRef, useState } from 'react';

interface TypewriterIntroProps {
    moduleName: string;
    accentColor?: string;
    onComplete: () => void;
}

const TypewriterIntro: React.FC<TypewriterIntroProps> = ({
    moduleName,
    accentColor = 'text-logs',
    onComplete,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 320;
        let height = 400;

        // Colors - dynamic based on module
        const moduleColors: Record<string, string> = {
            'asset': '#22D3EE',      // Cyan
            'lab': '#A855F7',         // Purple
            'recon': '#F59E0B',       // Amber/orange
            'clearance': '#22C55E',   // Green
            'logs': '#3B82F6',        // Blue
            'handshake': '#E11D48',   // Rose
        };
        const COLOR_ACCENT = moduleColors[moduleName] || '#3B82F6';
        const COLOR_PAPER = 'rgba(20, 20, 25, 0.95)';
        const COLOR_PAPER_SHADOW = 'rgba(0, 0, 0, 0.5)';
        const COLOR_TYPEWRITER = 'rgba(60, 60, 70, 1)';
        const COLOR_DARK = 'rgba(40, 40, 50, 1)';

        // 38 cybersecurity topics - same as TypewriterAnimation
        const articles = [
            { title: 'CONFIDENTIALITY', subject: 'CIA Triad', body: 'Keeping sensitive information private and only accessible to those who should see it.' },
            { title: 'INTEGRITY', subject: 'CIA Triad', body: 'Making sure data stays accurate and unchanged unless modified by authorized users.' },
            { title: 'AVAILABILITY', subject: 'CIA Triad', body: 'Ensuring systems and data are working and accessible when people need them.' },
            { title: 'ZERO TRUST', subject: 'Architecture', body: 'A security model where nothing is trusted by default, even inside the network.' },
            { title: 'IAM', subject: 'Access Control', body: 'Identity and Access Management. Managing who can access what systems.' },
            { title: 'PKI', subject: 'Cryptography', body: 'Public Key Infrastructure. A system for managing digital certificates.' },
            { title: 'INCIDENT RESPONSE', subject: 'Operations', body: 'The process of detecting, investigating, and recovering from security breaches.' },
            { title: 'AAA', subject: 'Framework', body: 'Authentication, Authorization, Accounting. Verify who, what, and when.' },
            { title: 'THREAT ACTOR', subject: 'Intelligence', body: 'Anyone who poses a cybersecurity threat, from hackers to nation-states.' },
            { title: 'ATTACK SURFACE', subject: 'Risk', body: 'All the possible entry points where an attacker could try to break into a system.' },
            { title: 'ATTACK VECTOR', subject: 'Methodology', body: 'The specific method or path an attacker uses to gain unauthorized access.' },
            { title: 'ZERO-DAY', subject: 'Vulnerabilities', body: 'A security flaw that developers do not know about yet, making it very dangerous.' },
            { title: 'MALWARE', subject: 'Threats', body: 'Software designed to harm computers, including viruses, ransomware, and trojans.' },
            { title: 'ACL', subject: 'Access Control', body: 'Access Control List. Rules defining who can access what resources.' },
            { title: 'LEAST PRIVILEGE', subject: 'Principle', body: 'Giving users only the minimum access they need to do their job, nothing extra.' },
            { title: 'AIR-GAP', subject: 'Isolation', body: 'Physically disconnecting a computer from all networks for maximum security.' },
            { title: 'DATA SOVEREIGNTY', subject: 'Compliance', body: 'Data must follow the laws of the country where it is stored or processed.' },
            { title: 'DISASTER RECOVERY', subject: 'Continuity', body: 'Plans and procedures to restore systems and data after a major incident.' },
            { title: 'OSINT', subject: 'Intelligence', body: 'Open Source Intelligence. Gathering info from public sources.' },
            { title: 'PEN TESTING', subject: 'Assessment', body: 'Hiring ethical hackers to safely attack your systems and find weaknesses.' },
            { title: 'DIGITAL FORENSICS', subject: 'Investigation', body: 'The science of collecting and analyzing digital evidence after a cyber incident.' },
            { title: 'PROMPT INJECTION', subject: 'AI Security', body: 'Tricking AI chatbots into doing unintended things through specially crafted inputs.' },
            { title: 'STUXNET', subject: 'APT Malware', body: 'A famous worm created by governments to sabotage Iran nuclear facilities in 2010.' },
            { title: 'PEGASUS', subject: 'Spyware', body: 'Powerful spyware that can secretly take over phones without users clicking anything.' },
            { title: 'NOTPETYA', subject: 'Wiper', body: 'A 2017 attack disguised as ransomware that destroyed data worldwide, causing $10B damage.' },
            { title: 'WANNACRY', subject: 'Ransomware', body: 'A 2017 ransomware that spread globally, crippling hospitals and businesses.' },
            { title: 'SOLARWINDS', subject: 'Supply Chain', body: 'A 2020 attack where hackers hid malware in software updates, affecting thousands.' },
            { title: 'RED TEAM', subject: 'Offensive', body: 'Security professionals who simulate real attacks to test an organization defenses.' },
            { title: 'BLUE TEAM', subject: 'Defensive', body: 'Security professionals who defend systems and respond to attacks in real-time.' },
            { title: 'PURPLE TEAM', subject: 'Collaboration', body: 'Red and Blue teams working together to continuously improve security.' },
            { title: 'YELLOW TEAM', subject: 'Development', body: 'Developers who focus on building security into software from the beginning.' },
            { title: 'ORANGE TEAM', subject: 'Education', body: 'Teams that train employees to recognize phishing and other security threats.' },
            { title: 'WHITE TEAM', subject: 'Governance', body: 'Management that oversees security exercises and sets the rules.' },
            { title: 'RED HAT', subject: 'Vigilante', body: 'Hackers who fight back against malicious hackers using aggressive methods.' },
            { title: 'BLUE HAT', subject: 'External Tester', body: 'Outside security experts hired to find bugs before software is released.' },
            { title: 'GREEN HAT', subject: 'Newbie', body: 'Beginner hackers who are learning but may not understand the risks involved.' },
            { title: 'PURPLE HAT', subject: 'Self-Taught', body: 'Hackers who practice and improve their skills by testing their own systems.' },
            { title: 'PINK HAT', subject: 'Evaluator', body: 'Specialists who evaluate security systems with a focus on unique defensive methods.' },
            { title: 'DEFENSE-IN-DEPTH', subject: 'Strategy', body: 'Layered security. Using multiple defensive lines so if one fails, another stops the attack.' },
            { title: 'APT', subject: 'Threats', body: 'Advanced Persistent Threat. Sophisticated attackers who hide in a network for a long time.' },
            { title: 'SHADOW IT', subject: 'Risk', body: 'Tech used without IT approval. Employees using unauthorized apps or devices.' },
            { title: 'PAM', subject: 'Access Control', body: 'Privileged Access Management. Securing accounts with "god mode" access.' },
            { title: 'XDR', subject: 'Operations', body: 'Extended Detection and Response. A tool that collects data everywhere to spot attacks.' },
            { title: 'NIST CSF 2.0', subject: 'Framework', body: 'The standard framework for managing cyber risk: Govern, Identify, Protect, Detect, Respond, Recover.' },
            { title: 'WHITE BOX', subject: 'Testing', body: 'Security testing where the hacker has full knowledge of the system, including source code and diagrams.' },
            { title: 'BLACK BOX', subject: 'Testing', body: 'Security testing where the hacker has zero prior knowledge, simulating a real outside attack.' },
            { title: 'GREY BOX', subject: 'Testing', body: 'A blended testing approach where the hacker has some limited knowledge, like low-level credentials.' }
        ];

        // Shred particle interface
        interface Shred {
            x: number;
            y: number;
            vx: number;
            vy: number;
            width: number;
            height: number;
            angle: number;
            rotSpeed: number;
        }

        let shreds: Shred[] = [];
        let phase: 'typing' | 'reading' | 'shredding' = 'typing';
        let lastShredTime = 0;

        // Configuration
        const READING_TIME = 2000; // Shorter reading time for loading screen
        const SHREDDING_DURATION = 1500;

        // Pick a random article for this load
        const article = articles[Math.floor(Math.random() * articles.length)];
        const startTime = performance.now();
        let frameCount = 0;

        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            // Ensure canvas size matches
            if (canvas.width !== width * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                ctx.scale(dpr, dpr);
            }

            ctx.clearRect(0, 0, width, height);
            frameCount++;

            const now = performance.now();
            const elapsed = now - startTime;

            const centerX = width / 2;

            // Typewriter dimensions
            const twWidth = width * 0.85;
            const twHeight = 65;
            const twTop = height - 90;
            const twLeft = (width - twWidth) / 2;

            // Paper dimensions
            const paperWidth = twWidth * 0.75;
            const paperMaxHeight = twTop - 40;
            const paperLeft = (width - paperWidth) / 2;

            // --- CALCULATE PHASES ---
            // 1. Typing Duration
            const typingDuration = 300 + article.title.length * 40 + 200 + (article.subject.length + 4) * 30 + 300 + article.body.length * 25;

            let paperYOffset = 0;

            if (elapsed < typingDuration) {
                phase = 'typing';
            } else if (elapsed < typingDuration + READING_TIME) {
                phase = 'reading';
            } else if (elapsed < typingDuration + READING_TIME + SHREDDING_DURATION) {
                phase = 'shredding';
            } else {
                // Done!
                if (!isComplete) setIsComplete(true);
                return; // Stop animation
            }

            // Paper Animation Logic
            // Emergance (start)
            let paperVisibleHeight = paperMaxHeight;
            if (phase === 'typing' && elapsed < 1000) {
                paperVisibleHeight = paperMaxHeight * (elapsed / 1000);
            }

            // Shredding (end)
            if (phase === 'shredding') {
                const shredProgress = (elapsed - (typingDuration + READING_TIME)) / SHREDDING_DURATION;
                paperYOffset = paperMaxHeight * shredProgress; // Move paper down

                // Spawn shreds
                if (now - lastShredTime > 40 && paperYOffset < paperMaxHeight * 0.9) {
                    lastShredTime = now;
                    // Spawn a batch of shreds
                    for (let k = 0; k < 3; k++) {
                        shreds.push({
                            x: paperLeft + Math.random() * paperWidth,
                            y: twTop + twHeight - 10,
                            vx: (Math.random() - 0.5) * 2,
                            vy: Math.random() * 2 + 2,
                            width: Math.random() * 4 + 2,
                            height: Math.random() * 8 + 4,
                            angle: Math.random() * Math.PI * 2,
                            rotSpeed: (Math.random() - 0.5) * 0.2
                        });
                    }
                }
            }

            const paperTop = twTop - paperVisibleHeight + paperYOffset;

            // === DRAW PAPER (behind typewriter) ===
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, width, twTop + 10); // Clip everything below the slot line roughly
            ctx.clip();

            if (paperVisibleHeight - paperYOffset > 0) {
                ctx.fillStyle = COLOR_PAPER_SHADOW;
                ctx.fillRect(paperLeft + 4, paperTop + 4, paperWidth, paperVisibleHeight);

                ctx.fillStyle = COLOR_PAPER;
                ctx.fillRect(paperLeft, paperTop, paperWidth, paperVisibleHeight);

                ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
                ctx.lineWidth = 1;
                ctx.strokeRect(paperLeft, paperTop, paperWidth, paperVisibleHeight);

                ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
                ctx.beginPath();
                ctx.moveTo(paperLeft + 15, paperTop);
                ctx.lineTo(paperLeft + 15, paperTop + paperVisibleHeight);
                ctx.stroke();

                const contentPadding = 25;
                let textY = paperTop + 30;

                ctx.textAlign = 'left';

                // 1. Title
                if (textY < twTop) {
                    ctx.font = 'bold 16px "JetBrains Mono", monospace';
                    const titleToShow = phase === 'typing' ? article.title.substring(0, Math.floor((elapsed - 300) / 40)) : article.title;
                    if (titleToShow.length > 0) {
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillText(titleToShow, paperLeft + contentPadding, textY);
                    }
                }

                // 2. Subject Line
                textY += 28;
                if (textY < twTop) {
                    ctx.font = '11px "JetBrains Mono", monospace';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    const subjectStart = 300 + article.title.length * 40 + 200;
                    if (elapsed > subjectStart) {
                        const subjectToShow = phase === 'typing' ? `RE: ${article.subject}`.substring(0, Math.floor((elapsed - subjectStart) / 40)) : `RE: ${article.subject}`;
                        ctx.fillText(subjectToShow, paperLeft + contentPadding, textY);
                    }
                }

                // Divider
                textY += 15;
                if (textY < twTop && elapsed > 1500) {
                    ctx.strokeStyle = 'rgba(150, 150, 150, 0.3)';
                    ctx.beginPath();
                    ctx.moveTo(paperLeft + contentPadding, textY);
                    ctx.lineTo(paperLeft + paperWidth - 15, textY);
                    ctx.stroke();
                }

                // 3. Body
                textY += 25;
                if (textY < twTop) {
                    ctx.font = '12px "JetBrains Mono", monospace';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    const bodyStart = 300 + article.title.length * 40 + 200 + (article.subject.length + 4) * 30 + 300;

                    if (elapsed > bodyStart) {
                        const bodyChars = phase === 'typing' ? Math.floor((elapsed - bodyStart) / 25) : article.body.length;
                        const words = article.body.split(' ');
                        let line = '';
                        let currentBodyChars = 0;

                        for (let i = 0; i < words.length; i++) {
                            if (currentBodyChars >= bodyChars) break;

                            const testLine = line + (line ? ' ' : '') + words[i];
                            const maxWidth = paperWidth - contentPadding - 20;

                            if (ctx.measureText(testLine).width > maxWidth && line) {
                                if (textY < twTop) ctx.fillText(line, paperLeft + contentPadding, textY);
                                textY += 18;
                                line = words[i];
                            } else {
                                line = testLine;
                            }
                            currentBodyChars += words[i].length + 1;
                        }
                        if (line && textY < twTop) {
                            ctx.fillText(line, paperLeft + contentPadding, textY);
                        }

                        // Cursor
                        if (phase === 'typing' && Math.floor(frameCount / 10) % 2 === 0) {
                            const lineWidth = ctx.measureText(line).width;
                            ctx.fillStyle = COLOR_ACCENT;
                            if (textY < twTop) ctx.fillRect(paperLeft + contentPadding + lineWidth + 1, textY - 10, 2, 13);
                        }
                    }
                }
            }
            ctx.restore(); // End clipping

            // === DRAW SHREDS (FALLING PARTICLES) ===
            if (shreds.length > 0) {
                for (let i = shreds.length - 1; i >= 0; i--) {
                    const s = shreds[i];
                    s.y += s.vy;
                    s.x += s.vx; // Slight drift
                    s.angle += s.rotSpeed;

                    ctx.save();
                    ctx.translate(s.x, s.y);
                    ctx.rotate(s.angle);
                    ctx.fillStyle = 'rgba(230, 230, 230, 0.9)'; // Paper color
                    ctx.fillRect(-s.width / 2, -s.height / 2, s.width, s.height);
                    ctx.restore();

                    // Remove if off screen
                    if (s.y > height + 20) {
                        shreds.splice(i, 1);
                    }
                }
            }

            // === DRAW TYPEWRITER ===
            ctx.fillStyle = COLOR_TYPEWRITER;
            ctx.beginPath();
            ctx.roundRect(twLeft, twTop, twWidth, twHeight, 8);
            ctx.fill();

            ctx.fillStyle = COLOR_DARK;
            ctx.fillRect(twLeft + 10, twTop - 8, twWidth - 20, 12);

            ctx.fillStyle = 'rgba(20, 20, 25, 1)';
            ctx.fillRect(twLeft + twWidth * 0.2, twTop - 3, twWidth * 0.6, 6);

            ctx.fillStyle = 'rgba(30, 30, 35, 1)';
            ctx.fillRect(twLeft + 15, twTop + 35, twWidth - 30, 20);

            // Keys
            const keyCount = 10;
            const keyWidth = (twWidth - 50) / keyCount;
            const isTyping = phase === 'typing';
            const pressedKey = isTyping ? Math.floor((Math.sin(frameCount * 0.03) * 5 + Math.cos(frameCount * 0.05) * 3 + 8) % keyCount) : -1;

            for (let i = 0; i < keyCount; i++) {
                const keyX = twLeft + 20 + i * keyWidth;
                const isPressed = i === pressedKey && Math.floor(frameCount / 15) % 2 === 0;
                ctx.fillStyle = isPressed ? 'rgba(80, 80, 90, 1)' : 'rgba(50, 50, 60, 1)';
                ctx.beginPath();
                ctx.roundRect(keyX, twTop + 37 + (isPressed ? 2 : 0), keyWidth - 4, 14, 2);
                ctx.fill();
            }

            // Decorations
            ctx.fillStyle = COLOR_ACCENT;
            ctx.beginPath();
            ctx.arc(twLeft + 25, twTop + 18, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(twLeft + twWidth - 25, twTop + 18, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = COLOR_ACCENT;
            ctx.textAlign = 'center';
            ctx.fillText('INTEL BRIEFING', centerX, twTop + 22);
            ctx.textAlign = 'left';

            animationFrameId = requestAnimationFrame(draw);
        };

        // Set canvas size with high DPI support for crisp text
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [moduleName]); // Removed isComplete dependency to avoid re-running effect

    // Call onComplete when animation finishes
    useEffect(() => {
        if (isComplete) {
            onComplete();
        }
    }, [isComplete, onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]">
            <div className="flex flex-col items-center gap-6">
                <canvas ref={canvasRef} className="w-80 h-100" />
                <p className="text-gray-500 text-sm font-mono animate-pulse">
                    LOADING {moduleName.toUpperCase()}...
                </p>
            </div>
        </div>
    );
};

export default TypewriterIntro;

import React, { useEffect, useRef } from 'react';

const TypewriterAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 280;
        let height = 320;

        // Colors
        const COLOR_BLUE = '#3B82F6';
        const COLOR_DIM = 'rgba(255, 255, 255, 0.2)';
        const COLOR_PAPER = 'rgba(20, 20, 25, 0.95)';
        const COLOR_PAPER_SHADOW = 'rgba(0, 0, 0, 0.5)';
        const COLOR_TYPEWRITER = 'rgba(60, 60, 70, 1)';
        const COLOR_DARK = 'rgba(40, 40, 50, 1)';

        // Article content - 38 cybersecurity topics
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
            { title: 'PINK HAT', subject: 'Evaluator', body: 'Specialists who evaluate security systems with a focus on unique defensive methods.' }
        ];

        let currentArticleIndex = 0;
        let articleStartTime = performance.now();
        let frameCount = 0;

        const handleGlobalScramble = () => {
            currentArticleIndex = (currentArticleIndex + 1) % articles.length;
            articleStartTime = performance.now();
        };

        window.addEventListener('globalScramble', handleGlobalScramble);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            frameCount++;

            const article = articles[currentArticleIndex];
            const elapsed = performance.now() - articleStartTime;

            const centerX = width / 2;

            // Typewriter dimensions
            const twWidth = width * 0.85;
            const twHeight = 65;
            const twTop = height - 80;
            const twLeft = (width - twWidth) / 2;

            // Paper dimensions - emerges from typewriter
            const paperWidth = twWidth * 0.75;
            const paperMaxHeight = twTop - 30;
            const paperLeft = (width - paperWidth) / 2;

            // Paper animation - slides up over 2 seconds
            const paperProgress = Math.min(1, elapsed / 2000);
            const paperHeight = paperMaxHeight * paperProgress;
            const paperTop = twTop - paperHeight;

            // === DRAW PAPER (behind typewriter) ===
            if (paperHeight > 10) {
                // Paper shadow
                ctx.fillStyle = COLOR_PAPER_SHADOW;
                ctx.fillRect(paperLeft + 4, paperTop + 4, paperWidth, paperHeight);

                // Paper (dark)
                ctx.fillStyle = COLOR_PAPER;
                ctx.fillRect(paperLeft, paperTop, paperWidth, paperHeight);

                // Paper border
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
                ctx.lineWidth = 1;
                ctx.strokeRect(paperLeft, paperTop, paperWidth, paperHeight);

                // Left margin line
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
                ctx.lineWidth = 1;
                ctx.setLineDash([]);

                ctx.beginPath();
                ctx.moveTo(paperLeft + 15, paperTop);
                ctx.lineTo(paperLeft + 15, paperTop + paperHeight);
                ctx.stroke();

                // Content on paper (white text)
                const contentPadding = 25;
                let textY = paperTop + 25;

                // Only show content as paper emerges
                if (paperHeight > 40) {
                    // Title
                    ctx.font = 'bold 14px monospace';
                    ctx.fillStyle = '#FFFFFF';
                    const titleChars = Math.floor((elapsed - 500) / 50);
                    const titleToShow = article.title.substring(0, Math.max(0, titleChars));
                    ctx.fillText(titleToShow, paperLeft + contentPadding, textY);

                    // Cursor after title
                    if (titleChars > 0 && titleChars <= article.title.length) {
                        const titleWidth = ctx.measureText(titleToShow).width;
                        if (Math.floor(frameCount / 10) % 2 === 0) {
                            ctx.fillStyle = COLOR_BLUE;
                            ctx.fillRect(paperLeft + contentPadding + titleWidth + 1, textY - 11, 2, 13);
                        }
                    }
                }

                if (paperHeight > 70) {
                    textY += 25;
                    // Subject line
                    ctx.font = '10px monospace';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    const subjectDelay = 500 + article.title.length * 50 + 300;
                    const subjectChars = Math.floor((elapsed - subjectDelay) / 40);
                    const subjectText = `RE: ${article.subject}`;
                    const subjectToShow = subjectText.substring(0, Math.max(0, subjectChars));
                    ctx.fillText(subjectToShow, paperLeft + contentPadding, textY);

                    // Cursor after subject
                    if (subjectChars > 0 && subjectChars <= subjectText.length) {
                        const subjectWidth = ctx.measureText(subjectToShow).width;
                        if (Math.floor(frameCount / 10) % 2 === 0) {
                            ctx.fillStyle = COLOR_BLUE;
                            ctx.fillRect(paperLeft + contentPadding + subjectWidth + 1, textY - 8, 2, 10);
                        }
                    }

                    // Divider line
                    if (subjectChars >= subjectText.length) {
                        textY += 12;
                        ctx.strokeStyle = 'rgba(150, 150, 150, 0.4)';
                        ctx.beginPath();
                        ctx.moveTo(paperLeft + contentPadding, textY);
                        ctx.lineTo(paperLeft + paperWidth - 15, textY);
                        ctx.stroke();
                    }
                }

                if (paperHeight > 110) {
                    textY += 20;
                    // Body text
                    ctx.font = '11px monospace';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    const bodyDelay = 500 + article.title.length * 50 + 300 + (article.subject.length + 4) * 40 + 500;
                    const bodyChars = Math.floor((elapsed - bodyDelay) / 35);

                    // Word wrap body text
                    const words = article.body.split(' ');
                    let line = '';
                    const maxWidth = paperWidth - contentPadding - 20;
                    let charCount = 0;

                    for (const word of words) {
                        const testLine = line + (line ? ' ' : '') + word;
                        if (ctx.measureText(testLine).width > maxWidth && line) {
                            const lineToShow = line.substring(0, Math.max(0, bodyChars - charCount + line.length));
                            if (lineToShow) {
                                ctx.fillText(lineToShow, paperLeft + contentPadding, textY);
                            }
                            charCount += line.length + 1;
                            textY += 16;
                            line = word;
                        } else {
                            line = testLine;
                        }
                    }
                    // Last line
                    if (line) {
                        const lineToShow = line.substring(0, Math.max(0, bodyChars - charCount + line.length));
                        if (lineToShow) {
                            ctx.fillText(lineToShow, paperLeft + contentPadding, textY);
                            // Cursor
                            if (bodyChars > 0 && bodyChars <= article.body.length) {
                                const lineWidth = ctx.measureText(lineToShow).width;
                                if (Math.floor(frameCount / 10) % 2 === 0) {
                                    ctx.fillStyle = COLOR_BLUE;
                                    ctx.fillRect(paperLeft + contentPadding + lineWidth + 1, textY - 9, 2, 11);
                                }
                            }
                        }
                    }
                }
            }

            // === DRAW TYPEWRITER ===
            // Main body
            ctx.fillStyle = COLOR_TYPEWRITER;
            ctx.beginPath();
            ctx.roundRect(twLeft, twTop, twWidth, twHeight, 8);
            ctx.fill();

            // Top roller/bar
            ctx.fillStyle = COLOR_DARK;
            ctx.fillRect(twLeft + 10, twTop - 8, twWidth - 20, 12);

            // Paper slot
            ctx.fillStyle = 'rgba(20, 20, 25, 1)';
            ctx.fillRect(twLeft + twWidth * 0.2, twTop - 3, twWidth * 0.6, 6);

            // Keys area
            ctx.fillStyle = 'rgba(30, 30, 35, 1)';
            ctx.fillRect(twLeft + 15, twTop + 35, twWidth - 30, 20);

            // Individual keys - random pressing (slower, more realistic)
            const keyCount = 10;
            const keyWidth = (twWidth - 50) / keyCount;
            // Calculate when all typing is finished
            const typingEndTime = 500 + article.title.length * 50 + 300 + (article.subject.length + 4) * 40 + 500 + article.body.length * 35;
            // Generate pseudo-random key press pattern - only while typing
            const isTyping = elapsed < typingEndTime;
            const pressedKey = isTyping ? Math.floor((Math.sin(frameCount * 0.03) * 5 + Math.cos(frameCount * 0.05) * 3 + 8) % keyCount) : -1;
            for (let i = 0; i < keyCount; i++) {
                const keyX = twLeft + 20 + i * keyWidth;
                const isPressed = i === pressedKey && Math.floor(frameCount / 15) % 2 === 0;
                ctx.fillStyle = isPressed ? 'rgba(80, 80, 90, 1)' : 'rgba(50, 50, 60, 1)';
                ctx.beginPath();
                ctx.roundRect(keyX, twTop + 37 + (isPressed ? 2 : 0), keyWidth - 4, 14, 2);
                ctx.fill();
            }

            // Decorative elements on typewriter
            ctx.fillStyle = COLOR_BLUE;
            ctx.beginPath();
            ctx.arc(twLeft + 25, twTop + 18, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(twLeft + twWidth - 25, twTop + 18, 4, 0, Math.PI * 2);
            ctx.fill();

            // Label
            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = COLOR_BLUE;
            ctx.textAlign = 'center';
            ctx.fillText('INTEL BRIEFING', centerX, twTop + 22);
            ctx.textAlign = 'left';

            animationFrameId = requestAnimationFrame(draw);
        };

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            if (entry) {
                width = entry.contentRect.width;
                height = entry.contentRect.height;
                canvas.width = width;
                canvas.height = height;
            }
        });

        if (canvas.parentElement) {
            observer.observe(canvas.parentElement);
            const rect = canvas.parentElement.getBoundingClientRect();
            width = rect.width || 280;
            height = rect.height || 320;
            canvas.width = width;
            canvas.height = height;
        }

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('globalScramble', handleGlobalScramble);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default TypewriterAnimation;

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

        // Article content - 22 cybersecurity topics
        const articles = [
            { title: 'CONFIDENTIALITY', subject: 'CIA Triad', body: 'Protect sensitive data from unauthorized access and disclosure.' },
            { title: 'INTEGRITY', subject: 'CIA Triad', body: 'Ensure data remains accurate, consistent, and unaltered.' },
            { title: 'AVAILABILITY', subject: 'CIA Triad', body: 'Systems and data accessible when needed by authorized users.' },
            { title: 'ZERO TRUST', subject: 'Architecture', body: 'Never trust, always verify. Assume breach mentality.' },
            { title: 'IAM', subject: 'Access Control', body: 'Identity and Access Management. Right access, right time.' },
            { title: 'PKI', subject: 'Cryptography', body: 'Public Key Infrastructure. Certificates, keys, trust chains.' },
            { title: 'INCIDENT RESPONSE', subject: 'Operations', body: 'Detect, contain, eradicate, recover. Plan for the breach.' },
            { title: 'AAA', subject: 'Framework', body: 'Authentication, Authorization, Accounting. Who, what, when.' },
            { title: 'THREAT ACTOR', subject: 'Intelligence', body: 'Adversaries with intent and capability to cause harm.' },
            { title: 'ATTACK SURFACE', subject: 'Risk', body: 'Total exposure points where attacks can be attempted.' },
            { title: 'ATTACK VECTOR', subject: 'Methodology', body: 'The path or method used to exploit a vulnerability.' },
            { title: 'ZERO-DAY', subject: 'Vulnerabilities', body: 'Unknown flaws. No patch exists. Race against time.' },
            { title: 'MALWARE', subject: 'Threats', body: 'Malicious software. Viruses, ransomware, trojans, worms.' },
            { title: 'ACL', subject: 'Access Control', body: 'Access Control Lists. Define who can access what resources.' },
            { title: 'LEAST PRIVILEGE', subject: 'Principle', body: 'Minimum access needed to perform a function. Nothing more.' },
            { title: 'AIR-GAP', subject: 'Isolation', body: 'Physical separation from networks. Ultimate isolation.' },
            { title: 'DATA SOVEREIGNTY', subject: 'Compliance', body: 'Data subject to laws of the country where it resides.' },
            { title: 'DISASTER RECOVERY', subject: 'Continuity', body: 'Plans to restore operations after catastrophic events.' },
            { title: 'OSINT', subject: 'Intelligence', body: 'Open Source Intelligence. Public data, private insights.' },
            { title: 'PEN TESTING', subject: 'Assessment', body: 'Authorized simulated attacks to find vulnerabilities.' },
            { title: 'DIGITAL FORENSICS', subject: 'Investigation', body: 'Collect, preserve, analyze digital evidence.' },
            { title: 'PROMPT INJECTION', subject: 'AI Security', body: 'Manipulating AI systems through crafted inputs.' }
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
            const twHeight = 50;
            const twTop = height - 70;
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
            ctx.fillRect(twLeft + 15, twTop + 20, twWidth - 30, 20);

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
                ctx.roundRect(keyX, twTop + 22 + (isPressed ? 2 : 0), keyWidth - 4, 14, 2);
                ctx.fill();
            }

            // Decorative elements on typewriter
            ctx.fillStyle = COLOR_BLUE;
            ctx.beginPath();
            ctx.arc(twLeft + 25, twTop + 12, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(twLeft + twWidth - 25, twTop + 12, 4, 0, Math.PI * 2);
            ctx.fill();

            // Label
            ctx.font = 'bold 8px monospace';
            ctx.fillStyle = COLOR_BLUE;
            ctx.textAlign = 'center';
            ctx.fillText('AXIUM WRITER', centerX, twTop + 14);
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

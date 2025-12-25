import React, { useEffect, useRef, useState } from 'react';

interface PrinterIntroProps {
    moduleName: string;
    accentColor?: string;
    onComplete: () => void;
}

const PrinterIntro: React.FC<PrinterIntroProps> = ({
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
        const width = 320;
        const height = 500; // Taller to accommodate A4 paper

        // Initial high-DPI setup - use minimum 2x for crisp text on all displays
        const dpr = Math.max(2, window.devicePixelRatio || 1);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = false;

        // Colors - dynamic based on module
        const moduleColors: Record<string, string> = {
            'asset': '#22D3EE',
            'lab': '#A855F7',
            'recon': '#F59E0B',
            'clearance': '#22C55E',
            'logs': '#3B82F6',
            'handshake': '#E11D48',
        };
        const COLOR_ACCENT = moduleColors[moduleName] || '#3B82F6';

        // Dark Theme Colors
        const COLOR_PAPER = '#000000';
        const COLOR_PAPER_BORDER = 'rgba(255, 255, 255, 0.2)';
        const COLOR_PRINTER_BODY = '#1C1C1E';
        const COLOR_PRINTER_ACCENT = '#2D2D30';

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
        let lastShredTime = 0;

        // Cybersecurity topics
        const articles = [
            { title: 'CONFIDENTIALITY', subject: 'CIA Triad', body: 'Keeping sensitive information private and only accessible to those who should see it.' },
            { title: 'INTEGRITY', subject: 'CIA Triad', body: 'Making sure data stays accurate and unchanged unless modified by authorized users.' },
            { title: 'AVAILABILITY', subject: 'CIA Triad', body: 'Ensuring systems and data are working and accessible when people need them.' },
            { title: 'ZERO TRUST', subject: 'Architecture', body: 'A security model where nothing is trusted by default, even inside the network.' },
            { title: 'IAM', subject: 'Access Control', body: 'Identity and Access Management. Managing who can access what systems.' },
            { title: 'PKI', subject: 'Cryptography', body: 'Public Key Infrastructure. A system for managing digital certificates.' },
            { title: 'INCIDENT RESPONSE', subject: 'Operations', body: 'The process of detecting, investigating, and recovering from security breaches.' },
            { title: 'THREAT ACTOR', subject: 'Intelligence', body: 'Anyone who poses a cybersecurity threat, from hackers to nation-states.' },
            { title: 'ZERO-DAY', subject: 'Vulnerabilities', body: 'A security flaw that developers do not know about yet, making it dangerous.' },
            { title: 'MALWARE', subject: 'Threats', body: 'Software designed to harm computers, including viruses, ransomware, and trojans.' },
            { title: 'RANSOMWARE', subject: 'Malware', body: 'Malicious software that blocks access to a system until a ransom is paid.' },
            { title: 'PHISHING', subject: 'Social Engineering', body: 'Sending fraudulent emails resembling reputable sources to steal sensitive data.' },
            { title: 'DEFENSE-IN-DEPTH', subject: 'Strategy', body: 'Layered security. Using multiple defensive lines so if one fails, another stops the attack.' },
            { title: 'RED TEAM', subject: 'Offensive', body: 'Security professionals who simulate real attacks to test organization defenses.' },
            { title: 'BLUE TEAM', subject: 'Defensive', body: 'Security professionals who defend systems and respond to attacks in real-time.' },
        ];

        let phase: 'printing' | 'reading' | 'shredding' = 'printing';

        // Configuration
        const LINE_PRINT_TIME = 800; // ms per line
        const READING_TIME = 2000;
        const SHREDDING_DURATION = 1200;

        // Pick a random article
        const article = articles[Math.floor(Math.random() * articles.length)];
        const startTime = performance.now();

        // Pre-calculate lines to print
        interface PrintLine {
            text: string;
            style: 'title' | 'subject' | 'separator' | 'body';
        }
        const linesToPrint: PrintLine[] = [];

        // Title
        linesToPrint.push({ text: article.title, style: 'title' });

        // Subject
        linesToPrint.push({ text: `SUBJECT: ${article.subject}`, style: 'subject' });

        // Separator line
        linesToPrint.push({ text: '─'.repeat(24), style: 'separator' });

        // Word-wrap body into lines
        const bodyWords = article.body.split(' ');
        let bodyLine = '';
        for (const word of bodyWords) {
            const testLine = bodyLine + (bodyLine ? ' ' : '') + word;
            if (testLine.length > 25 && bodyLine) {
                linesToPrint.push({ text: bodyLine, style: 'body' });
                bodyLine = word;
            } else {
                bodyLine = testLine;
            }
        }
        if (bodyLine) linesToPrint.push({ text: bodyLine, style: 'body' });

        // Add empty lines for bottom spacing
        linesToPrint.push({ text: '', style: 'body' });
        linesToPrint.push({ text: '', style: 'body' });

        const totalPrintDuration = linesToPrint.length * LINE_PRINT_TIME;
        const lineHeight = 24;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const now = performance.now();
            const elapsed = now - startTime;

            // Printer dimensions
            const printerWidth = width * 0.88;
            const printerHeight = 75;
            const printerTop = height - printerHeight - 15;
            const printerLeft = (width - printerWidth) / 2;

            // Paper dimensions (A4 aspect ratio: 1:1.414)
            const paperWidth = 200; // Fixed width for A4 proportions
            const paperMaxHeight = paperWidth * 1.414; // A4 height
            const paperLeft = (width - paperWidth) / 2;
            const printHeadY = printerTop - 8; // Where new lines appear (just above the slot)

            // --- CALCULATE PHASES ---
            let paperShredOffset = 0;

            if (elapsed < totalPrintDuration) {
                phase = 'printing';
            } else if (elapsed < totalPrintDuration + READING_TIME) {
                phase = 'reading';
            } else if (elapsed < totalPrintDuration + READING_TIME + SHREDDING_DURATION) {
                phase = 'shredding';
                const shredProgress = (elapsed - (totalPrintDuration + READING_TIME)) / SHREDDING_DURATION;
                paperShredOffset = 400 * shredProgress;

                if (now - lastShredTime > 35 && shredProgress < 0.85) {
                    lastShredTime = now;
                    for (let k = 0; k < 4; k++) {
                        shreds.push({
                            x: paperLeft + Math.random() * paperWidth,
                            y: printerTop + printerHeight - 5,
                            vx: (Math.random() - 0.5) * 3,
                            vy: Math.random() * 3 + 2,
                            width: Math.random() * 5 + 2,
                            height: Math.random() * 10 + 4,
                            angle: Math.random() * Math.PI * 2,
                            rotSpeed: (Math.random() - 0.5) * 0.25
                        });
                    }
                }
            } else {
                if (!isComplete) setIsComplete(true);
                return;
            }

            // Calculate how many lines have been printed (and how far through current line)
            const linesPrinted = Math.floor(elapsed / LINE_PRINT_TIME);
            const currentLineProgress = (elapsed % LINE_PRINT_TIME) / LINE_PRINT_TIME;

            // Paper grows as lines are printed
            const printedLines = Math.min(linesPrinted + 1, linesToPrint.length);
            const paperHeight = printedLines * lineHeight + 20; // 20 for top padding
            const paperTop = printHeadY - paperHeight + paperShredOffset;

            // === DRAW PAPER ===
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, width, printerTop + 5);
            ctx.clip();

            if (paperHeight > 10 && phase !== 'shredding') {
                // Paper shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(paperLeft + 4, paperTop + 4, paperWidth, paperHeight);

                // Paper body
                ctx.fillStyle = COLOR_PAPER;
                ctx.fillRect(paperLeft, paperTop, paperWidth, paperHeight);

                // Paper border
                ctx.strokeStyle = COLOR_PAPER_BORDER;
                ctx.lineWidth = 1;
                ctx.strokeRect(paperLeft, paperTop, paperWidth, paperHeight);

                // --- CONTENT ---
                // Lines are positioned from the print head UPWARD
                // Most recent line is at printHeadY, older lines are above
                const contentPadding = 18;
                ctx.textAlign = 'left';

                for (let i = 0; i < printedLines && i < linesToPrint.length; i++) {
                    const line = linesToPrint[i];

                    // Calculate Y position: newest line at bottom, older lines above
                    // Line 0 (title) should be at the top of the visible content
                    const lineIndex = i;
                    const lineY = printHeadY - (printedLines - 1 - lineIndex) * lineHeight - 15;

                    // Only draw if visible (above printer slot, below top of canvas)
                    if (lineY < 5 || lineY > printerTop) continue;

                    // Set style based on line type
                    switch (line.style) {
                        case 'title':
                            ctx.font = 'bold 16px "JetBrains Mono", monospace';
                            ctx.fillStyle = '#FFFFFF';
                            break;
                        case 'subject':
                            ctx.font = '10px "JetBrains Mono", monospace';
                            ctx.fillStyle = COLOR_ACCENT;
                            break;
                        case 'separator':
                            ctx.font = '10px "JetBrains Mono", monospace';
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                            break;
                        case 'body':
                            ctx.font = '11px "JetBrains Mono", monospace';
                            ctx.fillStyle = '#FFFFFF';
                            break;
                    }

                    if (line.text) {
                        ctx.fillText(line.text, paperLeft + contentPadding, lineY);
                    }
                }
            }

            // Paper being shredded
            if (phase === 'shredding') {
                const shredProgress = (elapsed - (totalPrintDuration + READING_TIME)) / SHREDDING_DURATION;
                const fadeOut = Math.max(0, 1 - shredProgress * 1.5);

                if (fadeOut > 0) {
                    ctx.globalAlpha = fadeOut;
                    ctx.fillStyle = COLOR_PAPER;
                    ctx.fillRect(paperLeft, paperTop, paperWidth, paperHeight);
                    ctx.globalAlpha = 1;
                }
            }

            ctx.restore();

            // === DRAW SHREDS ===
            if (shreds.length > 0) {
                for (let i = shreds.length - 1; i >= 0; i--) {
                    const s = shreds[i];
                    s.y += s.vy;
                    s.x += s.vx;
                    s.vy += 0.1;
                    s.angle += s.rotSpeed;

                    ctx.save();
                    ctx.translate(s.x, s.y);
                    ctx.rotate(s.angle);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.fillRect(-s.width / 2, -s.height / 2, s.width, s.height);
                    ctx.restore();

                    if (s.y > height + 30) {
                        shreds.splice(i, 1);
                    }
                }
            }

            // === DRAW PRINTER BODY ===
            ctx.fillStyle = COLOR_PRINTER_BODY;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(printerLeft, printerTop, printerWidth, printerHeight, [0, 0, 14, 14]);
            ctx.fill();
            ctx.stroke();

            // Top edge / slot
            ctx.fillStyle = COLOR_PRINTER_ACCENT;
            ctx.fillRect(printerLeft, printerTop, printerWidth, 10);

            // Paper slot opening
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(printerLeft + printerWidth * 0.1, printerTop, printerWidth * 0.8, 6);

            // Bottom panel
            ctx.fillStyle = COLOR_PRINTER_ACCENT;
            ctx.beginPath();
            ctx.roundRect(printerLeft + 12, printerTop + printerHeight - 35, printerWidth - 24, 25, 5);
            ctx.fill();
            ctx.stroke();

            // LED indicators
            const ledY = printerTop + printerHeight - 22;
            const COLOR_LED = '#FFFFFF';
            ctx.fillStyle = COLOR_LED;
            ctx.shadowColor = COLOR_LED;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(printerLeft + 35, ledY, 5, 0, Math.PI * 2);
            ctx.fill();

            // Activity LED
            const isActive = phase === 'printing' && Math.floor(now / 150) % 2 === 0;
            ctx.fillStyle = isActive ? COLOR_ACCENT : `${COLOR_ACCENT}40`;
            ctx.shadowColor = isActive ? COLOR_ACCENT : 'transparent';
            ctx.shadowBlur = isActive ? 8 : 0;
            ctx.beginPath();
            ctx.arc(printerLeft + 60, ledY, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;

            // Label
            ctx.font = 'bold 11px "JetBrains Mono", monospace';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText('INTEL BRIEF', width / 2, printerTop + printerHeight - 18);
            ctx.textAlign = 'left';

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [moduleName]);

    useEffect(() => {
        if (isComplete) {
            onComplete();
        }
    }, [isComplete, onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
            <div className="flex flex-col items-center gap-6">
                <canvas ref={canvasRef} style={{ width: '320px', height: '500px' }} />
                <p className="text-white text-sm font-mono animate-pulse">
                    LOADING {moduleName.toUpperCase()}...
                </p>
            </div>
        </div>
    );
};

export default PrinterIntro;

import React, { useEffect, useRef } from 'react';

const DossierScanner: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 300;
        let height = 300;

        // Colors
        const COLOR_AMBER = '#F59E0B';
        const COLOR_DIM = 'rgba(245, 158, 11, 0.1)';
        const COLOR_TEXT = 'rgba(245, 158, 11, 0.6)';
        const COLOR_SCAN = 'rgba(245, 158, 11, 0.8)';

        // Document properties
        const docPadding = 40;
        let docLeft = 0;
        let docRight = 0;
        let docTop = 0;
        let docBottom = 0;

        // Scan line
        let scanY = 0;
        const SCAN_SPEED = 1.5;

        // Text lines (simulated document content)
        interface TextLine {
            y: number;
            width: number;
            isRedacted: boolean;
            revealed: number; // 0-1
            text: string;
        }
        let textLines: TextLine[] = [];

        // Sample data fragments
        const dataFragments = [
            'SUBJECT: ANAND FRANCIS',
            'STATUS: ACTIVE',
            'CLEARANCE: SEC+',
            '> BYU-IDAHO // 2023-PRESENT',
            '> DELL // 2019-2023',
            '> GOOGLE // 2017-2019',
            'SKILLS: [REDACTED]',
            'THREAT LVL: LOW',
            'TRUST SCORE: 100%',
        ];

        const initDocument = () => {
            docLeft = docPadding;
            docRight = width - docPadding;
            docTop = docPadding;
            docBottom = height - docPadding;

            textLines = [];
            const lineHeight = 22;
            const startY = docTop + 38;

            for (let i = 0; i < dataFragments.length; i++) {
                const y = startY + i * lineHeight;
                if (y > docBottom - 20) break;

                const text = dataFragments[i];
                textLines.push({
                    y,
                    width: 0.4 + Math.random() * 0.5, // 40-90% of doc width
                    isRedacted: false,
                    revealed: 0,
                    text: text
                });
            }

            scanY = docTop;
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update scan position
            scanY += SCAN_SPEED;
            if (scanY > docBottom + 30) {
                scanY = docTop - 30;
                // Reset reveals
                textLines.forEach(line => line.revealed = 0);
            }

            // Update text line reveals
            textLines.forEach(line => {
                const dist = Math.abs(line.y - scanY);
                if (dist < 15) {
                    line.revealed = Math.min(1, line.revealed + 0.2);
                } else if (scanY > line.y) {
                    line.revealed = Math.max(0.3, line.revealed - 0.01); // Fade but stay partially visible
                }
            });

            // 1. Draw document outline (folder/file shape)
            ctx.strokeStyle = COLOR_DIM;
            ctx.lineWidth = 1;

            // Main rectangle
            ctx.beginPath();
            ctx.rect(docLeft, docTop, docRight - docLeft, docBottom - docTop);
            ctx.stroke();

            // Folder tab at top-left
            const tabWidth = 60;
            const tabHeight = 15;
            ctx.beginPath();
            ctx.moveTo(docLeft, docTop);
            ctx.lineTo(docLeft, docTop - tabHeight);
            ctx.lineTo(docLeft + tabWidth, docTop - tabHeight);
            ctx.lineTo(docLeft + tabWidth + 10, docTop);
            ctx.stroke();

            // Corner fold (top-right)
            const foldSize = 15;
            ctx.beginPath();
            ctx.moveTo(docRight - foldSize, docTop);
            ctx.lineTo(docRight, docTop + foldSize);
            ctx.stroke();

            // 2. Draw text lines
            textLines.forEach((line, i) => {
                const lineLeft = docLeft + 15;
                const lineWidth = (docRight - docLeft - 30) * line.width;

                if (line.isRedacted) {
                    // Redacted block
                    ctx.fillStyle = `rgba(245, 158, 11, ${0.1 + line.revealed * 0.4})`;
                    ctx.fillRect(lineLeft, line.y - 8, lineWidth, 12);

                    // Strikethrough
                    ctx.strokeStyle = `rgba(245, 158, 11, ${0.3 + line.revealed * 0.5})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(lineLeft, line.y - 2);
                    ctx.lineTo(lineLeft + lineWidth, line.y - 2);
                    ctx.stroke();
                } else {
                    // Normal text line
                    if (line.revealed > 0.1) {
                        ctx.font = '11px monospace';
                        ctx.fillStyle = `rgba(245, 158, 11, ${line.revealed * 0.9})`;
                        ctx.fillText(line.text, lineLeft, line.y);
                    } else {
                        // Dim placeholder bar
                        ctx.fillStyle = COLOR_DIM;
                        ctx.fillRect(lineLeft, line.y - 6, lineWidth, 2);
                    }
                }
            });

            // 3. Draw scan line
            if (scanY >= docTop - 10 && scanY <= docBottom + 10) {
                // Glow effect
                const gradient = ctx.createLinearGradient(docLeft, scanY - 20, docLeft, scanY + 5);
                gradient.addColorStop(0, 'rgba(245, 158, 11, 0)');
                gradient.addColorStop(0.7, 'rgba(245, 158, 11, 0.3)');
                gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(docLeft, scanY - 20, docRight - docLeft, 25);

                // Main scan line
                ctx.shadowBlur = 10;
                ctx.shadowColor = COLOR_AMBER;
                ctx.strokeStyle = COLOR_SCAN;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(docLeft - 5, scanY);
                ctx.lineTo(docRight + 5, scanY);
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // 4. Classification stamp (top-right) - PUBLIC
            ctx.save();
            ctx.translate(docRight - 45, docTop + 40);
            ctx.rotate(-0.2);
            ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)'; // Green
            ctx.lineWidth = 2;
            ctx.strokeRect(-30, -12, 60, 24);
            ctx.font = 'bold 11px monospace';
            ctx.fillStyle = 'rgba(34, 197, 94, 0.6)';
            ctx.fillText('PUBLIC', -22, 4);
            ctx.restore();

            // 5. Header text
            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = COLOR_AMBER;
            ctx.fillText('PERSONNEL FILE', docLeft + 15, docTop + 18);

            animationFrameId = requestAnimationFrame(draw);
        };

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            if (entry) {
                width = entry.contentRect.width;
                height = entry.contentRect.height;
                canvas.width = width;
                canvas.height = height;
                initDocument();
            }
        });

        if (canvas.parentElement) {
            observer.observe(canvas.parentElement);
        }

        initDocument();
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default DossierScanner;

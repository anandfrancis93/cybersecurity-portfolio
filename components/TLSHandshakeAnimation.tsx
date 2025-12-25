import React, { useEffect, useRef } from 'react';

const TLSHandshakeAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 320;
        let height = 260;

        // Colors
        const COLOR_ACCENT = '#E11D48';
        const COLOR_SUCCESS = '#22C55E';
        const COLOR_TEXT = 'rgba(255, 255, 255, 0.8)';
        const COLOR_DIM = 'rgba(255, 255, 255, 0.4)';

        // Animation state
        let lastCycleTime = 0;

        // Terminal lines
        const lines = [
            { text: '$ send_message', delay: 0, duration: 500 },
            { text: '> Composing message...', delay: 1000, duration: 600, hasProgress: true, progressDelay: 1600 },
            { text: '> Encrypting with AES-256...', delay: 2800, duration: 700, hasProgress: true, progressDelay: 3500 },
            { text: '> Signing payload...', delay: 4700, duration: 500, hasProgress: true, progressDelay: 5200 },
            { text: '> Establishing secure channel...', delay: 6200, duration: 600, hasCheck: true, checkDelay: 6800 },
            { text: '> Transmitting...', delay: 7400, duration: 500, hasProgress: true, progressDelay: 7900 },
            { text: '', delay: 8800, duration: 0 },
            { text: '✓ Message delivered securely', delay: 8900, duration: 600, isSuccess: true },
        ];

        const resetAnimation = () => {
            lastCycleTime = performance.now();
        };

        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            if (canvas.width !== width * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }

            ctx.clearRect(0, 0, width, height);

            const now = performance.now();
            const elapsed = now - lastCycleTime;

            // === DRAW TERMINAL BACKGROUND ===
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(10, 10, width - 20, height - 20, 6);
            ctx.fill();
            ctx.stroke();

            // Terminal header bar
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.beginPath();
            ctx.roundRect(10, 10, width - 20, 25, [6, 6, 0, 0]);
            ctx.fill();

            // Terminal dots
            const dotColors = ['#FF5F56', '#FFBD2E', '#27CA3E'];
            dotColors.forEach((color, i) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(28 + i * 18, 23, 5, 0, Math.PI * 2);
                ctx.fill();
            });

            // Terminal title
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillStyle = COLOR_DIM;
            ctx.textAlign = 'center';
            ctx.fillText('secure_mail.sh', width / 2, 27);

            // === DRAW TERMINAL LINES ===
            const lineHeight = 20;
            const startY = 55;
            const startX = 22;

            lines.forEach((line, index) => {
                if (elapsed < line.delay) return;

                const lineElapsed = elapsed - line.delay;
                const y = startY + index * lineHeight;

                // Typing effect
                const charsToShow = Math.min(
                    line.text.length,
                    Math.floor(lineElapsed / (line.duration / line.text.length))
                );
                const displayText = line.text.substring(0, charsToShow);

                // Set text style
                ctx.font = '11px "JetBrains Mono", monospace';
                ctx.textAlign = 'left';

                if (line.text.startsWith('$')) {
                    ctx.fillStyle = COLOR_ACCENT;
                } else if (line.isSuccess) {
                    ctx.fillStyle = COLOR_SUCCESS;
                } else {
                    ctx.fillStyle = COLOR_TEXT;
                }

                ctx.fillText(displayText, startX, y);

                // Cursor blink (on current typing line)
                const isCurrentLine = charsToShow < line.text.length && charsToShow > 0;
                if (isCurrentLine && Math.floor(elapsed / 500) % 2 === 0) {
                    const cursorX = startX + ctx.measureText(displayText).width;
                    ctx.fillStyle = COLOR_TEXT;
                    ctx.fillRect(cursorX + 2, y - 10, 7, 12);
                }

                // Progress bar
                if (line.hasProgress && elapsed > line.progressDelay) {
                    const progressElapsed = elapsed - line.progressDelay;
                    const progressDuration = 800;
                    const progress = Math.min(1, progressElapsed / progressDuration);

                    const barX = startX + ctx.measureText(line.text).width + 10;
                    const barY = y - 8;
                    const barWidth = 50;
                    const barHeight = 8;

                    // Bar background
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.beginPath();
                    ctx.roundRect(barX, barY, barWidth, barHeight, 2);
                    ctx.fill();

                    // Bar fill
                    ctx.fillStyle = progress === 1 ? COLOR_SUCCESS : COLOR_ACCENT;
                    ctx.beginPath();
                    ctx.roundRect(barX, barY, barWidth * progress, barHeight, 2);
                    ctx.fill();

                    // Checkmark when complete
                    if (progress === 1) {
                        ctx.fillStyle = COLOR_SUCCESS;
                        ctx.font = '9px "JetBrains Mono", monospace';
                        ctx.fillText('✓', barX + barWidth + 8, y);
                    }
                }

                // Checkmark (for lines with hasCheck)
                if (line.hasCheck && elapsed > line.checkDelay) {
                    const checkX = startX + ctx.measureText(line.text).width + 10;
                    ctx.fillStyle = COLOR_SUCCESS;
                    ctx.font = '11px "JetBrains Mono", monospace';
                    ctx.fillText('✓', checkX, y);
                }
            });

            // === BLINKING CURSOR AT END ===
            const allLinesComplete = elapsed > 9500;
            if (allLinesComplete && Math.floor(elapsed / 600) % 2 === 0) {
                const lastLineY = startY + 8 * lineHeight;
                ctx.fillStyle = COLOR_SUCCESS;
                ctx.fillRect(startX, lastLineY - 10, 7, 12);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Listen for global scramble to reset animation
        const handleGlobalScramble = () => {
            resetAnimation();
        };
        window.addEventListener('globalScramble', handleGlobalScramble);

        resetAnimation();
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('globalScramble', handleGlobalScramble);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas ref={canvasRef} className="relative z-10" />
        </div>
    );
};

export default TLSHandshakeAnimation;

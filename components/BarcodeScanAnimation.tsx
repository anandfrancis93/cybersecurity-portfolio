import React, { useEffect, useRef } from 'react';

// Top Card Canvas - Barcode
const TopCardCanvas: React.FC<{ startTimeRef: React.RefObject<number> }> = ({ startTimeRef }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const width = 280;
        const height = 140;

        const COLOR_PRIMARY = '#22D3EE';
        const COLOR_RED = '#EF4444';

        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            if (canvas.width !== width * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }

            const now = performance.now();
            let elapsed = now - startTimeRef.current;
            if (elapsed > 10000) {
                startTimeRef.current = now;
                elapsed = 0;
            }

            ctx.clearRect(0, 0, width, height);

            const ACTIVE_DURATION = 6000;
            const isActive = elapsed < ACTIVE_DURATION;
            const progress = isActive ? (elapsed / ACTIVE_DURATION) : 1;

            // Background
            ctx.fillStyle = '#0F0F0F';
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.fillRect(0, 0, width, height);
            ctx.strokeRect(0, 0, width, height);

            // Header
            ctx.fillStyle = COLOR_PRIMARY;
            ctx.fillRect(0, 0, width, 20);
            ctx.fillStyle = '#111';
            ctx.font = 'bold 9px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('ASSET ID', width / 2, 10);

            // Barcode
            const barcodeW = width - 40;
            const barcodeH = 35;
            const barcodeX = 20;
            const barcodeY = 30;

            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            const seed = 54321;
            for (let i = 0; i < 50; i++) {
                const barW = (Math.sin(seed + i * 40) + 1.5) * 1.5;
                const xPos = barcodeX + (i * (barcodeW / 50));
                if (xPos + barW < barcodeX + barcodeW) {
                    ctx.fillRect(xPos, barcodeY, barW, barcodeH);
                }
            }

            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillText('AST-AF-2026', width / 2, barcodeY + barcodeH + 12);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px "JetBrains Mono", monospace';
            ctx.fillText('ANAND FRANCIS', width / 2, barcodeY + barcodeH + 35);
            ctx.fillStyle = COLOR_PRIMARY;
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillText('COMPTIA SECURITY+', width / 2, barcodeY + barcodeH + 50);

            // Laser
            if (isActive) {
                const scanEnd = 0.8;
                if (progress < scanEnd) {
                    const scanPhase = progress / scanEnd;
                    const laserY = (Math.sin(scanPhase * Math.PI * 4 - Math.PI / 2) * 0.5 + 0.5) * height;

                    ctx.shadowColor = COLOR_RED;
                    ctx.shadowBlur = 15;
                    ctx.strokeStyle = COLOR_RED;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-20, laserY);
                    ctx.lineTo(width + 20, laserY);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationFrameId);
    }, [startTimeRef]);

    return <canvas ref={canvasRef} className="block" />;
};

// Bottom Card Canvas - Data Screen
const BottomCardCanvas: React.FC<{ startTimeRef: React.RefObject<number> }> = ({ startTimeRef }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const width = 320;
        const height = 200;

        const COLOR_PRIMARY = '#22D3EE';
        const COLOR_SUCCESS = '#22C55E';
        const COLOR_RED = '#EF4444';
        const COLOR_DIM = 'rgba(34, 211, 238, 0.2)';
        const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

        const lineItems = [
            { label: 'ASSET ID', value: 'AST-AF-2026' },
            { label: 'OWNER', value: 'ANAND FRANCIS' },
            { label: 'EXPERIENCE', value: '10+ YEARS' },
            { label: 'CERTIFICATIONS', value: 'SEC+, ITF+' },
            { label: 'PROJECTS', value: '4 DEPLOYED' },
            { label: 'ROLE', value: 'AI RSRCH ASST' },
            { label: 'CERT TIER', value: 'LVL 1 / BEGINNER' },
            { label: 'STATUS', value: 'ACTIVE' },
        ];

        const getRandomChar = (seed: number) => {
            const index = Math.floor(Math.sin(seed) * GLITCH_CHARS.length);
            return GLITCH_CHARS[Math.abs(index) % GLITCH_CHARS.length];
        };

        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            if (canvas.width !== width * dpr) {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);
            }

            const now = performance.now();
            let elapsed = now - startTimeRef.current;
            if (elapsed > 10000) {
                startTimeRef.current = now;
                elapsed = 0;
            }

            ctx.clearRect(0, 0, width, height);

            const ACTIVE_DURATION = 6000;
            const isActive = elapsed < ACTIVE_DURATION;
            const progress = isActive ? (elapsed / ACTIVE_DURATION) : 1;
            const timeStep = Math.floor(now / 40);

            // Background
            ctx.fillStyle = 'rgba(10, 10, 15, 0.98)';
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.fillRect(0, 0, width, height);

            if (isActive) {
                ctx.strokeStyle = COLOR_DIM;
                ctx.strokeRect(0, 0, width, height);
            } else {
                ctx.strokeRect(0, 0, width, height);
            }

            // Screen Items
            const startItemY = 20;
            const rowH = 20;
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.textBaseline = 'middle';

            lineItems.forEach((item, idx) => {
                const rowTop = startItemY + idx * rowH;
                const textY = rowTop + rowH / 2; // Center text vertically in row
                const itemStartP = 0.05 + (idx * 0.08);
                const itemEndP = itemStartP + 0.15;

                let showItem = true;
                let isScrambling = false;

                if (isActive) {
                    if (progress < itemStartP) showItem = false;
                    if (progress >= itemStartP && progress < itemEndP) isScrambling = true;
                }

                if (!showItem) return;

                // Striped background
                if (idx % 2 === 0) {
                    ctx.fillStyle = 'rgba(255,255,255,0.03)';
                    ctx.fillRect(5, rowTop, width - 10, rowH);
                }

                ctx.textAlign = 'left';
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.fillText(item.label, 15, textY);

                ctx.textAlign = 'right';
                let displayText = item.value;
                if (isScrambling) {
                    displayText = item.value.split('').map((char, charIdx) => {
                        if (char === ' ') return ' ';
                        return getRandomChar(timeStep + idx * 100 + charIdx);
                    }).join('');
                    ctx.fillStyle = COLOR_PRIMARY;
                } else {
                    ctx.fillStyle = item.label === 'STATUS' ? COLOR_SUCCESS : COLOR_PRIMARY;
                }
                ctx.fillText(displayText, width - 15, textY);
            });

            // Status Bar
            const statusY = height - 12;
            ctx.textAlign = 'center';
            if (isActive) {
                const scanEnd = 0.8;
                if (progress < scanEnd) {
                    ctx.fillStyle = COLOR_RED;
                    const dots = '.'.repeat(Math.floor((elapsed % 1000) / 250));
                    ctx.fillText(`/// ENUMERATING ASSET${dots} ///`, width / 2, statusY);
                } else {
                    ctx.fillStyle = COLOR_SUCCESS;
                    ctx.fillText('✓ SCAN COMPLETE', width / 2, statusY);
                }
            } else {
                ctx.fillStyle = COLOR_SUCCESS;
                ctx.fillText('✓ INVENTORY UPDATED & VERIFIED', width / 2, statusY);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationFrameId);
    }, [startTimeRef]);

    return <canvas ref={canvasRef} className="block" />;
};

// Main Component
const BarcodeScanAnimation: React.FC = () => {
    const startTimeRef = useRef(performance.now());

    useEffect(() => {
        const handleSync = () => { startTimeRef.current = performance.now(); };
        window.addEventListener('secTermChange', handleSync);
        return () => window.removeEventListener('secTermChange', handleSync);
    }, []);

    return (
        <div className="relative flex flex-col items-center gap-5">
            {/* Top Card - Barcode */}
            <div className="relative">
                <TopCardCanvas startTimeRef={startTimeRef} />
                {/* Glass overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
                        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1)'
                    }}
                />
            </div>

            {/* Bottom Card - Data Screen */}
            <div className="relative">
                <BottomCardCanvas startTimeRef={startTimeRef} />
                {/* Glass overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)',
                        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.08)'
                    }}
                />
            </div>
        </div>
    );
};

export default BarcodeScanAnimation;

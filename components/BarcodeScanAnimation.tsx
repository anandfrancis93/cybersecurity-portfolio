import React, { useEffect, useRef } from 'react';

// Animation #2: Barcode Scan - Extended Data Screen
const BarcodeScanAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const startTimeRef = useRef(performance.now());

    useEffect(() => {
        const handleSync = () => { startTimeRef.current = performance.now(); };
        window.addEventListener('secTermChange', handleSync);
        return () => window.removeEventListener('secTermChange', handleSync);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const width = 400;
        const height = 400;
        const centerX = width / 2;

        const COLOR_PRIMARY = '#22D3EE';
        const COLOR_RED = '#EF4444';
        const COLOR_SUCCESS = '#22C55E';
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
            if (elapsed > 10000) { startTimeRef.current = now; elapsed = 0; }

            ctx.clearRect(0, 0, width, height);

            const ACTIVE_DURATION = 6000;
            const isActive = elapsed < ACTIVE_DURATION;
            const progress = isActive ? (elapsed / ACTIVE_DURATION) : 1;
            const timeStep = Math.floor(now / 40);

            // --- 1. Top Section: Label & Barcode ---
            const labelW = 280;
            const labelH = 140; // Slightly shorter to make room for screen
            const labelX = (width - labelW) / 2;
            const labelY = 15; // Raised higher

            // Clean Flat Dark Background
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#0F0F0F';
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(labelX, labelY, labelW, labelH, 4);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Header
            ctx.fillStyle = COLOR_PRIMARY;
            ctx.fillRect(labelX, labelY, labelW, 20);
            ctx.fillStyle = '#111';
            ctx.font = 'bold 9px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('ASSET ID', centerX, labelY + 10);

            // Barcode
            const barcodeW = labelW - 40;
            const barcodeH = 35;
            const barcodeX = labelX + 20;
            const barcodeY = labelY + 30;

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
            ctx.fillText('AST-AF-2026', centerX, barcodeY + barcodeH + 12);

            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px "JetBrains Mono", monospace';
            ctx.fillText('ANAND FRANCIS', centerX, barcodeY + barcodeH + 40);
            ctx.fillStyle = COLOR_PRIMARY;
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillText('COMPTIA SECURITY+', centerX, barcodeY + barcodeH + 55);


            // --- 2. Laser ---
            if (isActive) {
                const scanEnd = 0.8;
                if (progress < scanEnd) {
                    const scanPhase = progress / scanEnd;
                    const laserY = labelY + (Math.sin(scanPhase * Math.PI * 4 - Math.PI / 2) * 0.5 + 0.5) * labelH;

                    ctx.shadowColor = COLOR_RED;
                    ctx.shadowBlur = 15;
                    ctx.strokeStyle = COLOR_RED;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(labelX - 20, laserY);
                    ctx.lineTo(labelX + labelW + 20, laserY);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }


            // --- 3. Bottom Screen (Extended Height) ---
            const screenW = width - 80; // 320px
            const screenH = 200; // Taller for more items
            const screenX = (width - screenW) / 2;
            const screenY = 180; // Starts higher

            ctx.fillStyle = 'rgba(10, 10, 15, 0.95)';
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(screenX, screenY, screenW, screenH, 4);
            ctx.fill();

            if (isActive) {
                ctx.strokeStyle = COLOR_DIM;
                ctx.stroke();
            } else {
                ctx.stroke();
            }

            // Screen Items
            const startItemY = screenY + 25;
            const rowH = 19; // Slightly tighter spacing
            ctx.font = '10px "JetBrains Mono", monospace';

            lineItems.forEach((item, idx) => {
                const y = startItemY + idx * rowH;
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
                    ctx.fillRect(screenX + 5, y - 10, screenW - 10, rowH);
                }

                ctx.textAlign = 'left';
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.fillText(item.label, screenX + 15, y);

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
                ctx.fillText(displayText, screenX + screenW - 15, y);
            });

            // Status Bar at very bottom
            const statusY = screenY + screenH - 12;
            ctx.textAlign = 'center';
            if (isActive) {
                const scanEnd = 0.8;
                if (progress < scanEnd) {
                    ctx.fillStyle = COLOR_RED;
                    const dots = '.'.repeat(Math.floor((elapsed % 1000) / 250));
                    ctx.fillText(`/// ENUMERATING ASSET${dots} ///`, centerX, statusY);
                } else {
                    ctx.fillStyle = COLOR_SUCCESS;
                    ctx.fillText('✓ SCAN COMPLETE', centerX, statusY);
                }
            } else {
                ctx.fillStyle = COLOR_SUCCESS;
                ctx.fillText('✓ INVENTORY UPDATED & VERIFIED', centerX, statusY);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas ref={canvasRef} className="relative z-10" />
        </div>
    );
};

export default BarcodeScanAnimation;

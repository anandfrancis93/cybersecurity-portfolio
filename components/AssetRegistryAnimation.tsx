import React, { useEffect, useRef } from 'react';

const AssetRegistryAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const width = 320;
        const height = 320;

        // Colors
        const COLOR_PRIMARY = '#10B981'; // Emerald green (Asset color)
        const COLOR_DIM = 'rgba(16, 185, 129, 0.2)';
        const COLOR_ACCENT = 'rgba(16, 185, 129, 0.6)';
        const COLOR_TEXT = 'rgba(255, 255, 255, 0.8)';
        const COLOR_SUBTEXT = 'rgba(255, 255, 255, 0.4)';

        // Asset items to display
        const assets = [
            { id: 'AST-001', name: 'Identity', type: 'PERSON', status: 'VERIFIED' },
            { id: 'AST-002', name: 'Skills', type: 'CAPABILITY', status: 'CATALOGUED' },
            { id: 'AST-003', name: 'Experience', type: 'HISTORY', status: 'VERIFIED' },
            { id: 'AST-004', name: 'Certifications', type: 'CREDENTIAL', status: 'ACTIVE' },
            { id: 'AST-005', name: 'Projects', type: 'PORTFOLIO', status: 'INDEXED' },
            { id: 'AST-006', name: 'Education', type: 'ACADEMIC', status: 'VERIFIED' },
            { id: 'AST-007', name: 'Contact', type: 'ENDPOINT', status: 'SECURE' },
        ];

        let startTime = performance.now();

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
            const elapsed = performance.now() - startTime;

            // Header
            ctx.fillStyle = COLOR_PRIMARY;
            ctx.font = 'bold 11px "JetBrains Mono", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('ASSET REGISTRY', 20, 25);

            ctx.fillStyle = COLOR_SUBTEXT;
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.textAlign = 'right';
            ctx.fillText(`${assets.length} ITEMS`, width - 20, 25);

            // Header line
            ctx.strokeStyle = COLOR_DIM;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(20, 35);
            ctx.lineTo(width - 20, 35);
            ctx.stroke();

            // Column headers
            ctx.fillStyle = COLOR_SUBTEXT;
            ctx.font = '8px "JetBrains Mono", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('ID', 20, 50);
            ctx.fillText('ASSET', 75, 50);
            ctx.fillText('TYPE', 160, 50);
            ctx.fillText('STATUS', 240, 50);

            // Scanning animation
            const scanCycle = (elapsed % 8000) / 8000;
            const currentScanIndex = Math.floor(scanCycle * assets.length);

            // Asset rows
            const rowHeight = 32;
            const startY = 60;

            assets.forEach((asset, idx) => {
                const y = startY + idx * rowHeight;
                const isScanning = idx === currentScanIndex;
                const isScanned = idx < currentScanIndex || scanCycle > 0.99;

                // Row background
                if (isScanning) {
                    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
                    ctx.fillRect(15, y - 2, width - 30, rowHeight - 4);

                    // Scan line moving across
                    const scanLineProgress = (elapsed % 1000) / 1000;
                    const scanLineX = 15 + (width - 30) * scanLineProgress;
                    ctx.strokeStyle = COLOR_PRIMARY;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(scanLineX, y - 2);
                    ctx.lineTo(scanLineX, y + rowHeight - 6);
                    ctx.stroke();
                }

                // Row border
                ctx.strokeStyle = isScanned ? COLOR_ACCENT : COLOR_DIM;
                ctx.lineWidth = 1;
                ctx.strokeRect(15, y - 2, width - 30, rowHeight - 4);

                // Typewriter effect for scanned items
                const textAlpha = isScanned ? 1 : (isScanning ? 0.6 : 0.3);

                // ID
                ctx.fillStyle = `rgba(16, 185, 129, ${textAlpha})`;
                ctx.font = '9px "JetBrains Mono", monospace';
                ctx.textAlign = 'left';
                if (isScanned || isScanning) {
                    ctx.fillText(asset.id, 20, y + 15);
                } else {
                    ctx.fillText('---', 20, y + 15);
                }

                // Name
                ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha})`;
                ctx.font = 'bold 10px "JetBrains Mono", monospace';
                if (isScanned || isScanning) {
                    ctx.fillText(asset.name, 75, y + 15);
                } else {
                    ctx.fillText('████', 75, y + 15);
                }

                // Type
                ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha * 0.6})`;
                ctx.font = '8px "JetBrains Mono", monospace';
                if (isScanned || isScanning) {
                    ctx.fillText(asset.type, 160, y + 15);
                } else {
                    ctx.fillText('----', 160, y + 15);
                }

                // Status with checkmark
                if (isScanned) {
                    ctx.fillStyle = COLOR_PRIMARY;
                    ctx.font = '9px "JetBrains Mono", monospace';
                    ctx.fillText('✓ ' + asset.status, 240, y + 15);
                } else if (isScanning) {
                    // Blinking "SCANNING"
                    const blink = Math.sin(elapsed / 100) > 0;
                    ctx.fillStyle = blink ? COLOR_PRIMARY : 'transparent';
                    ctx.fillText('SCANNING...', 240, y + 15);
                } else {
                    ctx.fillStyle = COLOR_SUBTEXT;
                    ctx.fillText('PENDING', 240, y + 15);
                }
            });

            // Footer
            ctx.strokeStyle = COLOR_DIM;
            ctx.beginPath();
            ctx.moveTo(20, height - 40);
            ctx.lineTo(width - 20, height - 40);
            ctx.stroke();

            // Progress bar
            const progressWidth = (width - 40) * scanCycle;
            ctx.fillStyle = COLOR_DIM;
            ctx.fillRect(20, height - 30, width - 40, 6);
            ctx.fillStyle = COLOR_PRIMARY;
            ctx.fillRect(20, height - 30, progressWidth, 6);

            // Progress text
            ctx.fillStyle = COLOR_SUBTEXT;
            ctx.font = '8px "JetBrains Mono", monospace';
            ctx.textAlign = 'left';
            ctx.fillText('INVENTORY SCAN', 20, height - 10);
            ctx.textAlign = 'right';
            ctx.fillStyle = COLOR_PRIMARY;
            ctx.fillText(`${Math.floor(scanCycle * 100)}%`, width - 20, height - 10);

            animationFrameId = requestAnimationFrame(draw);
        };

        startTime = performance.now();
        animationFrameId = requestAnimationFrame(draw);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas ref={canvasRef} className="relative z-10" />
        </div>
    );
};

export default AssetRegistryAnimation;

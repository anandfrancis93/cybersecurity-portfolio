import React, { useEffect, useRef, useState } from 'react';

const OscilloscopeAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [metrics, setMetrics] = useState({
        cpu: 0,
        mem: 0,
        latency: 24,
        pktLoss: 0.00,
        threads: 42,
        status: 'MONITORING'
    });

    // We use a ref for the rapid-fire metrics to avoid react re-render overhead on every frame for the text
    // But since we want to render them in standard DOM for easy styling, we'll throttle the React state updates
    // or we can draw them on canvas. Drawing on canvas fits the "oscilloscope" vibe better, but DOM text is sharper.
    // Let's stick to DOM but update state less frequently than 60fps, maybe 10fps.

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const points: number[] = [];
        const maxPoints = 400;

        for (let i = 0; i < maxPoints; i++) {
            points.push(0);
        }

        let tick = 0;
        let nextBeat = 100;
        let beatPhase = 0;
        let spikeActive = false;
        let spikeFrame = 0;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const dpr = window.devicePixelRatio || 1;
                canvas.width = parent.clientWidth * dpr;
                canvas.height = parent.clientHeight * dpr;
                ctx.scale(dpr, dpr);
                canvas.style.width = `${parent.clientWidth}px`;
                canvas.style.height = `${parent.clientHeight}px`;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const render = () => {
            if (!canvas || !ctx) return;

            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);

            // --- METRICS UPDATE LOGIC ---
            // Update UI metrics every 10 ticks (~6 times/sec) for that "rapid fire" data look without killing React
            if (tick % 10 === 0) {
                const isAnomaly = spikeActive;
                setMetrics({
                    cpu: Math.floor(12 + Math.random() * (isAnomaly ? 60 : 8)),
                    mem: Math.floor(32 + Math.random() * 2),
                    latency: Math.floor(20 + Math.random() * 15 + (isAnomaly ? 200 : 0)),
                    pktLoss: isAnomaly ? parseFloat((Math.random() * 5).toFixed(2)) : 0.00,
                    threads: 142 + Math.floor(Math.random() * 5),
                    status: isAnomaly ? 'ANOMALY DETECTED' : 'NORMAL'
                });
            }

            // --- GENERATE VALUES ---
            let value = 0;

            if (!spikeActive && Math.random() < 0.005) {
                spikeActive = true;
            }

            if (spikeActive) {
                spikeFrame++;
                value = (Math.random() - 0.5) * 150;

                if (spikeFrame > 60) {
                    spikeActive = false;
                    spikeFrame = 0;
                    beatPhase = 0;
                    tick = 0;
                }
            } else {
                if (tick >= nextBeat) {
                    beatPhase++;
                    if (beatPhase < 10) value = Math.sin(beatPhase * 0.3) * 10;
                    else if (beatPhase < 15) value = 0;
                    else if (beatPhase < 18) value = -20;
                    else if (beatPhase < 22) value = 120;
                    else if (beatPhase < 26) value = -40;
                    else if (beatPhase < 35) value = 0;
                    else if (beatPhase < 55) value = Math.sin((beatPhase - 35) * 0.15) * 15;
                    else {
                        beatPhase = 0;
                        tick = 0;
                        nextBeat = 60 + Math.random() * 40;
                    }
                }
                value += (Math.random() - 0.5) * 4;
            }

            points.shift();
            points.push(value);
            if (!spikeActive) tick++;

            // --- DRAWING ---
            ctx.clearRect(0, 0, width, height);

            // Grid
            ctx.strokeStyle = spikeActive ? 'rgba(239, 68, 68, 0.15)' : 'rgba(234, 179, 8, 0.08)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x < width; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
            for (let y = 0; y < height; y += 40) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
            ctx.stroke();

            // Line
            const centerY = height * 0.6;
            const stepX = width / (maxPoints - 1);

            ctx.beginPath();
            ctx.moveTo(0, centerY - points[0]);
            for (let i = 1; i < maxPoints; i++) {
                ctx.lineTo(i * stepX, centerY - points[i] * 0.8);
            }

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 2;
            ctx.strokeStyle = spikeActive ? '#ef4444' : '#eab308';
            ctx.shadowBlur = 8;
            ctx.shadowColor = spikeActive ? '#ef4444' : '#eab308';
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Leading Dot
            const lastX = width;
            const lastY = centerY - points[maxPoints - 1] * 0.8;
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
            ctx.beginPath();
            ctx.arc(lastX - 2, lastY, 3, 0, Math.PI * 2);
            ctx.fill();

            // Scanline Fade
            const gradient = ctx.createLinearGradient(0, 0, 100, 0);
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 100, height);

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const isAnomaly = metrics.status === 'ANOMALY DETECTED';

    return (
        <div className={`relative w-full h-full bg-black/40 border rounded-sm overflow-hidden backdrop-blur-sm transition-colors duration-200 ${isAnomaly ? 'border-red-500/50' : 'border-edition-border/50'}`}>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-nist-detect/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-nist-detect/50 to-transparent"></div>

            <canvas ref={canvasRef} className="w-full h-full opacity-90" />

            {/* Top Left Label */}
            <div className="absolute top-4 left-4 font-mono text-xs text-nist-detect/70 flex flex-col gap-1 pointer-events-none">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isAnomaly ? 'bg-red-500' : 'bg-nist-detect'}`}></span>
                    <span className={isAnomaly ? 'text-red-500 font-bold' : ''}>LIVE SIGNAL</span>
                </div>
                <div className="text-[10px] text-gray-500">CH-1: ANALOG INPUT</div>
            </div>

            {/* Bottom Right Data Readout - The "System Diagnostics" Feel */}
            <div className="absolute bottom-4 right-4 font-mono text-xs text-right pointer-events-none flex flex-col gap-1 bg-black/50 p-2 rounded border border-edition-border/30 backdrop-blur-md">
                <div className={`flex justify-between gap-4 border-b ${isAnomaly ? 'border-red-500/30' : 'border-edition-border/30'} pb-1 mb-1`}>
                    <span className="text-gray-500">STATUS</span>
                    <span className={`font-bold ${isAnomaly ? 'text-red-500 animate-pulse' : 'text-nist-detect'}`}>{metrics.status}</span>
                </div>

                <div className="flex justify-between gap-6">
                    <span className="text-gray-500">LATENCY</span>
                    <span className="text-gray-300 tabular-nums">{metrics.latency}ms</span>
                </div>
                <div className="flex justify-between gap-6">
                    <span className="text-gray-500">PKT LOSS</span>
                    <span className={`${metrics.pktLoss > 0 ? 'text-red-400' : 'text-gray-300'} tabular-nums`}>{metrics.pktLoss.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between gap-6">
                    <span className="text-gray-500">CPU LOAD</span>
                    <span className="text-gray-300 tabular-nums">{metrics.cpu}%</span>
                </div>
                <div className="flex justify-between gap-6">
                    <span className="text-gray-500">THREADS</span>
                    <span className="text-gray-300 tabular-nums">{metrics.threads}</span>
                </div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
        </div>
    );
};

export default OscilloscopeAnimation;

import React, { useEffect, useRef } from 'react';

const ClearanceVerifier: React.FC = () => {
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
        const COLOR_GREEN = '#22C55E';
        const COLOR_DIM = 'rgba(255, 255, 255, 0.15)';
        const COLOR_TEXT = 'rgba(255, 255, 255, 0.7)';
        const COLOR_BRIGHT = '#FFFFFF';

        // Actual certificate data (ordered by clearance level, lowest to highest)
        const certificates = [
            {
                name: 'Gemini Certified',
                issuer: 'Google',
                issued: 'Oct 2025',
                expires: 'Oct 2028',
                id: 'GOOG-GEM-7728',
                clearance: 'UNCLASSIFIED',
                clearanceColor: '#6B7280'
            },
            {
                name: 'CompTIA ITF+',
                issuer: 'CompTIA',
                issued: 'Jul 2025',
                expires: 'No Expiry',
                id: 'ZD0R8VDS8EE1SMXJ',
                clearance: 'SECRET',
                clearanceColor: '#F97316'
            },
            {
                name: 'CompTIA Security+',
                issuer: 'CompTIA',
                issued: 'Dec 2025',
                expires: 'Dec 2028',
                id: '03ef6fe3...',
                clearance: 'TOP SECRET',
                clearanceColor: '#22C55E'
            }
        ];

        // State - synced with globalScramble event
        let currentCertIndex = 0;
        let certStartTime = performance.now();
        let frameCount = 0;

        // When globalScramble fires, advance to next certificate
        const handleGlobalScramble = () => {
            currentCertIndex = (currentCertIndex + 1) % certificates.length;
            certStartTime = performance.now();
        };

        window.addEventListener('globalScramble', handleGlobalScramble);

        // Animation phases within a 10-second cycle
        const PHASE_DISPLAY = 1500;      // 0-1.5s: Display
        const PHASE_VALIDATE_END = 7900; // 1.5-7.9s: Validation (4 steps)
        const PHASE_RESULT_END = 9400;   // 7.9-9.4s: Result
        // 9.4-10s: Transition

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            frameCount++;

            const cert = certificates[currentCertIndex];
            const padding = 15;
            const docLeft = padding;
            const docRight = width - padding;
            const docTop = padding;
            const docBottom = height - padding;

            // Calculate phase based on time since cert started
            const certElapsed = performance.now() - certStartTime;
            let phase: 'display' | 'validate' | 'result' | 'transition';
            let validationStep = 0;
            let stepProgress = 0;

            if (certElapsed < PHASE_DISPLAY) {
                phase = 'display';
            } else if (certElapsed < PHASE_VALIDATE_END) {
                phase = 'validate';
                const validateElapsed = certElapsed - PHASE_DISPLAY;
                const stepDuration = (PHASE_VALIDATE_END - PHASE_DISPLAY) / 4;
                validationStep = Math.min(3, Math.floor(validateElapsed / stepDuration));
                stepProgress = (validateElapsed % stepDuration) / stepDuration;
            } else if (certElapsed < PHASE_RESULT_END) {
                phase = 'result';
                validationStep = 4;
            } else {
                phase = 'transition';
                validationStep = 4;
            }

            // Document background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(docLeft, docTop, docRight - docLeft, docBottom - docTop);

            // Border
            ctx.strokeStyle = phase === 'result' ? cert.clearanceColor : COLOR_DIM;
            ctx.lineWidth = 1;
            ctx.strokeRect(docLeft, docTop, docRight - docLeft, docBottom - docTop);

            // Header
            ctx.fillStyle = COLOR_GREEN;
            ctx.font = 'bold 11px monospace';
            ctx.fillText('▣ DIGITAL CERTIFICATE', docLeft + 10, docTop + 20);

            // Separator
            ctx.strokeStyle = COLOR_DIM;
            ctx.beginPath();
            ctx.moveTo(docLeft + 10, docTop + 30);
            ctx.lineTo(docRight - 10, docTop + 30);
            ctx.stroke();

            // Certificate details
            const lineHeight = 18;
            let y = docTop + 50;

            const drawField = (label: string, value: string, highlight: boolean = false) => {
                ctx.font = '10px monospace';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fillText(label, docLeft + 10, y);
                ctx.fillStyle = highlight ? COLOR_BRIGHT : COLOR_TEXT;
                ctx.fillText(value, docLeft + 70, y);
                y += lineHeight;
            };

            drawField('SUBJECT:', cert.name, true);
            drawField('ISSUER:', cert.issuer);
            drawField('ISSUED:', cert.issued);
            drawField('EXPIRES:', cert.expires);
            drawField('ID:', cert.id);

            // Separator
            y += 5;
            ctx.strokeStyle = COLOR_DIM;
            ctx.beginPath();
            ctx.moveTo(docLeft + 10, y);
            ctx.lineTo(docRight - 10, y);
            ctx.stroke();
            y += 15;

            // Validation progress bar
            const barWidth = docRight - docLeft - 20;
            const barHeight = 8;
            let progress = 0;
            if (phase === 'validate') {
                progress = (validationStep + stepProgress) / 4;
            } else if (phase === 'result' || phase === 'transition') {
                progress = 1;
            }

            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(docLeft + 10, y, barWidth, barHeight);

            ctx.fillStyle = COLOR_GREEN;
            ctx.shadowBlur = 5;
            ctx.shadowColor = COLOR_GREEN;
            ctx.fillRect(docLeft + 10, y, barWidth * progress, barHeight);
            ctx.shadowBlur = 0;

            // Validation status text
            ctx.font = '9px monospace';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            if (phase === 'display') {
                ctx.fillText('INITIALIZING...', docLeft + 10, y + barHeight + 12);
            } else if (phase === 'validate') {
                const steps = ['CHECKING SIGNATURE...', 'VERIFYING CHAIN...', 'CHECKING STATUS...', 'FINALIZING...'];
                ctx.fillText(steps[Math.min(validationStep, 3)], docLeft + 10, y + barHeight + 12);
            } else {
                ctx.fillStyle = COLOR_GREEN;
                ctx.fillText('VALIDATION COMPLETE', docLeft + 10, y + barHeight + 12);
            }

            y += barHeight + 25;

            // Separator
            ctx.strokeStyle = COLOR_DIM;
            ctx.beginPath();
            ctx.moveTo(docLeft + 10, y);
            ctx.lineTo(docRight - 10, y);
            ctx.stroke();
            y += 15;

            // Validation checks
            const checks = [
                { label: 'SIGNATURE', step: 0 },
                { label: 'CHAIN', step: 1 },
                { label: 'STATUS', step: 2 }
            ];

            checks.forEach(check => {
                const isComplete = validationStep > check.step;
                const isActive = validationStep === check.step && phase === 'validate';

                ctx.font = '10px monospace';

                if (isComplete) {
                    ctx.fillStyle = COLOR_GREEN;
                    ctx.fillText('✓', docLeft + 10, y);
                    ctx.fillText(`${check.label}: VALID`, docLeft + 25, y);
                } else if (isActive) {
                    const blink = Math.floor(frameCount / 8) % 2 === 0;
                    ctx.fillStyle = blink ? COLOR_BRIGHT : 'rgba(255,255,255,0.3)';
                    ctx.fillText('○', docLeft + 10, y);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.fillText(`${check.label}: CHECKING...`, docLeft + 25, y);
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.fillText('○', docLeft + 10, y);
                    ctx.fillText(`${check.label}: PENDING`, docLeft + 25, y);
                }
                y += lineHeight;
            });

            // Separator
            y += 5;
            ctx.strokeStyle = COLOR_DIM;
            ctx.beginPath();
            ctx.moveTo(docLeft + 10, y);
            ctx.lineTo(docRight - 10, y);
            ctx.stroke();
            y += 15;

            // Clearance level
            ctx.font = 'bold 11px monospace';
            if (phase === 'result' || phase === 'transition') {
                const blink = phase === 'result' && Math.floor(frameCount / 10) % 2 === 0;
                ctx.fillStyle = blink ? cert.clearanceColor : 'rgba(255,255,255,0.8)';
                ctx.shadowBlur = phase === 'result' ? 10 : 0;
                ctx.shadowColor = cert.clearanceColor;
                ctx.fillText(`▸ CLEARANCE: ${cert.clearance}`, docLeft + 10, y);
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.fillText('▸ CLEARANCE: PENDING', docLeft + 10, y);
            }

            // Certificate counter (bottom right)
            ctx.font = '9px monospace';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.textAlign = 'right';
            ctx.fillText(`${currentCertIndex + 1}/${certificates.length}`, docRight - 10, docBottom - 10);
            ctx.textAlign = 'left';

            animationFrameId = requestAnimationFrame(draw);
        };

        const dpr = window.devicePixelRatio || 1;

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            if (entry) {
                width = entry.contentRect.width;
                height = entry.contentRect.height;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.scale(dpr, dpr);
            }
        });

        if (canvas.parentElement) {
            observer.observe(canvas.parentElement);
            // Set initial size immediately
            const rect = canvas.parentElement.getBoundingClientRect();
            width = rect.width || 280;
            height = rect.height || 320;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
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

export default ClearanceVerifier;

import React, { useEffect, useRef } from 'react';

const DigitalImmuneSystem: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let rotationX = 0;
        let rotationY = 0;

        // Configuration
        const sphereRadius = 100;
        const nodeCount = 180;
        const connectionDistance = 40;

        interface Node3D {
            x: number;
            y: number;
            z: number;
            baseColor: string;
            currentColor: string;
            state: 'secure' | 'infected' | 'recovering';
            infectionTime: number;
            recoveryTime: number;
        }

        const nodes: Node3D[] = [];

        // Colors
        const COLOR_SECURE = '#3B82F6';   // Blue
        const COLOR_INFECTED = '#EF4444'; // Red
        const COLOR_RECOVERING = '#FFFFFF'; // White (flash)

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = canvas.parentElement?.clientWidth || 300;
            const height = canvas.parentElement?.clientHeight || 300;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };

        const initNodes = () => {
            nodes.length = 0;
            // Fibonacci Sphere distribution for even node placement
            const phi = Math.PI * (3 - Math.sqrt(5));

            for (let i = 0; i < nodeCount; i++) {
                const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
                const radius = Math.sqrt(1 - y * y);
                const theta = phi * i;

                const x = Math.cos(theta) * radius;
                const z = Math.sin(theta) * radius;

                nodes.push({
                    x: x * sphereRadius,
                    y: y * sphereRadius,
                    z: z * sphereRadius,
                    baseColor: COLOR_SECURE,
                    currentColor: COLOR_SECURE,
                    state: 'secure',
                    infectionTime: 0,
                    recoveryTime: 0
                });
            }
        };

        // Project 3D point to 2D
        const project = (x: number, y: number, z: number) => {
            // Rotate Y
            const cosY = Math.cos(rotationY);
            const sinY = Math.sin(rotationY);
            const x1 = x * cosY - z * sinY;
            const z1 = z * cosY + x * sinY;

            // Rotate X
            const cosX = Math.cos(rotationX);
            const sinX = Math.sin(rotationX);
            const y2 = y * cosX - z1 * sinX;
            const z2 = z1 * cosX + y * sinX;

            const fov = 300;
            const scale = fov / (fov + z2);

            return {
                x: x1 * scale + canvas.width / 2,
                y: y2 * scale + canvas.height / 2,
                scale: scale,
                z: z2 // Keep z for depth sorting/opacity
            };
        };

        const triggerInfection = () => {
            // Pick a random node to infect
            const targetIndex = Math.floor(Math.random() * nodes.length);
            const target = nodes[targetIndex];

            if (target.state === 'secure') {
                target.state = 'infected';
                target.currentColor = COLOR_INFECTED;
                target.infectionTime = 100; // Frames to stay infected or spread

                // Spread to neighbors immediately?
                // Or wait? Let's make it look like a splash
                const neighborIndices = findNeighbors(targetIndex, 3); // 3 closest
                neighborIndices.forEach(idx => {
                    if (Math.random() > 0.3) { // 70% chance to spread
                        nodes[idx].state = 'infected';
                        nodes[idx].currentColor = COLOR_INFECTED;
                        nodes[idx].infectionTime = 80 + Math.random() * 40;
                    }
                });
            }
        };

        const findNeighbors = (index: number, count: number): number[] => {
            const current = nodes[index];
            // Simple distance check (can be optimized but fine for <200 nodes)
            const dists = nodes.map((n, i) => {
                if (i === index) return { idx: i, dist: Infinity };
                const dx = n.x - current.x;
                const dy = n.y - current.y;
                const dz = n.z - current.z;
                return { idx: i, dist: dx * dx + dy * dy + dz * dz };
            });

            dists.sort((a, b) => a.dist - b.dist);
            return dists.slice(0, count).map(d => d.idx);
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            rotationY += 0.005;
            rotationX += 0.002;

            // Trigger Random Infection
            const currentInfectedCount = nodes.filter(n => n.state === 'infected').length;
            // Limit to ~3 simultaneous clusters (approx 4 nodes per cluster = 12 nodes max)
            if (Math.random() < 0.02 && currentInfectedCount < 12) {
                triggerInfection();
            }

            // Update Node States
            nodes.forEach(node => {
                if (node.state === 'infected') {
                    node.infectionTime--;
                    if (node.infectionTime <= 0) {
                        node.state = 'recovering';
                        node.currentColor = COLOR_RECOVERING;
                        node.recoveryTime = 20;
                    }
                } else if (node.state === 'recovering') {
                    node.recoveryTime--;
                    if (node.recoveryTime <= 0) {
                        node.state = 'secure';
                        node.currentColor = COLOR_SECURE;
                    }
                }
            });

            // Project all nodes first
            const projectedNodes = nodes.map(n => {
                const p = project(n.x, n.y, n.z);
                return { ...p, node: n };
            });

            // Draw Connections (Lines)
            // We only draw lines between close nodes in 3D space
            // Optimization: Only compute for nodes that are facing camera?
            ctx.globalCompositeOperation = 'screen';
            ctx.lineWidth = 1;

            for (let i = 0; i < nodes.length; i++) {
                const p1 = projectedNodes[i];
                if (p1.z < -200) continue; // Clip far back nodes slightly? Or just fade alpha

                // Find connections
                // To save CPU, we can pre-calculate neighbors or check distance 
                // Let's brute force nicely with a distance limit
                for (let j = i + 1; j < nodes.length; j++) {
                    const p2 = projectedNodes[j];

                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dz = nodes[i].z - nodes[j].z;
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < connectionDistance * connectionDistance) {
                        // Valid connection
                        // Valid connection
                        const alpha = Math.min(1, Math.max(0.1, (p1.scale - 0.5))) * 0.4;

                        let strokeColor = COLOR_SECURE;
                        let lineWidth = 0.5;

                        // Chaotic Glitch for infected connections
                        if (nodes[i].state === 'infected' || nodes[j].state === 'infected') {
                            strokeColor = Math.random() > 0.2 ? COLOR_INFECTED : '#FFFFFF'; // Mostly Red, occasional White flash
                            lineWidth = Math.random() * 3 + 0.5; // Random width jitter
                            // Removed expensive shadowBlur for performance
                        } else if (nodes[i].state === 'recovering' || nodes[j].state === 'recovering') {
                            strokeColor = COLOR_RECOVERING;
                            lineWidth = 1.5;
                        }

                        ctx.lineWidth = lineWidth;
                        ctx.beginPath();
                        ctx.moveTo(p1.x + (Math.random() - 0.5) * (lineWidth > 1 ? 2 : 0), p1.y + (Math.random() - 0.5) * (lineWidth > 1 ? 2 : 0)); // Micro-jitter
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = strokeColor;
                        ctx.globalAlpha = alpha;
                        ctx.stroke();
                    }
                }
            }

            // Draw Nodes (Dots)
            projectedNodes.forEach(p => {
                const alpha = Math.min(1, Math.max(0.2, (p.scale - 0.5)));
                let size = 1.5 * p.scale;

                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.node.currentColor;

                // Add glow and glitch for active states
                if (p.node.state !== 'secure') {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = p.node.currentColor;

                    if (p.node.state === 'infected') {
                        // Severe Glitch Strobe (Refined for more RED)
                        ctx.fillStyle = Math.random() > 0.2 ? COLOR_INFECTED : '#FFFFFF';
                        size = size * (0.8 + Math.random() * 0.8); // Size instability

                        // Jitter position
                        p.x += (Math.random() - 0.5) * 3;
                        p.y += (Math.random() - 0.5) * 3;
                    } else {
                        // Recovering - clean white flash
                        ctx.fillStyle = '#FFFFFF';
                    }
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        initNodes();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="w-full h-full" />
    );
};

export default DigitalImmuneSystem;

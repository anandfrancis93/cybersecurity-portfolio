import React, { useEffect, useRef, useCallback } from 'react';

interface SteganographyRainProps {
    revealRadius?: number;
    color?: string;
    fontSize?: number;
    density?: number; // How dense the character grid is
}

const SteganographyRain: React.FC<SteganographyRainProps> = ({
    revealRadius = 150,
    color = '#00ff9d',
    fontSize = 14,
    density = 1.5, // Spacing multiplier (higher = less dense)
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>(0);
    const gridRef = useRef<{ x: number; y: number; char: string }[]>([]);
    const dprRef = useRef(1);
    const dimensionsRef = useRef({ width: 0, height: 0 });

    // Characters: hex codes and binary
    const chars = '0123456789ABCDEF01'.split('');

    const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

    // Initialize the static grid of characters
    const initGrid = useCallback((width: number, height: number) => {
        const spacing = fontSize * density;
        const grid: { x: number; y: number; char: string }[] = [];

        for (let x = 0; x < width; x += spacing) {
            for (let y = fontSize; y < height; y += spacing) {
                grid.push({
                    x: x + (Math.random() - 0.5) * fontSize * 0.5, // Slight random offset
                    y: y + (Math.random() - 0.5) * fontSize * 0.5,
                    char: getRandomChar(),
                });
            }
        }
        gridRef.current = grid;
    }, [fontSize, density]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size with high DPI support
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Store for later use
            dprRef.current = dpr;
            dimensionsRef.current = { width, height };

            // Set canvas buffer size
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // Set display size
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Reset transform and scale for DPI
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            initGrid(width, height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse tracking
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchstart', handleTouchMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Parse color once
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Animation loop
        const draw = () => {
            const { width, height } = dimensionsRef.current;
            const mouse = mouseRef.current;
            const grid = gridRef.current;

            // Clear canvas using logical dimensions
            ctx.clearRect(0, 0, width, height);

            ctx.font = `${fontSize}px 'Courier New', monospace`;
            ctx.textBaseline = 'middle';

            for (const cell of grid) {
                // Calculate distance from mouse
                const dx = cell.x - mouse.x;
                const dy = cell.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Only draw characters within the reveal radius
                if (distance < revealRadius) {
                    // Smooth fade from center to edge
                    const t = 1 - (distance / revealRadius);
                    const opacity = t * t; // Quadratic for smooth edge

                    // Color variation for visual interest
                    const colorVariation = 0.85 + Math.random() * 0.15;
                    ctx.fillStyle = `rgba(${Math.floor(r * colorVariation)}, ${Math.floor(g * colorVariation)}, ${Math.floor(b * colorVariation)}, ${opacity})`;

                    // Glow effect near cursor center
                    if (distance < revealRadius * 0.3) {
                        ctx.shadowColor = color;
                        ctx.shadowBlur = 8 * t;
                    } else {
                        ctx.shadowBlur = 0;
                    }

                    // Randomly change character occasionally for "decryption" effect
                    const displayChar = Math.random() > 0.98 ? getRandomChar() : cell.char;
                    ctx.fillText(displayChar, cell.x, cell.y);
                }
            }

            // Reset shadow
            ctx.shadowBlur = 0;

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationRef.current);
        };
    }, [revealRadius, color, fontSize, initGrid]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
                background: 'transparent',
            }}
            aria-hidden="true"
        />
    );
};

export default SteganographyRain;

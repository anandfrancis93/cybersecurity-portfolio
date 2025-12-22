import React, { useState, useEffect, useRef } from 'react';

interface GlitchHoverProps {
    children: React.ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

const GlitchHover: React.FC<GlitchHoverProps> = ({
    children,
    className = '',
    intensity = 'medium',
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [glitchStyle, setGlitchStyle] = useState<React.CSSProperties>({});
    const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Intensity settings (matching original ScrambleText)
    const intensitySettings = {
        low: { offset: 2, frequency: 100, jitter: 1 },
        medium: { offset: 4, frequency: 50, jitter: 2 },
        high: { offset: 6, frequency: 30, jitter: 3 },
    };

    const settings = intensitySettings[intensity];

    useEffect(() => {
        if (isHovering) {
            glitchIntervalRef.current = setInterval(() => {
                const shouldGlitch = Math.random() > 0.3;

                if (shouldGlitch) {
                    const offsetX = (Math.random() - 0.5) * settings.offset;
                    const offsetY = (Math.random() - 0.5) * settings.jitter;
                    const skewX = (Math.random() - 0.5) * 2;
                    const redX = (Math.random() - 0.5) * settings.offset;
                    const cyanX = -redX;
                    const clipTop = Math.random() * 100;
                    const clipHeight = 5 + Math.random() * 15;

                    setGlitchStyle({
                        transform: `translate(${offsetX}px, ${offsetY}px) skewX(${skewX}deg)`,
                        textShadow: `
                            ${redX}px 0 0 rgba(255, 0, 0, 0.7),
                            ${cyanX}px 0 0 rgba(0, 255, 255, 0.7)
                        `,
                        clipPath: Math.random() > 0.7
                            ? `polygon(0 ${clipTop}%, 100% ${clipTop}%, 100% ${clipTop + clipHeight}%, 0 ${clipTop + clipHeight}%)`
                            : 'none',
                    });
                } else {
                    setGlitchStyle({
                        transform: 'none',
                        textShadow: 'none',
                        clipPath: 'none',
                    });
                }
            }, settings.frequency);

            return () => {
                if (glitchIntervalRef.current) {
                    clearInterval(glitchIntervalRef.current);
                }
                setGlitchStyle({});
            };
        } else {
            setGlitchStyle({});
        }
    }, [isHovering, settings.offset, settings.jitter, settings.frequency]);

    return (
        <span
            className={`inline-block relative ${className}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
                ...glitchStyle,
                transition: isHovering ? 'none' : 'all 0.1s ease-out',
            }}
        >
            {children}
        </span>
    );
};

export default GlitchHover;

import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
    text: string;
    className?: string;
    glitchChars?: string;
    duration?: number;
    intensity?: 'low' | 'medium' | 'high';
    autoGlitch?: boolean;
    disableVisualGlitch?: boolean;
    triggerReveal?: boolean;
    autoRepeatInterval?: number; // Auto-repeat scramble every X milliseconds
    scrambleOnTextChange?: boolean; // Whether to scramble when text changes (default true)
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
    text,
    className = '',
    glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    duration = 600,
    intensity = 'medium',
    autoGlitch = false,
    disableVisualGlitch = false,
    triggerReveal = false,
    autoRepeatInterval,
    scrambleOnTextChange = true,
}) => {
    // Always start with the actual text - no scrambled initial state
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [glitchStyle, setGlitchStyle] = useState<React.CSSProperties>({});
    const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isScrambling = useRef(false);
    const hasRevealedRef = useRef(false);

    // Intensity settings
    const intensitySettings = {
        low: { offset: 2, frequency: 100, jitter: 1 },
        medium: { offset: 4, frequency: 50, jitter: 2 },
        high: { offset: 6, frequency: 30, jitter: 3 },
    };

    const settings = intensitySettings[intensity];
    const isGlitchActive = isHovering || autoGlitch;

    // Visual glitch effect (only if not disabled)
    useEffect(() => {
        if (isGlitchActive && !disableVisualGlitch) {
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
    }, [isGlitchActive, disableVisualGlitch, settings.offset, settings.jitter, settings.frequency]);

    // Scramble function - runs the animation and always completes
    const runScramble = (targetText?: string) => {
        if (isScrambling.current) return; // Don't start if already running
        isScrambling.current = true;

        const textToUse = targetText ?? text;
        const chars = textToUse.split('');
        const totalChars = chars.length;
        const iterations = Math.ceil(duration / 30);
        let currentIteration = 0;

        const interval = setInterval(() => {
            currentIteration++;
            const progress = currentIteration / iterations;

            const newText = chars.map((char, index) => {
                if (char === ' ' || char === '\n') return char;
                const charResolvePoint = (index / totalChars) * 0.7 + 0.3;

                if (progress >= charResolvePoint) {
                    return char;
                } else {
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
            }).join('');

            setDisplayText(newText);

            if (currentIteration >= iterations) {
                clearInterval(interval);
                setDisplayText(textToUse);
                isScrambling.current = false;
            }
        }, 30);
    };

    // Hover scramble effect - DISABLED
    // useEffect(() => {
    //     if (isHovering) {
    //         runScramble();
    //     }
    // }, [isHovering]);

    // Trigger reveal effect on mount
    useEffect(() => {
        if (triggerReveal && !hasRevealedRef.current) {
            hasRevealedRef.current = true;
            // Small delay to ensure component is visible
            const timeout = setTimeout(() => {
                runScramble();
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [triggerReveal]);

    // Update displayText when text prop changes - trigger scramble for smooth transitions
    const prevTextRef = useRef(text);
    useEffect(() => {
        if (prevTextRef.current !== text) {
            prevTextRef.current = text;
            if (scrambleOnTextChange) {
                runScramble(text);
            } else {
                setDisplayText(text);
            }
        }
    }, [text, scrambleOnTextChange]);

    // Auto-repeat scramble effect - uses global sync event for all components
    useEffect(() => {
        if (!autoRepeatInterval || autoRepeatInterval <= 0) return;

        // Listen for the global scramble event
        const handleGlobalScramble = () => {
            runScramble();
        };

        window.addEventListener('globalScramble', handleGlobalScramble);

        // Only one component should set up the global timer
        const win = window as unknown as { scrambleTimerActive?: boolean; scrambleTimerId?: ReturnType<typeof setInterval> };
        if (!win.scrambleTimerActive) {
            win.scrambleTimerActive = true;

            // Simple repeating timer
            win.scrambleTimerId = setInterval(() => {
                window.dispatchEvent(new Event('globalScramble'));
            }, autoRepeatInterval);
        }

        return () => {
            window.removeEventListener('globalScramble', handleGlobalScramble);
        };
    }, [autoRepeatInterval]);

    return (
        <span
            className={`select-none inline-block relative ${className}`}
            style={{
                fontVariantLigatures: 'none',
            }}
            data-text={displayText}
        >
            {displayText}

            {/* Glitch overlay layers for more intense effect */}
            {isGlitchActive && !disableVisualGlitch && (
                <>
                    <span
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            color: 'rgba(255, 0, 0, 0.5)',
                            transform: `translateX(${(Math.random() - 0.5) * settings.offset}px)`,
                            clipPath: `polygon(0 ${Math.random() * 50}%, 100% ${Math.random() * 50}%, 100% ${50 + Math.random() * 50}%, 0 ${50 + Math.random() * 50}%)`,
                            mixBlendMode: 'screen',
                        }}
                        aria-hidden="true"
                    >
                        {displayText}
                    </span>
                    <span
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            color: 'rgba(0, 255, 255, 0.5)',
                            transform: `translateX(${(Math.random() - 0.5) * -settings.offset}px)`,
                            clipPath: `polygon(0 ${Math.random() * 50}%, 100% ${Math.random() * 50}%, 100% ${50 + Math.random() * 50}%, 0 ${50 + Math.random() * 50}%)`,
                            mixBlendMode: 'screen',
                        }}
                        aria-hidden="true"
                    >
                        {displayText}
                    </span>
                </>
            )}
        </span>
    );
};

export default ScrambleText;

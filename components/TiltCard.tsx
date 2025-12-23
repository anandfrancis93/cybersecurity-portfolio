import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    maxTilt?: number; // Maximum tilt angle in degrees
    perspective?: number;
    scale?: number; // Scale on hover
    transitionSpeed?: number; // Transition speed in ms
}

const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = '',
    style = {},
    maxTilt = 8,
    perspective = 1000,
    scale = 1.02,
    transitionSpeed = 400
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg) scale(1)');
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center (normalized to -1 to 1)
        const mouseX = (e.clientX - centerX) / (rect.width / 2);
        const mouseY = (e.clientY - centerY) / (rect.height / 2);

        // Calculate tilt angles (inverted for natural feel)
        const tiltX = -mouseY * maxTilt;
        const tiltY = mouseX * maxTilt;

        setTransform(`perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`);
    }, [maxTilt, perspective, scale]);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        setTransform('rotateX(0deg) rotateY(0deg) scale(1)');
    }, []);

    return (
        <div
            ref={cardRef}
            className={className}
            style={{
                ...style,
                transform: transform,
                transition: isHovering
                    ? `transform ${transitionSpeed / 4}ms ease-out`
                    : `transform ${transitionSpeed}ms ease-out`,
                transformStyle: 'preserve-3d',
                willChange: 'transform'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

export default TiltCard;

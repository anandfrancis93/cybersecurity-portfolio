import React, { useState, useEffect } from 'react';

interface SensorIntroProps {
    moduleName: string;
    accentColor?: string;
    onComplete: () => void;
}

type SensorType = 'infrared' | 'pressure' | 'microwave' | 'ultrasonic' | 'circuit' | 'motion' | 'noise' | 'proximity' | 'surveillance';

const SENSOR_ORDER: SensorType[] = ['infrared', 'pressure', 'microwave', 'ultrasonic', 'circuit', 'motion', 'noise', 'proximity', 'surveillance'];

const SENSOR_LABELS: Record<SensorType, { name: string; status: string }> = {
    infrared: { name: 'INFRARED SENSOR', status: 'HEAT SIGNATURE: DETECTED' },
    pressure: { name: 'PRESSURE SENSOR', status: 'WEIGHT DETECTED: AUTHORIZED' },
    microwave: { name: 'MICROWAVE SENSOR', status: 'REFLECTION ANALYZED' },
    ultrasonic: { name: 'ULTRASONIC SENSOR', status: 'ROOM OCCUPIED: LIGHTS ON' },
    circuit: { name: 'CIRCUIT ALARM', status: 'CIRCUIT INTEGRITY: SECURE' },
    motion: { name: 'MOTION DETECTION', status: 'DUAL-TECH VERIFIED' },
    noise: { name: 'NOISE DETECTION', status: 'AI ANALYSIS: COMPLETE' },
    proximity: { name: 'PROXIMITY SENSOR', status: 'RFID TAGS: ACCOUNTED' },
    surveillance: { name: 'VIDEO SURVEILLANCE', status: 'ALL FEEDS: ONLINE' },
};

const SensorIntro: React.FC<SensorIntroProps> = ({
    moduleName,
    accentColor = 'text-nist-identify',
    onComplete,
}) => {
    const [phase, setPhase] = useState<'scanning' | 'complete' | 'fadeout'>('scanning');
    const [sensorType, setSensorType] = useState<SensorType>('infrared');

    // Get current sensor and increment for next time
    // Use ref to prevent double execution in React Strict Mode
    const hasInitialized = React.useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const storedIndex = localStorage.getItem('sensorAnimationIndex');
        const currentIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
        const nextIndex = (currentIndex + 1) % SENSOR_ORDER.length;

        console.log(`🔐 Sensor Animation: ${SENSOR_ORDER[currentIndex]} (index ${currentIndex} of ${SENSOR_ORDER.length})`);

        setSensorType(SENSOR_ORDER[currentIndex]);
        localStorage.setItem('sensorAnimationIndex', nextIndex.toString());
    }, []);

    // Animation sequence
    useEffect(() => {
        const scanTimer = setTimeout(() => setPhase('complete'), 2200);
        const fadeTimer = setTimeout(() => setPhase('fadeout'), 3500);
        const completeTimer = setTimeout(() => onComplete(), 4000);

        return () => {
            clearTimeout(scanTimer);
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    const borderColor = accentColor.replace('text-', 'border-');
    const bgColor = accentColor.replace('text-', 'bg-');
    const sensorInfo = SENSOR_LABELS[sensorType];

    return (
        <div
            className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(#1f1f1f 1px, transparent 1px), linear-gradient(90deg, #1f1f1f 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            {/* Sensor-specific animation - scales down on small screens */}
            <div
                className="relative w-80 h-80 flex items-center justify-center"
                style={{ transform: 'scale(min(1, calc((100vw - 32px) / 320px)))' }}
            >
                {sensorType === 'infrared' && <InfraredAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'pressure' && <PressureAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'microwave' && <MicrowaveAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'ultrasonic' && <UltrasonicAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'circuit' && <CircuitAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'motion' && <MotionAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'noise' && <NoiseAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'proximity' && <ProximityAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'surveillance' && <SurveillanceAnimation phase={phase} accentColor={accentColor} />}
            </div>

            {/* Status text */}
            <div className="mt-6 text-center px-4">
                <div className={`text-xs font-mono ${accentColor} uppercase tracking-[0.3em] mb-2`}>
                    {sensorInfo.name}
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    {phase === 'scanning' ? 'SCANNING...' : sensorInfo.status}
                </div>
            </div>
        </div>
    );
};

// ================== INFRARED ANIMATION ==================
// Detects changes in heat patterns caused by moving intruder
const InfraredAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [intruderPos, setIntruderPos] = useState({ x: 10, y: 50 });
    const [heatTrail, setHeatTrail] = useState<{ x: number; y: number }[]>([]);
    const [alarmTriggered, setAlarmTriggered] = useState(false);

    useEffect(() => {
        // Move intruder across detection zone
        const moveInterval = setInterval(() => {
            setIntruderPos(prev => {
                const newX = prev.x + 2;
                if (newX > 50 && !alarmTriggered) {
                    setAlarmTriggered(true);
                }
                // Add to heat trail
                setHeatTrail(trail => [...trail.slice(-8), { x: prev.x, y: prev.y }]);
                return { x: newX > 90 ? 10 : newX, y: 50 + Math.sin(newX / 10) * 15 };
            });
        }, 80);

        return () => clearInterval(moveInterval);
    }, [alarmTriggered]);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Detection zone */}
            <div className="absolute w-48 h-32 border border-dashed border-red-500/30 rounded-lg" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-red-400/50 font-mono whitespace-nowrap">
                IR DETECTION ZONE
            </div>

            {/* PIR Sensor */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <div className="w-8 h-4 bg-gray-800 border border-red-500/50 rounded-b-lg flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${alarmTriggered ? 'bg-red-500 animate-ping' : 'bg-gray-600'}`} />
                </div>
            </div>

            {/* Heat trail */}
            {heatTrail.map((pos, i) => (
                <div
                    key={i}
                    className="absolute w-4 h-6 rounded-full"
                    style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, rgba(239,68,68,${0.1 + i * 0.05}) 0%, transparent 70%)`,
                    }}
                />
            ))}

            {/* Intruder (heat signature) */}
            <div
                className="absolute transition-all duration-75"
                style={{
                    left: `${intruderPos.x}%`,
                    top: `${intruderPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* Body heat visualization - proper person shape */}
                <div className="flex flex-col items-center">
                    {/* Head */}
                    <div className="w-4 h-4 rounded-full bg-gradient-to-b from-red-400 to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]" />
                    {/* Body */}
                    <div className="w-5 h-8 rounded-b-lg rounded-t-sm bg-gradient-to-b from-orange-400 to-yellow-400 -mt-0.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                </div>
                <div className="text-xs text-red-400 font-mono text-center mt-1">INTRUDER</div>
            </div>

            {/* Alarm indicator */}
            {alarmTriggered && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="px-3 py-1 border border-red-500 bg-red-500/20 rounded animate-pulse">
                        <span className="text-xs text-red-500 font-mono font-bold">⚠ MOTION DETECTED</span>
                    </div>
                </div>
            )}

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${alarmTriggered ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {alarmTriggered ? 'ALARM TRIGGERED' : 'MONITORING HEAT PATTERNS'}
                </span>
            </div>
        </div>
    );
};

// ================== PRESSURE ANIMATION ==================
// Floor/mat pressure sensors detecting weight for access control
const PressureAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [activeTile, setActiveTile] = useState<number | null>(null);
    const [footsteps, setFootsteps] = useState<number[]>([]);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        // Simulate person walking across tiles
        const tiles = [0, 1, 2, 3, 4, 5, 6, 7]; // Walkway
        let stepIndex = 0;

        const walkInterval = setInterval(() => {
            if (stepIndex < tiles.length) {
                setActiveTile(tiles[stepIndex]);
                setFootsteps(prev => [...prev, tiles[stepIndex]]);

                // Trigger alarm at restricted tile
                if (tiles[stepIndex] === 5) {
                    setAccessDenied(true);
                }
                stepIndex++;
            }
        }, 300);

        return () => clearInterval(walkInterval);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Restricted zone indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-purple-400/50 font-mono whitespace-nowrap">
                HIGH-SECURITY CORRIDOR
            </div>

            {/* Floor tiles grid */}
            <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 8 }).map((_, i) => {
                    const isActive = activeTile === i;
                    const wasVisited = footsteps.includes(i);
                    const isRestricted = i >= 4 && i <= 7;

                    return (
                        <div
                            key={i}
                            className={`w-14 h-10 border-2 rounded transition-all duration-200 flex items-center justify-center ${isActive
                                ? isRestricted
                                    ? 'border-red-500 bg-red-500/30 scale-95'
                                    : 'border-purple-400 bg-purple-500/30 scale-95'
                                : wasVisited
                                    ? 'border-purple-500/30 bg-purple-500/10'
                                    : isRestricted
                                        ? 'border-red-900/30 bg-gray-900'
                                        : 'border-gray-700 bg-gray-900'
                                }`}
                        >
                            {isActive && (
                                <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
                            )}
                            {isRestricted && !isActive && (
                                <span className="text-xs text-red-500/50 font-mono whitespace-nowrap">SECURE</span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Weight gauge */}
            <div className="mt-4 flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono whitespace-nowrap">WEIGHT:</span>
                <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-200 ${activeTile !== null ? 'bg-purple-400' : 'bg-gray-700'}`}
                        style={{ width: activeTile !== null ? '70%' : '0%' }}
                    />
                </div>
                <span className="text-xs text-purple-400 font-mono whitespace-nowrap">{activeTile !== null ? '~180 LBS' : '0 LBS'}</span>
            </div>

            {/* Access denied alert - positioned below title */}
            {accessDenied && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-2 py-0.5 border border-red-500 bg-red-500/30 rounded animate-pulse">
                        <span className="text-[10px] text-red-500 font-mono whitespace-nowrap font-bold">⚠ BREACH</span>
                    </div>
                </div>
            )}

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${accessDenied ? 'bg-red-500' : 'bg-purple-400'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {accessDenied ? 'UNAUTHORIZED ACCESS' : 'MONITORING FLOOR PRESSURE'}
                </span>
            </div>
        </div>
    );
};

// ================== MICROWAVE ANIMATION ==================
// Emits microwave pulses and measures reflection off moving objects (parking lot/outdoor)
const MicrowaveAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [pulseAngle, setPulseAngle] = useState(0);
    const [intruder, setIntruder] = useState({ x: 80, y: 30, detected: false });
    const [reflection, setReflection] = useState(false);

    useEffect(() => {
        // Rotating radar pulse
        const pulseInterval = setInterval(() => {
            setPulseAngle(prev => (prev + 4) % 360);
        }, 50);

        // Move intruder into range
        const moveInterval = setInterval(() => {
            setIntruder(prev => {
                const newX = prev.x > 40 ? prev.x - 1 : prev.x;
                // Detect when pulse angle aligns with intruder
                const intruderAngle = Math.atan2(prev.y - 50, prev.x - 20) * 180 / Math.PI + 180;
                if (Math.abs(pulseAngle - intruderAngle) < 15 && !prev.detected && newX < 60) {
                    setTimeout(() => setReflection(true), 200);
                    return { ...prev, x: newX, detected: true };
                }
                return { ...prev, x: newX };
            });
        }, 80);

        return () => {
            clearInterval(pulseInterval);
            clearInterval(moveInterval);
        };
    }, [pulseAngle]);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Outdoor area indicator */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-amber-400/50 font-mono whitespace-nowrap">
                PARKING LOT PERIMETER
            </div>

            {/* Fence boundary */}
            <div className="absolute w-60 h-36 border-2 border-dashed border-gray-600 rounded-lg">
                {/* Fence posts */}
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="absolute h-full w-px bg-gray-700" style={{ left: `${i * 20}%` }} />
                ))}
            </div>

            {/* Microwave emitter */}
            <div className="absolute left-2" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                <div className="w-8 h-12 bg-gray-800 border border-amber-500/50 rounded flex flex-col items-center justify-center">
                    <div className="w-4 h-4 rounded-full border border-amber-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    </div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono whitespace-nowrap text-center mt-1">TX</div>
            </div>

            {/* Microwave radar pulse - scanning beam */}
            <div
                className="absolute origin-left"
                style={{
                    left: '14%',
                    top: '50%',
                    width: '60%',
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(251,191,36,0.8), rgba(251,191,36,0.3), transparent)',
                    transform: `rotate(${Math.sin(pulseAngle * 2 * Math.PI / 180) * 15}deg)`,
                    boxShadow: '0 0 10px rgba(251,191,36,0.4)',
                }}
            />

            {/* Intruder */}
            <div
                className="absolute transition-all duration-100"
                style={{
                    left: `${intruder.x}%`,
                    top: `${intruder.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="flex flex-col items-center">
                    {/* Head */}
                    <div className={`w-4 h-4 rounded-full ${intruder.detected ? 'bg-red-500' : 'bg-gray-500'} shadow-[0_0_10px_${intruder.detected ? 'rgba(239,68,68,0.6)' : 'rgba(107,114,128,0.4)'}]`} />
                    {/* Body */}
                    <div className={`w-5 h-8 rounded-b-lg rounded-t-sm ${intruder.detected ? 'bg-red-500' : 'bg-gray-500'} -mt-0.5 shadow-lg`} />
                </div>
                <div className={`text-xs font-mono text-center mt-1 ${intruder.detected ? 'text-red-400' : 'text-gray-500'}`}>
                    {intruder.detected ? 'DETECTED' : 'INTRUDER'}
                </div>
            </div>

            {/* Reflection wave (when detected) */}
            {reflection && (
                <div
                    className="absolute animate-ping"
                    style={{ left: `${intruder.x - 5}%`, top: `${intruder.y - 5}%` }}
                >
                    <div className="w-6 h-6 rounded-full border-2 border-red-400" />
                </div>
            )}

            {/* Alert */}
            {intruder.detected && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="px-3 py-1 border border-red-500 bg-red-500/20 rounded animate-pulse">
                        <span className="text-xs text-red-500 font-mono font-bold">⚠ MOTION DETECTED</span>
                    </div>
                </div>
            )}

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${intruder.detected ? 'bg-red-500' : 'bg-amber-400'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {intruder.detected ? 'REFLECTION RECEIVED' : 'EMITTING PULSES'}
                </span>
            </div>
        </div>
    );
};

// ================== ULTRASONIC ANIMATION ==================
// Sound waves for room occupancy detection - automated lighting
const UltrasonicAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [personPos, setPersonPos] = useState({ x: 10, y: 50 });
    const [occupied, setOccupied] = useState(false);
    const [lightsOn, setLightsOn] = useState(false);
    const [walkFrame, setWalkFrame] = useState(0);
    const [wavePhase, setWavePhase] = useState(0); // For wave animation

    useEffect(() => {
        // Person enters room
        const moveInterval = setInterval(() => {
            setPersonPos(prev => {
                const newX = prev.x + 2;
                if (newX > 30 && !occupied) {
                    setOccupied(true);
                    setTimeout(() => setLightsOn(true), 300);
                }
                return { x: newX > 60 ? 60 : newX, y: 50 };
            });
            setWalkFrame(prev => (prev + 1) % 2);
        }, 150);

        // Wave animation
        const waveInterval = setInterval(() => {
            setWavePhase(prev => (prev + 1) % 100);
        }, 45);

        return () => {
            clearInterval(moveInterval);
            clearInterval(waveInterval);
        };
    }, [occupied]);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Room label - at very top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-cyan-400/50 font-mono whitespace-nowrap">
                CONFERENCE ROOM
            </div>

            {/* Room */}
            <div className={`absolute w-56 h-36 border-2 rounded-lg transition-all duration-500 mt-4 ${lightsOn
                ? 'border-yellow-400/50 bg-yellow-400/10'
                : 'border-gray-700 bg-gray-900/50'
                }`}>

                {/* Ceiling light fixtures */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-8">
                    {[0, 1].map(i => (
                        <div
                            key={i}
                            className={`w-12 h-3 rounded-full transition-all duration-300 ${lightsOn
                                ? 'bg-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.8)]'
                                : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Ultrasonic sensor */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2">
                <div className="w-6 h-4 bg-gray-800 border border-cyan-500/50 rounded-b flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${occupied ? 'bg-cyan-400 animate-ping' : 'bg-gray-600'}`} />
                </div>
            </div>

            {/* Sound waves - expanding downward from sensor */}
            {[0, 1, 2].map(i => {
                // Each wave has a different phase offset
                const offset = (wavePhase + i * 33) % 100;
                const scale = 0.3 + (offset / 100) * 1.2;
                const opacity = Math.max(0, 0.7 - (offset / 100) * 0.7);

                return (
                    <div
                        key={i}
                        className="absolute left-1/2 border-2 border-cyan-400 rounded-b-full"
                        style={{
                            top: '55px',
                            width: '200px',
                            height: '120px',
                            borderTop: 'none',
                            opacity: opacity,
                            transform: `translateX(-50%) scale(${scale})`,
                            transformOrigin: 'top center',
                        }}
                    />
                );
            })}

            {/* Person entering */}
            <div
                className="absolute transition-all duration-100"
                style={{
                    left: `${personPos.x}%`,
                    top: `${personPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="flex flex-col items-center">
                    {/* Head - separate circle */}
                    <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                    {/* Body */}
                    <div className="w-5 h-8 rounded-b-lg rounded-t-sm bg-cyan-500 -mt-0.5 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                </div>
                <div className="text-xs text-cyan-400/70 font-mono text-center mt-1">PERSON</div>
            </div>

            {/* Occupancy status */}
            {occupied && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                    <div className={`px-3 py-1 border rounded ${lightsOn ? 'border-yellow-400 bg-yellow-400/20' : 'border-cyan-400 bg-cyan-400/20'}`}>
                        <span className={`text-xs font-mono font-bold ${lightsOn ? 'text-yellow-400' : 'text-cyan-400'}`}>
                            {lightsOn ? '💡 LIGHTS ON' : 'OCCUPANT DETECTED'}
                        </span>
                    </div>
                </div>
            )}

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${lightsOn ? 'bg-yellow-400' : occupied ? 'bg-cyan-400' : 'bg-gray-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {lightsOn ? 'ROOM OCCUPIED - LIGHTS ACTIVE' : occupied ? 'PRESENCE DETECTED' : 'MONITORING ROOM'}
                </span>
            </div>
        </div>
    );
};

// ================== CIRCUIT ANIMATION ==================
// Circuit-based alarm - door/window opening detection
const CircuitAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [doorOpen, setDoorOpen] = useState(false);
    const [circuitBroken, setCircuitBroken] = useState(false);

    useEffect(() => {
        // Simulate door opening
        const timer = setTimeout(() => {
            setDoorOpen(true);
            setTimeout(() => setCircuitBroken(true), 300);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Circuit status - at top */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${circuitBroken ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                <span className={`text-xs font-mono ${circuitBroken ? 'text-red-500' : 'text-green-500'}`}>
                    {circuitBroken ? 'CIRCUIT OPEN' : 'CIRCUIT CLOSED'}
                </span>
            </div>

            {/* Door frame - centered */}
            <div className="relative w-28 h-40 border-4 border-gray-700 rounded-sm bg-gray-900 mt-4">
                {/* Door */}
                <div
                    className={`absolute inset-1 bg-gray-800 border border-gray-600 rounded-sm transition-transform duration-500 origin-left ${doorOpen ? 'rotate-y-[60deg] scale-x-50' : ''
                        }`}
                    style={{ transform: doorOpen ? 'perspective(200px) rotateY(-60deg)' : 'none' }}
                >
                    {/* Door handle */}
                    <div className="absolute right-2 top-1/2 w-3 h-1 bg-gray-500 rounded" />
                </div>

                {/* Circuit wire visualization */}
                <div className="absolute -right-8 top-2 flex flex-col items-center">
                    <div className={`w-8 h-0.5 ${circuitBroken ? 'bg-red-500' : 'bg-green-500'}`} />
                    <div className={`w-0.5 h-8 ${circuitBroken ? 'bg-red-500' : 'bg-green-500'}`} />
                </div>
            </div>

            {/* Alarm alert - positioned at top */}
            {circuitBroken && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-2 py-0.5 border border-red-500 bg-red-500/30 rounded animate-pulse">
                        <span className="text-[10px] text-red-500 font-mono whitespace-nowrap font-bold">⚠ BREACH</span>
                    </div>
                </div>
            )}

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${circuitBroken ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {circuitBroken ? 'ALARM ACTIVATED' : 'MONITORING ENTRY POINTS'}
                </span>
            </div>
        </div>
    );
};

// ================== MOTION ANIMATION ==================
// Dual-technology: PIR + Microwave combined detection
const MotionAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [pirTriggered, setPirTriggered] = useState(false);
    const [microwaveTriggered, setMicrowaveTriggered] = useState(false);
    const [target, setTarget] = useState({ x: 20, y: 50 });

    useEffect(() => {
        // Move target through detection zone
        const moveInterval = setInterval(() => {
            setTarget(prev => {
                const newX = prev.x + 3;
                if (newX > 40 && !pirTriggered) setPirTriggered(true);
                if (newX > 60 && !microwaveTriggered) setMicrowaveTriggered(true);
                return { x: newX > 80 ? 20 : newX, y: 50 + Math.sin(newX / 8) * 10 };
            });
        }, 100);

        return () => clearInterval(moveInterval);
    }, [pirTriggered, microwaveTriggered]);

    const alarmConfirmed = pirTriggered && microwaveTriggered;

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Dual sensors */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-8">
                {/* PIR */}
                <div className="flex flex-col items-center">
                    <div className={`w-8 h-6 rounded-b-full border-2 ${pirTriggered ? 'border-red-500 bg-red-500/20' : 'border-gray-600 bg-gray-800'}`}>
                        <div className={`w-2 h-2 mx-auto mt-1 rounded-full ${pirTriggered ? 'bg-red-500 animate-ping' : 'bg-gray-600'}`} />
                    </div>
                    <span className="text-xs text-gray-500 font-mono mt-1">PIR</span>
                </div>
                {/* Microwave */}
                <div className="flex flex-col items-center">
                    <div className={`w-8 h-6 rounded-b-lg border-2 ${microwaveTriggered ? 'border-amber-500 bg-amber-500/20' : 'border-gray-600 bg-gray-800'}`}>
                        <div className={`w-2 h-2 mx-auto mt-1 rounded-full ${microwaveTriggered ? 'bg-amber-500 animate-ping' : 'bg-gray-600'}`} />
                    </div>
                    <span className="text-xs text-gray-500 font-mono mt-1">MW</span>
                </div>
            </div>

            {/* Detection zone */}
            <div className="absolute w-48 h-24 border border-dashed border-gray-600 rounded" />

            {/* Target */}
            <div
                className="absolute w-4 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ left: `${target.x}%`, top: `${target.y}%`, transform: 'translate(-50%, -50%)' }}
            />

            {/* Alarm confirmation */}
            {alarmConfirmed && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="px-3 py-1 border border-green-500 bg-green-500/20 rounded animate-pulse">
                        <span className="text-xs text-green-500 font-mono font-bold">✓ DUAL-TECH VERIFIED</span>
                    </div>
                </div>
            )}

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${alarmConfirmed ? 'bg-green-500' : 'bg-amber-400'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {alarmConfirmed ? 'BOTH SENSORS TRIGGERED' : `PIR: ${pirTriggered ? '✓' : '-'} | MW: ${microwaveTriggered ? '✓' : '-'}`}
                </span>
            </div>
        </div>
    );
};

// ================== NOISE ANIMATION ==================
// AI-backed sound detection and classification
const NoiseAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [waveform, setWaveform] = useState<number[]>(Array(20).fill(5));
    const [detectedSound, setDetectedSound] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        // Generate waveform
        const waveInterval = setInterval(() => {
            setWaveform(prev => prev.map(() => 5 + Math.random() * 25));
        }, 100);

        // Simulate sound detection
        const detectTimer = setTimeout(() => {
            setAnalyzing(true);
            setTimeout(() => {
                setDetectedSound('GLASS BREAK');
                setWaveform(prev => prev.map(() => 10 + Math.random() * 40));
            }, 800);
        }, 1000);

        return () => {
            clearInterval(waveInterval);
            clearTimeout(detectTimer);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Microphone */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-6 h-10 bg-gray-800 border border-gray-600 rounded-full relative">
                    <div className="absolute inset-2 bg-gray-700 rounded-full" />
                    <div className={`absolute inset-3 rounded-full ${detectedSound ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
                </div>
                <span className="text-xs text-gray-500 font-mono mt-1">MIC</span>
            </div>

            {/* Waveform display */}
            <div className="flex items-end gap-0.5 h-16">
                {waveform.map((height, i) => (
                    <div
                        key={i}
                        className={`w-2 transition-all duration-100 ${detectedSound ? 'bg-red-500' : 'bg-green-500/60'}`}
                        style={{ height: `${height}px` }}
                    />
                ))}
            </div>

            {/* AI Analysis */}
            <div className="mt-4 text-center">
                <div className="text-xs text-purple-400 font-mono flex items-center gap-2 justify-center">
                    <span className={analyzing ? 'animate-pulse' : ''}>AI ANALYSIS</span>
                    {analyzing && !detectedSound && <span className="animate-spin">◐</span>}
                </div>
                {detectedSound && (
                    <div className="mt-2 px-3 py-1 border border-red-500 bg-red-500/20 rounded animate-pulse">
                        <span className="text-xs text-red-500 font-mono font-bold">⚠ {detectedSound}</span>
                    </div>
                )}
            </div>

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${detectedSound ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {detectedSound ? 'THREAT SOUND IDENTIFIED' : 'MONITORING AUDIO'}
                </span>
            </div>
        </div>
    );
};

// ================== PROXIMITY ANIMATION ==================
// RFID tracking for equipment theft detection
const ProximityAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [tags, setTags] = useState([
        { id: 1, x: 25, y: 35, label: 'LAPTOP', inRange: true },
        { id: 2, x: 50, y: 55, label: 'SERVER', inRange: true },
        { id: 3, x: 70, y: 40, label: 'PHONE', inRange: true },
        { id: 4, x: 40, y: 72, label: 'TABLET', inRange: true },
    ]);
    const [alertTag, setAlertTag] = useState<number | null>(null);
    const [wavePhase, setWavePhase] = useState(0);

    useEffect(() => {
        // Simulate one tag leaving range (theft)
        const timer = setTimeout(() => {
            setTags(prev => prev.map(tag =>
                tag.id === 3 ? { ...tag, x: 95, inRange: false } : tag
            ));
            setAlertTag(3);
        }, 1200);

        // Wave animation
        const waveInterval = setInterval(() => {
            setWavePhase(prev => (prev + 1) % 100);
        }, 40);

        return () => {
            clearTimeout(timer);
            clearInterval(waveInterval);
        };
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Zone label - at very top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] text-blue-400/50 font-mono whitespace-nowrap">
                RFID ZONE
            </div>

            {/* RFID Zone */}
            <div className="absolute w-56 h-44 border-2 border-dashed border-blue-500/30 rounded-lg mt-4" />

            {/* RFID Reader */}
            <div className="absolute top-6 right-6">
                <div className="w-6 h-8 bg-gray-800 border border-blue-500/50 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                </div>
            </div>

            {/* RF Waves - animated expanding circles centered on reader */}
            {[0, 1, 2].map(i => {
                const offset = (wavePhase + i * 33) % 100;
                const scale = 0.1 + (offset / 100) * 0.9;
                const opacity = Math.max(0, 0.6 - (offset / 100) * 0.6);

                return (
                    <div
                        key={i}
                        className="absolute border-2 border-blue-400 rounded-full pointer-events-none"
                        style={{
                            // Center on reader: top-8 (32px) + half reader height (16px) = 48px
                            // right-8 (32px) + half reader width (12px) = 44px
                            top: '48px',
                            right: '44px',
                            width: '500px',
                            height: '500px',
                            // Translate by half to center the circle on the point
                            transform: `translate(50%, -50%) scale(${scale})`,
                            opacity: opacity,
                        }}
                    />
                );
            })}

            {/* Tagged items */}
            {tags.map(tag => (
                <div
                    key={tag.id}
                    className={`absolute transition-all duration-500 ${tag.inRange ? '' : 'opacity-50'}`}
                    style={{ left: `${tag.x}%`, top: `${tag.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                    <div className={`w-8 h-6 rounded border ${tag.id === alertTag
                        ? 'border-red-500 bg-red-500/20'
                        : 'border-blue-400/50 bg-blue-500/10'
                        } flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${tag.id === alertTag ? 'bg-red-500' : 'bg-blue-400'}`} />
                    </div>
                    <div className={`text-xs font-mono text-center mt-0.5 ${tag.id === alertTag ? 'text-red-400' : 'text-gray-500'}`}>
                        {tag.label}
                    </div>
                </div>
            ))}

            {/* Theft alert - positioned at bottom of zone */}
            {alertTag && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-2 py-1 border border-red-500 bg-red-500/20 rounded animate-pulse">
                        <span className="text-[10px] text-red-500 font-mono whitespace-nowrap font-bold">⚠ THEFT ALERT</span>
                    </div>
                </div>
            )}

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${alertTag ? 'bg-red-500' : 'bg-blue-400'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {alertTag ? 'THEFT DETECTED' : `TRACKING ${tags.length} RFID TAGS`}
                </span>
            </div>
        </div>
    );
};

// ================== SURVEILLANCE ANIMATION ==================
// CCTV camera grid showing multiple feeds
const SurveillanceAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase, accentColor }) => {
    const [activeFeeds, setActiveFeeds] = useState<number[]>([]);

    useEffect(() => {
        const order = [0, 2, 6, 8, 4, 1, 3, 5, 7];

        // Add feeds one by one with delays
        order.forEach((feedIndex, i) => {
            setTimeout(() => {
                setActiveFeeds(prev => [...prev, feedIndex]);
            }, i * 150);
        });
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-green-400/50 font-mono whitespace-nowrap">
                CCTV MONITORING SYSTEM
            </div>

            {/* Camera grid */}
            <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-20 h-14 border relative overflow-hidden transition-all duration-300 ${activeFeeds.includes(i)
                            ? 'border-green-500/50 bg-gray-900'
                            : 'border-gray-800 bg-black'
                            }`}
                    >
                        {activeFeeds.includes(i) ? (
                            <>
                                {/* Feed content */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50" />
                                {/* REC indicator */}
                                <div className="absolute top-1 right-1 flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-xs text-red-500 font-mono whitespace-nowrap">REC</span>
                                </div>
                                {/* Feed number */}
                                <div className="absolute bottom-1 left-1 text-xs text-green-400/70 font-mono whitespace-nowrap">
                                    CAM-{String(i + 1).padStart(2, '0')}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-[repeating-linear-gradient(0deg,#111,#111_2px,#000_2px,#000_4px)] animate-pulse" />
                        )}
                    </div>
                ))}
            </div>

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activeFeeds.length === 9 ? 'bg-green-500' : 'bg-amber-400'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {activeFeeds.length === 9 ? 'ALL FEEDS ONLINE' : `CONNECTING... ${activeFeeds.length}/9`}
                </span>
            </div>
        </div>
    );
};

export default SensorIntro;

import React, { useState, useEffect } from 'react';

interface SensorIntroProps {
    moduleName: string;
    accentColor?: string;
    onComplete: () => void;
}

type SensorType = 'infrared' | 'pressure' | 'microwave' | 'ultrasonic' | 'circuit' | 'motion' | 'noise' | 'proximity' | 'surveillance' | 'siem' | 'ssh' | 'radius' | 'tacacs' | 'kerberos' | 'symmetric' | 'ddos';

const SENSOR_ORDER: SensorType[] = [
    'infrared', 'pressure', 'microwave', 'ultrasonic', 'circuit', 'noise', 'proximity', 'surveillance', 'siem', 'ssh', 'ddos',
    // 'radius', 'tacacs', 'kerberos', 'symmetric', 'motion'
];

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
    siem: { name: 'SIEM MONITORING', status: 'EVENTS CORRELATED' },
    ssh: { name: 'SSH SESSION', status: 'CONNECTION SECURE' },
    radius: { name: 'RADIUS AUTH', status: 'ACCESS GRANTED' },
    tacacs: { name: 'TACACS+ AUTH', status: 'COMMAND AUTHORIZED' },
    kerberos: { name: 'KERBEROS AUTH', status: 'TICKET GRANTED' },
    symmetric: { name: 'SYMMETRIC CRYPTO', status: 'MESSAGE DECRYPTED' },
    ddos: { name: 'DDoS DETECTION', status: 'ATTACK MITIGATED' },
};

const SensorIntro: React.FC<SensorIntroProps> = ({
    moduleName,
    accentColor = 'text-nist-identify',
    onComplete,
}) => {
    const [phase, setPhase] = useState<'scanning' | 'complete' | 'fadeout'>('scanning');

    // Initialize sensor type synchronously from localStorage to prevent flash
    const [sensorType, setSensorType] = useState<SensorType>(() => {
        if (typeof window !== 'undefined') {
            const storedIndex = localStorage.getItem('sensorAnimationIndex');
            const currentIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
            return SENSOR_ORDER[currentIndex] || 'infrared';
        }
        return 'infrared';
    });

    // Use ref to prevent double execution in React Strict Mode
    const hasInitialized = React.useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const storedIndex = localStorage.getItem('sensorAnimationIndex');
        const currentIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
        const nextIndex = (currentIndex + 1) % SENSOR_ORDER.length;

        console.log(`🔐 Sensor Animation: ${SENSOR_ORDER[currentIndex]} (index ${currentIndex} of ${SENSOR_ORDER.length})`);

        // Update to next index for next time
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
                {sensorType === 'siem' && <SIEMAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'ssh' && <SSHAnimation phase={phase} accentColor={accentColor} />}
                {sensorType === 'ddos' && <DDoSAnimation phase={phase} accentColor={accentColor} />}
                {/* {sensorType === 'radius' && <RADIUSAnimation phase={phase} accentColor={accentColor} />} */}
                {/* {sensorType === 'tacacs' && <TACACSAnimation phase={phase} accentColor={accentColor} />} */}
                {/* {sensorType === 'kerberos' && <KerberosAnimation phase={phase} accentColor={accentColor} />} */}
                {/* {sensorType === 'symmetric' && <SymmetricAnimation phase={phase} accentColor={accentColor} />} */}
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
                return { x: newX > 90 ? 10 : newX, y: 50 };
            });
        }, 80);

        return () => clearInterval(moveInterval);
    }, [alarmTriggered]);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Detection zone */}
            <div className="absolute w-48 h-32 border border-dashed border-red-500/30 rounded-lg" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-red-400 font-mono whitespace-nowrap">
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
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-purple-400 font-mono whitespace-nowrap">
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
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-amber-400 font-mono whitespace-nowrap">
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
        // Person enters room - smooth movement
        const moveInterval = setInterval(() => {
            setPersonPos(prev => {
                const newX = prev.x + 0.8; // Smaller increments for smoother movement
                if (newX > 30 && !occupied) {
                    setOccupied(true);
                    setTimeout(() => setLightsOn(true), 300);
                }
                return { x: newX > 60 ? 60 : newX, y: 50 };
            });
            setWalkFrame(prev => (prev + 1) % 2);
        }, 50); // Faster interval for smoother animation

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
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-cyan-400 font-mono whitespace-nowrap">
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
                className="absolute transition-all duration-75 ease-linear"
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

            {/* Status - outside the room box */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {!lightsOn && (
                    <div className={`w-2 h-2 rounded-full ${occupied ? 'bg-cyan-400' : 'bg-gray-500'} animate-pulse`} />
                )}
                <span className={`text-xs font-mono ${lightsOn ? 'text-yellow-400' : 'text-gray-500'}`}>
                    {lightsOn ? '💡 ROOM OCCUPIED - LIGHTS ON' : occupied ? 'PRESENCE DETECTED' : 'MONITORING ROOM'}
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
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
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
                <span className="text-xs text-gray-400 font-mono mt-1">MIC</span>
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
        { id: 1, x: 25, y: 38, label: 'LAPTOP', inRange: true },
        { id: 2, x: 55, y: 55, label: 'SERVER', inRange: true },
        { id: 3, x: 75, y: 35, label: 'PHONE', inRange: true },
        { id: 4, x: 25, y: 65, label: 'TABLET', inRange: true },
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
            {/* RFID Zone */}
            <div className="absolute w-56 h-44 border-2 border-dashed border-blue-500/30 rounded-lg mt-4">
                {/* Zone label - on the border */}
                <div className="absolute -top-2.5 left-3 px-1 bg-black text-[10px] text-blue-400 font-mono">
                    RFID ZONE
                </div>
            </div>

            {/* RFID Reader */}
            <div className="absolute top-6 right-6 flex flex-col items-center">
                <div className="w-6 h-8 bg-gray-800 border border-blue-500/50 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <span className="text-[8px] text-blue-400 font-mono mt-0.5">READER</span>
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
        const timeoutIds: NodeJS.Timeout[] = [];

        // Reset state
        setActiveFeeds([]);

        // Add feeds one by one with delays
        order.forEach((feedIndex, i) => {
            const timeoutId = setTimeout(() => {
                setActiveFeeds(prev => [...prev, feedIndex]);
            }, i * 150);
            timeoutIds.push(timeoutId);
        });

        return () => {
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-green-400 font-mono whitespace-nowrap">
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

// ================== SIEM ANIMATION ==================
// Security Information and Event Management - Computer monitor displaying SIEM dashboard
const SIEMAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [logLines, setLogLines] = useState<{ id: number; source: string; level: string; msg: string }[]>([]);
    const [stats, setStats] = useState({ events: 0, alerts: 0, sources: 4 });
    const [threatDetected, setThreatDetected] = useState(false);

    const logMessages = [
        { source: 'FW', level: 'INFO', msg: 'Connection allowed 10.0.0.5' },
        { source: 'SRV', level: 'INFO', msg: 'User login successful' },
        { source: 'IDS', level: 'WARN', msg: 'Unusual traffic pattern' },
        { source: 'EPT', level: 'INFO', msg: 'Scan completed clean' },
        { source: 'FW', level: 'WARN', msg: 'Port scan detected' },
        { source: 'SRV', level: 'INFO', msg: 'Backup completed' },
        { source: 'IDS', level: 'CRIT', msg: 'MALWARE SIGNATURE MATCH' },
        { source: 'NET', level: 'INFO', msg: 'Bandwidth normal' },
        { source: 'EPT', level: 'CRIT', msg: 'UNAUTHORIZED ACCESS' },
    ];

    useEffect(() => {
        let lineId = 0;

        const interval = setInterval(() => {
            const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
            const isCritical = randomLog.level === 'CRIT';

            setLogLines(prev => [...prev.slice(-6), { id: lineId++, ...randomLog }]);
            setStats(prev => ({
                events: prev.events + 1,
                alerts: prev.alerts + (isCritical ? 1 : 0),
                sources: 4,
            }));

            if (isCritical && !threatDetected) {
                setThreatDetected(true);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [threatDetected]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* MONITOR FRAME */}
            <div className="relative">
                {/* Monitor bezel */}
                <div className="w-[340px] h-[220px] bg-gray-800 rounded-lg p-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                    {/* Screen */}
                    <div className={`w-full h-full bg-gray-950 rounded overflow-hidden border ${threatDetected ? 'border-red-500/50' : 'border-gray-700'
                        }`}>

                        {/* Window Title Bar */}
                        <div className="h-6 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-2">
                            <div className="flex items-center gap-1.5">
                                <div className="flex gap-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                </div>
                                <span className="text-[10px] font-mono text-gray-400 ml-2">SIEM Dashboard v2.4</span>
                            </div>
                            <div className={`w-2.5 h-2.5 rounded-full ${threatDetected ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex h-[calc(100%-24px)]">
                            {/* Sidebar - Sources */}
                            <div className="w-14 bg-gray-900/50 border-r border-gray-800 p-1.5 flex flex-col gap-1.5">
                                <div className="text-[8px] text-gray-500 font-mono text-center mb-0.5">SOURCES</div>
                                {['FW', 'SRV', 'IDS', 'EPT'].map((src, i) => (
                                    <div key={i} className={`h-7 rounded bg-gray-800 flex items-center justify-center text-[9px] font-mono ${logLines.some(l => l.source === src) ? 'text-green-400 border border-green-500/30' : 'text-gray-500'
                                        }`}>
                                        {src}
                                    </div>
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 flex flex-col">
                                {/* Stats Bar */}
                                <div className="h-10 border-b border-gray-800 flex">
                                    <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-800">
                                        <div className="text-sm font-mono text-indigo-400">{stats.events}</div>
                                        <div className="text-[8px] text-gray-500 font-mono">EVENTS</div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-800">
                                        <div className={`text-sm font-mono ${stats.alerts > 0 ? 'text-red-500' : 'text-gray-500'}`}>{stats.alerts}</div>
                                        <div className="text-[8px] text-gray-500 font-mono">ALERTS</div>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <div className="text-sm font-mono text-green-400">{stats.sources}</div>
                                        <div className="text-[8px] text-gray-500 font-mono">SOURCES</div>
                                    </div>
                                </div>

                                {/* Log Feed */}
                                <div className="flex-1 p-1.5 overflow-hidden">
                                    <div className="text-[8px] text-gray-500 font-mono mb-1">LIVE LOG FEED</div>
                                    <div className="space-y-0.5">
                                        {logLines.map((line, i) => (
                                            <div key={line.id} className={`flex items-center gap-1.5 text-[9px] font-mono py-0.5 px-1.5 rounded ${i === logLines.length - 1 ? 'bg-gray-800/50' : ''
                                                }`}>
                                                <span className={`w-7 ${line.source === 'FW' ? 'text-blue-400' :
                                                    line.source === 'SRV' ? 'text-purple-400' :
                                                        line.source === 'IDS' ? 'text-cyan-400' :
                                                            'text-amber-400'
                                                    }`}>{line.source}</span>
                                                <span className={`w-9 ${line.level === 'CRIT' ? 'text-red-500 font-bold' :
                                                    line.level === 'WARN' ? 'text-amber-400' :
                                                        'text-green-400'
                                                    }`}>{line.level}</span>
                                                <span className={`truncate ${line.level === 'CRIT' ? 'text-red-400' : 'text-gray-400'}`}>
                                                    {line.msg}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monitor Stand */}
                <div className="mx-auto w-20 h-3 bg-gray-700 rounded-b-sm" />
                <div className="mx-auto w-28 h-2 bg-gray-600 rounded-b" />
            </div>

            {/* Status */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${threatDetected ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                    {threatDetected ? 'THREAT DETECTED' : 'MONITORING ACTIVE'}
                </span>
            </div>
        </div>
    );
};

// ================== SSH ANIMATION ==================
// SSH session - terminal showing remote server connection
const SSHAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [typing, setTyping] = useState('');
    const [connected, setConnected] = useState(false);

    const sshSequence = [
        { text: '$ ssh admin@192.168.1.100', color: 'text-cyan-400', delay: 0, typeEffect: true },
        { text: 'Connecting to 192.168.1.100:22...', color: 'text-gray-400', delay: 800, typeEffect: false },
        { text: 'Host key fingerprint:', color: 'text-gray-500', delay: 1200, typeEffect: false },
        { text: 'SHA256:nThbg6kXUpJWGl7E1IGO...', color: 'text-amber-400', delay: 1400, typeEffect: false },
        { text: 'Authenticating with public key...', color: 'text-gray-400', delay: 1800, typeEffect: false },
        { text: '✓ Authentication successful', color: 'text-green-400', delay: 2400, typeEffect: false },
        { text: '', color: '', delay: 2600, typeEffect: false },
        { text: 'Welcome to Ubuntu 22.04.3 LTS', color: 'text-white', delay: 2800, typeEffect: false },
        { text: 'Last login: Thu Dec 19 18:30:00 2024', color: 'text-gray-500', delay: 3000, typeEffect: false },
        { text: 'admin@server:~$', color: 'text-green-400', delay: 3200, typeEffect: false },
    ];

    useEffect(() => {
        let isMounted = true;
        const timeoutIds: NodeJS.Timeout[] = [];

        // Reset state
        setLines([]);
        setTyping('');
        setConnected(false);

        const command = sshSequence[0].text;
        let charIndex = 0;

        // Type out the first command character by character
        const typeInterval = setInterval(() => {
            if (!isMounted) return;
            if (charIndex <= command.length) {
                setTyping(command.substring(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 40);

        // Add subsequent lines with delays
        sshSequence.forEach((line, index) => {
            if (index === 0) return; // Skip first line (handled by typing)

            const timeoutId = setTimeout(() => {
                if (!isMounted) return;
                setLines(prev => [...prev, { text: line.text, color: line.color }]);
                setCurrentLine(index);

                if (index === 5) setConnected(true); // Authentication successful
            }, line.delay);
            timeoutIds.push(timeoutId);
        });

        return () => {
            isMounted = false;
            clearInterval(typeInterval);
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Terminal Window */}
            <div className="w-80 h-60 bg-gray-900 rounded-lg overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-gray-700">
                {/* Title Bar */}
                <div className="h-7 bg-gray-800 flex items-center px-3 gap-1.5 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-[11px] font-mono text-gray-400">Terminal — ssh</span>
                    <div className="ml-auto">
                        <div className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
                    </div>
                </div>

                {/* Terminal Content */}
                <div className="p-3 h-[calc(100%-28px)] overflow-hidden font-mono text-[11px] leading-relaxed">
                    {/* First line with typing effect */}
                    <div className="text-cyan-400">
                        {typing}
                        {typing.length < sshSequence[0].text.length && (
                            <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-0.5 animate-pulse" />
                        )}
                    </div>

                    {/* Subsequent lines */}
                    {lines.map((line, i) => (
                        <div key={i} className={`${line.color} ${i === lines.length - 1 && connected ? 'flex items-center' : ''}`}>
                            {line.text}
                            {/* Blinking cursor on last line after connected */}
                            {i === lines.length - 1 && line.text.includes('admin@server') && (
                                <span className="inline-block w-1.5 h-3.5 bg-green-400 ml-1 animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Connection indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-cyan-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                    {connected ? 'SESSION ESTABLISHED' : 'CONNECTING...'}
                </span>
            </div>
        </div>
    );
};

// ================== RADIUS ANIMATION ==================
// RADIUS authentication - Supplicant → NAS → AAA Server workflow
const RADIUSAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [step, setStep] = useState(0);
    const [packets, setPackets] = useState<{ id: number; from: number; to: number; label: string; color: string }[]>([]);
    const [authenticated, setAuthenticated] = useState(false);

    const steps = [
        { label: 'EAPOL-Start', from: 0, to: 1, desc: 'User begins session' },
        { label: 'EAP-Request/Identity', from: 1, to: 0, desc: 'NAS asks for identity' },
        { label: 'EAP-Response/Identity', from: 0, to: 1, desc: 'User sends identity' },
        { label: 'Access-Request', from: 1, to: 2, desc: 'NAS forwards to AAA' },
        { label: 'Access-Challenge', from: 2, to: 1, desc: 'AAA needs credentials' },
        { label: 'Access-Request', from: 1, to: 2, desc: 'NAS forwards credentials' },
        { label: 'Access-Accept', from: 2, to: 1, desc: 'Port opened ✓' },
    ];

    useEffect(() => {
        let isMounted = true;
        const timeoutIds: NodeJS.Timeout[] = [];

        // Reset state
        setStep(0);
        setPackets([]);
        setAuthenticated(false);

        // Animate through steps
        steps.forEach((s, i) => {
            const timeoutId = setTimeout(() => {
                if (!isMounted) return;
                setStep(i);
                setPackets(prev => [...prev.slice(-2), {
                    id: i,
                    from: s.from,
                    to: s.to,
                    label: s.label,
                    color: s.label.includes('Accept') ? 'bg-green-500' :
                        s.label.includes('Challenge') ? 'bg-cyan-500' :
                            s.label.includes('EAPoL') ? 'bg-blue-500' : 'bg-amber-500'
                }]);

                if (i === steps.length - 1) {
                    setTimeout(() => {
                        if (isMounted) setAuthenticated(true);
                    }, 300);
                }
            }, 400 * (i + 1));
            timeoutIds.push(timeoutId);
        });

        return () => {
            isMounted = false;
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <div className="absolute top-2 text-xs text-gray-400 font-mono">
                RADIUS AUTHENTICATION FLOW
            </div>

            {/* Three nodes */}
            <div className="flex items-start justify-center gap-4 mt-4">
                {/* Supplicant */}
                <div className={`flex flex-col items-center transition-all duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all ${authenticated ? 'border-green-500 bg-green-500/10' : 'border-blue-500 bg-blue-500/10'
                        }`}>
                        <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">SUPPLICANT</span>
                    <span className="text-[9px] text-gray-600 font-mono">(User)</span>
                    {/* Invisible placeholder for alignment */}
                    <div className="mt-1 px-1 py-0.5 opacity-0">
                        <span className="text-[6px] font-mono">🔑 SECRET</span>
                    </div>
                </div>

                {/* Connection line 1 - Supplicant <-> NAS */}
                <div className="relative w-16 h-14 flex items-center">
                    <div className="absolute top-6 left-0 right-0 border-t-2 border-dashed border-blue-500/30" />

                    {/* Step 0: User connects (→) */}
                    {step === 0 && (
                        <div className="absolute top-4 left-0 flex items-center animate-[packetRight_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                        </div>
                    )}
                    {/* Step 1: EAP Request (←) */}
                    {step === 1 && (
                        <div className="absolute top-4 right-0 flex items-center animate-[packetLeft_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
                        </div>
                    )}
                    {/* Step 2: EAPoL Credentials (→) */}
                    {step === 2 && (
                        <div className="absolute top-4 left-0 flex items-center animate-[packetRight_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                        </div>
                    )}

                    <span className="absolute top-9 left-1/2 -translate-x-1/2 text-[8px] text-blue-400 font-mono whitespace-nowrap">EAPoL</span>

                    <style>{`
                        @keyframes packetRight { 
                            0% { left: 0; opacity: 1; } 
                            90% { opacity: 1; }
                            100% { left: calc(100% - 8px); opacity: 0.3; } 
                        }
                        @keyframes packetLeft { 
                            0% { right: 0; opacity: 1; } 
                            90% { opacity: 1; }
                            100% { right: calc(100% - 8px); opacity: 0.3; } 
                        }
                    `}</style>
                </div>

                {/* NAS */}
                <div className={`flex flex-col items-center transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all ${authenticated ? 'border-green-500 bg-green-500/10' : 'border-cyan-500 bg-cyan-500/10'
                        }`}>
                        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">NAS</span>
                    <span className="text-[9px] text-gray-600 font-mono">(Client)</span>
                    {/* Shared secret indicator */}
                    <div className="mt-1 px-1 py-0.5 bg-amber-500/20 rounded border border-amber-500/30">
                        <span className="text-[8px] text-amber-400 font-mono">🔑 SECRET</span>
                    </div>
                </div>

                {/* Connection line 2 - NAS <-> AAA Server */}
                <div className="relative w-16 h-14 flex items-center">
                    <div className="absolute top-6 left-0 right-0 border-t-2 border-dashed border-amber-500/30" />

                    {/* Step 3: Access-Request (→) */}
                    {step === 3 && (
                        <div className="absolute top-4 left-0 flex items-center animate-[packetRight_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                        </div>
                    )}
                    {/* Step 4: Access-Challenge (←) */}
                    {step === 4 && (
                        <div className="absolute top-4 right-0 flex items-center animate-[packetLeft_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
                        </div>
                    )}
                    {/* Step 5: Access-Request (→) */}
                    {step === 5 && (
                        <div className="absolute top-4 left-0 flex items-center animate-[packetRight_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                        </div>
                    )}
                    {/* Step 6: Access-Accept (←) */}
                    {step === 6 && (
                        <div className="absolute top-4 right-0 flex items-center animate-[packetLeft_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        </div>
                    )}

                    <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] text-amber-400 font-mono whitespace-nowrap">RADIUS</span>
                    <span className="absolute top-9 left-1/2 -translate-x-1/2 text-[8px] text-gray-500 font-mono whitespace-nowrap">UDP 1812</span>
                </div>

                {/* AAA Server */}
                <div className={`flex flex-col items-center transition-all duration-300 ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all ${authenticated ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-amber-500 bg-amber-500/10'
                        }`}>
                        <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">AAA SERVER</span>
                    <span className="text-[9px] text-gray-600 font-mono">(RADIUS)</span>
                    {/* Shared secret indicator */}
                    <div className="mt-1 px-1 py-0.5 bg-amber-500/20 rounded border border-amber-500/30">
                        <span className="text-[8px] text-amber-400 font-mono">🔑 SECRET</span>
                    </div>
                </div>
            </div>

            {/* Current step display */}
            <div className="mt-4 h-20 flex flex-col items-center">
                {/* Step label */}
                <div className={`px-3 py-1 rounded-full border text-xs font-mono transition-all ${authenticated
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : 'border-cyan-500/50 bg-gray-900 text-cyan-400'
                    }`}>
                    {authenticated ? '✓ ACCESS-ACCEPT' : steps[step]?.label || 'Initializing...'}
                </div>
                {/* Step description */}
                <div className="mt-1 text-[10px] text-gray-500 font-mono">
                    {authenticated ? 'Port opened - User authenticated' : steps[step]?.desc || ''}
                </div>

                {/* Packet animation indicator */}
                <div className="mt-2 flex gap-1">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i < step ? 'bg-green-500' :
                                i === step ? 'bg-cyan-500 animate-pulse' : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${authenticated ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                    {authenticated ? 'USER AUTHENTICATED' : 'AUTHENTICATING...'}
                </span>
            </div>
        </div>
    );
};

// ================== TACACS+ ANIMATION ==================
// TACACS+ authentication/authorization - User → NAS → AAA Daemon workflow
const TACACSAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [step, setStep] = useState(0);
    const [authorized, setAuthorized] = useState(false);

    const steps = [
        { label: 'SSH Connection', from: 0, to: 1, desc: 'User connects to NAS' },
        { label: 'TCP 49 Open', from: 1, to: 2, desc: 'NAS connects to AAA' },
        { label: 'AUTH START', from: 1, to: 2, desc: 'Begin authentication' },
        { label: 'GETUSER', from: 2, to: 1, desc: 'Prompt for username' },
        { label: 'AUTH CONTINUE', from: 1, to: 2, desc: 'Username sent' },
        { label: 'GETPASS', from: 2, to: 1, desc: 'Prompt for password' },
        { label: 'AUTH CONTINUE', from: 1, to: 2, desc: 'Password sent' },
        { label: 'AUTH PASS ✓', from: 2, to: 1, desc: 'Login successful' },
        { label: 'AUTHZ REQUEST', from: 1, to: 2, desc: 'Command permission?' },
        { label: 'AUTHZ PERMIT', from: 2, to: 1, desc: 'Command allowed ✓' },
    ];

    useEffect(() => {
        let isMounted = true;
        const timeoutIds: NodeJS.Timeout[] = [];

        // Reset state
        setStep(0);
        setAuthorized(false);

        // Animate through steps
        steps.forEach((_, i) => {
            const timeoutId = setTimeout(() => {
                if (!isMounted) return;
                setStep(i);

                if (i === steps.length - 1) {
                    setTimeout(() => {
                        if (isMounted) setAuthorized(true);
                    }, 200);
                }
            }, 270 * (i + 1));
            timeoutIds.push(timeoutId);
        });

        return () => {
            isMounted = false;
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <div className="absolute top-2 text-xs text-gray-400 font-mono">
                TACACS+ AUTHENTICATION FLOW
            </div>

            {/* Three nodes */}
            <div className="flex items-start justify-center gap-3 mt-4">
                {/* User (Admin) */}
                <div className={`flex flex-col items-center transition-all duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${authorized ? 'border-green-500 bg-green-500/10' : 'border-purple-500 bg-purple-500/10'
                        }`}>
                        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">USER</span>
                    <span className="text-[9px] text-gray-600 font-mono">(Admin)</span>
                </div>

                {/* Connection line 1 - User <-> NAS */}
                <div className="relative w-14 h-12 flex items-center">
                    <div className="absolute top-5 left-0 right-0 border-t-2 border-dashed border-purple-500/30" />

                    {/* Step 0: User connects */}
                    {step === 0 && (
                        <div className="absolute top-4 left-0 animate-[packetRight_0.3s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                        </div>
                    )}

                    <span className="absolute top-8 left-1/2 -translate-x-1/2 text-[8px] text-purple-400 font-mono whitespace-nowrap">SSH/Telnet</span>

                    <style>{`
                        @keyframes packetRight { 
                            0% { left: 0; opacity: 1; } 
                            90% { opacity: 1; }
                            100% { left: calc(100% - 8px); opacity: 0.3; } 
                        }
                        @keyframes packetLeft { 
                            0% { right: 0; opacity: 1; } 
                            90% { opacity: 1; }
                            100% { right: calc(100% - 8px); opacity: 0.3; } 
                        }
                    `}</style>
                </div>

                {/* NAS (Client) */}
                <div className={`flex flex-col items-center transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${authorized ? 'border-green-500 bg-green-500/10' : 'border-cyan-500 bg-cyan-500/10'
                        }`}>
                        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">NAS</span>
                    <span className="text-[9px] text-gray-600 font-mono">(Client)</span>
                </div>

                {/* Connection line 2 - NAS <-> AAA */}
                <div className="relative w-14 h-12 flex items-center">
                    <div className="absolute top-5 left-0 right-0 border-t-2 border-dashed border-amber-500/30" />

                    {/* Packets to AAA */}
                    {(step === 1 || step === 2 || step === 4 || step === 6 || step === 8) && (
                        <div className="absolute top-4 left-0 animate-[packetRight_0.3s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                        </div>
                    )}
                    {/* Packets from AAA */}
                    {(step === 3 || step === 5) && (
                        <div className="absolute top-4 right-0 animate-[packetLeft_0.3s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
                        </div>
                    )}
                    {step === 7 && (
                        <div className="absolute top-4 right-0 animate-[packetLeft_0.3s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        </div>
                    )}
                    {step === 9 && (
                        <div className="absolute top-4 right-0 animate-[packetLeft_0.3s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        </div>
                    )}

                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] text-amber-400 font-mono whitespace-nowrap">TACACS+</span>
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 text-[8px] text-gray-500 font-mono whitespace-nowrap">TCP 49</span>
                </div>

                {/* AAA Server (Daemon) */}
                <div className={`flex flex-col items-center transition-all duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${authorized ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-amber-500 bg-amber-500/10'
                        }`}>
                        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">AAA</span>
                    <span className="text-[9px] text-gray-600 font-mono">(Daemon)</span>
                </div>
            </div>

            {/* Current step display */}
            <div className="mt-3 h-16 flex flex-col items-center">
                {/* Step label */}
                <div className={`px-3 py-1 rounded-full border text-xs font-mono transition-all ${authorized
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : 'border-cyan-500/50 bg-gray-900 text-cyan-400'
                    }`}>
                    {authorized ? '✓ AUTHORIZED' : steps[step]?.label || 'Initializing...'}
                </div>
                {/* Step description */}
                <div className="mt-1 text-[10px] text-gray-500 font-mono">
                    {authorized ? 'User authenticated & command permitted' : steps[step]?.desc || ''}
                </div>

                {/* Progress dots */}
                <div className="mt-2 flex gap-1">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i < step ? 'bg-green-500' :
                                i === step ? 'bg-cyan-500 animate-pulse' : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Status */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${authorized ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                    {authorized ? 'SESSION AUTHORIZED' : step < 7 ? 'AUTHENTICATING...' : 'AUTHORIZING...'}
                </span>
            </div>
        </div>
    );
};

// ================== KERBEROS ANIMATION ==================
// Kerberos authentication - Client → KDC (AS/TGS) → App Server workflow
const KerberosAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [step, setStep] = useState(0);
    const [currentPhase, setCurrentPhase] = useState<'AS' | 'TGS' | 'AP'>('AS');
    const [authenticated, setAuthenticated] = useState(false);

    const steps = [
        { label: 'AS-REQ', from: 0, to: 1, desc: 'Request TGT', phase: 'AS' },
        { label: 'AS-REP', from: 1, to: 0, desc: 'TGT + Session Key', phase: 'AS' },
        { label: 'TGS-REQ', from: 0, to: 1, desc: 'Request Service Ticket', phase: 'TGS' },
        { label: 'TGS-REP', from: 1, to: 0, desc: 'Service Ticket', phase: 'TGS' },
        { label: 'AP-REQ', from: 0, to: 2, desc: 'Present Ticket', phase: 'AP' },
        { label: 'AP-REP', from: 2, to: 0, desc: 'Access Granted ✓', phase: 'AP' },
    ];

    useEffect(() => {
        let isMounted = true;
        const timeoutIds: NodeJS.Timeout[] = [];

        // Reset state
        setStep(0);
        setCurrentPhase('AS');
        setAuthenticated(false);

        // Animate through steps
        steps.forEach((s, i) => {
            const timeoutId = setTimeout(() => {
                if (!isMounted) return;
                setStep(i);
                setCurrentPhase(s.phase as 'AS' | 'TGS' | 'AP');

                if (i === steps.length - 1) {
                    setTimeout(() => {
                        if (isMounted) setAuthenticated(true);
                    }, 250);
                }
            }, 400 * (i + 1));
            timeoutIds.push(timeoutId);
        });

        return () => {
            isMounted = false;
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <div className="absolute top-1 text-xs text-gray-400 font-mono">
                KERBEROS AUTHENTICATION
            </div>

            {/* Phase indicator */}
            <div className="absolute top-6 flex gap-2">
                {['AS', 'TGS', 'AP'].map((p) => (
                    <div key={p} className={`px-2 py-0.5 rounded text-[8px] font-mono border transition-all ${currentPhase === p
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                        : p === 'AS' && step > 1 || p === 'TGS' && step > 3
                            ? 'border-green-500/50 bg-green-500/10 text-green-500'
                            : 'border-gray-700 text-gray-600'
                        }`}>
                        {p === 'AS' ? 'PHASE 1: AS' : p === 'TGS' ? 'PHASE 2: TGS' : 'PHASE 3: AP'}
                    </div>
                ))}
            </div>

            {/* Three nodes */}
            <div className="flex items-start justify-center gap-2 mt-12">
                {/* Client (User) */}
                <div className={`flex flex-col items-center transition-all duration-300`}>
                    <div className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center transition-all ${authenticated ? 'border-green-500 bg-green-500/10' : 'border-purple-500 bg-purple-500/10'
                        }`}>
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span className="text-[9px] text-gray-400 font-mono mt-1">CLIENT</span>
                </div>

                {/* Connection line 1 - Client <-> KDC */}
                <div className="relative w-12 h-11 flex items-center">
                    <div className="absolute top-5 left-0 right-0 border-t-2 border-dashed border-amber-500/30" />

                    {/* Packets to KDC (AS-REQ, TGS-REQ) */}
                    {(step === 0 || step === 2) && (
                        <div className="absolute top-4 left-0 animate-[packetRight_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
                        </div>
                    )}
                    {/* Packets from KDC (AS-REP, TGS-REP) */}
                    {(step === 1 || step === 3) && (
                        <div className="absolute top-4 right-0 animate-[packetLeft_0.35s_ease-out_forwards]">
                            <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-cyan-500 shadow-[0_0_8px_#22d3ee]' : 'bg-green-500 shadow-[0_0_8px_#22c55e]'}`} />
                        </div>
                    )}

                    <span className="absolute top-7 left-1/2 -translate-x-1/2 text-[8px] text-amber-400 font-mono whitespace-nowrap">TCP 88</span>

                    <style>{`
                        @keyframes packetRight { 
                            0% { left: 0; opacity: 1; } 
                            90% { opacity: 1; }
                            100% { left: calc(100% - 8px); opacity: 0.3; } 
                        }
                        @keyframes packetLeft { 
                            0% { right: 0; opacity: 1; } 
                            90% { opacity: 1; }
                            100% { right: calc(100% - 8px); opacity: 0.3; } 
                        }
                    `}</style>
                </div>

                {/* KDC (AS + TGS) */}
                <div className={`flex flex-col items-center transition-all duration-300`}>
                    <div className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center transition-all ${step > 3 ? 'border-green-500/50 bg-green-500/5' : 'border-amber-500 bg-amber-500/10'
                        }`}>
                        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <span className="text-[9px] text-gray-400 font-mono mt-1">KDC</span>
                    <span className="text-[8px] text-gray-600 font-mono">(AS/TGS)</span>
                </div>

                {/* Connection line 2 - Client <-> App Server (via dotted line through) */}
                <div className="relative w-12 h-11 flex items-center">
                    <div className={`absolute top-5 left-0 right-0 border-t-2 border-dashed transition-all ${step >= 4 ? 'border-cyan-500/50' : 'border-gray-700/30'}`} />

                    {/* AP-REQ */}
                    {step === 4 && (
                        <div className="absolute top-4 left-0 animate-[packetRight_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]" />
                        </div>
                    )}
                    {/* AP-REP */}
                    {step === 5 && (
                        <div className="absolute top-4 right-0 animate-[packetLeft_0.35s_ease-out_forwards]">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        </div>
                    )}

                    <span className="absolute top-7 left-1/2 -translate-x-1/2 text-[8px] text-cyan-400 font-mono whitespace-nowrap">Service</span>
                </div>

                {/* App Server */}
                <div className={`flex flex-col items-center transition-all duration-300 ${step >= 4 ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center transition-all ${authenticated ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-cyan-500 bg-cyan-500/10'
                        }`}>
                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                        </svg>
                    </div>
                    <span className="text-[9px] text-gray-400 font-mono mt-1">APP</span>
                    <span className="text-[8px] text-gray-600 font-mono">(Server)</span>
                </div>
            </div>

            {/* Current step display */}
            <div className="mt-2 h-14 flex flex-col items-center">
                {/* Step label */}
                <div className={`px-3 py-1 rounded-full border text-xs font-mono transition-all ${authenticated
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : 'border-cyan-500/50 bg-gray-900 text-cyan-400'
                    }`}>
                    {authenticated ? '✓ ACCESS GRANTED' : steps[step]?.label || 'Initializing...'}
                </div>
                {/* Step description */}
                <div className="mt-1 text-[10px] text-gray-500 font-mono">
                    {authenticated ? 'Service Ticket validated' : steps[step]?.desc || ''}
                </div>

                {/* Progress dots */}
                <div className="mt-1.5 flex gap-1">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i < step ? 'bg-green-500' :
                                i === step ? 'bg-cyan-500 animate-pulse' : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Status */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${authenticated ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500 whitespace-nowrap">
                    {authenticated ? 'AUTHENTICATED' : currentPhase === 'AS' ? 'GETTING TGT...' : currentPhase === 'TGS' ? 'GETTING SERVICE TICKET...' : 'ACCESSING SERVICE...'}
                </span>
            </div>
        </div>
    );
};

// ================== SYMMETRIC CRYPTOGRAPHY ANIMATION ==================
// Symmetric encryption - Alice & Bob with shared secret key
const SymmetricAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [step, setStep] = useState(0);
    const [decrypted, setDecrypted] = useState(false);

    const steps = [
        { label: 'Key Agreement', desc: 'Shared secret established' },
        { label: 'Plaintext Ready', desc: 'Alice prepares message' },
        { label: 'Encrypting...', desc: 'AES encryption with key' },
        { label: 'Transmitting', desc: 'Ciphertext over network' },
        { label: 'Decrypting...', desc: 'Bob uses same key' },
        { label: 'Decrypted ✓', desc: 'Message received' },
    ];

    useEffect(() => {
        let isMounted = true;
        const timeoutIds: NodeJS.Timeout[] = [];

        setStep(0);
        setDecrypted(false);

        steps.forEach((_, i) => {
            const timeoutId = setTimeout(() => {
                if (!isMounted) return;
                setStep(i);
                if (i === steps.length - 1) {
                    setTimeout(() => { if (isMounted) setDecrypted(true); }, 200);
                }
            }, 400 * (i + 1));
            timeoutIds.push(timeoutId);
        });

        return () => { isMounted = false; timeoutIds.forEach(id => clearTimeout(id)); };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <div className="absolute top-2 text-xs text-gray-400 font-mono">
                SYMMETRIC ENCRYPTION (AES)
            </div>

            {/* Shared Key indicator */}
            <div className={`absolute top-7 px-2 py-0.5 rounded border text-[9px] font-mono transition-all ${step >= 1 ? 'border-amber-500 bg-amber-500/20 text-amber-400' : 'border-gray-700 text-gray-600'
                }`}>
                🔑 SHARED KEY: s3cr3t_p@ss
            </div>

            {/* Main diagram */}
            <div className="flex items-center justify-center gap-3 mt-10">
                {/* Alice */}
                <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${step >= 2 && step <= 3 ? 'border-cyan-500 bg-cyan-500/10' : 'border-purple-500 bg-purple-500/10'
                        }`}>
                        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">ALICE</span>
                    {/* Key indicator */}
                    <div className={`mt-1 text-[9px] font-mono transition-all ${step >= 1 ? 'text-amber-400' : 'text-gray-700'}`}>
                        🔑
                    </div>
                    {/* Message state */}
                    <div className={`mt-1 px-1 py-0.5 rounded text-[8px] font-mono border transition-all ${step === 1 ? 'border-green-500 bg-green-500/20 text-green-400' :
                        step >= 2 ? 'border-gray-600 text-gray-600' : 'border-gray-800 text-gray-700'
                        }`}>
                        {step >= 2 ? '📄 Encrypted' : '📄 Plaintext'}
                    </div>
                </div>

                {/* Encryption Process & Network */}
                <div className="relative w-24 h-32 flex items-start justify-center">
                    {/* Network line */}
                    <div className="absolute top-4 left-0 right-0 border-t-2 border-dashed border-cyan-500/30" />

                    {/* Lock icon for encryption */}
                    {step === 2 && (
                        <div className="absolute top-0 left-3 animate-pulse">
                            <div className="text-[12px]">🔒</div>
                        </div>
                    )}

                    {/* Traveling ciphertext */}
                    {step === 3 && (
                        <div className="absolute top-2 left-0 animate-[packetRight_0.35s_ease-out_forwards]">
                            <div className="w-3 h-3 rounded bg-cyan-500 shadow-[0_0_8px_#22d3ee] flex items-center justify-center text-[6px]">
                                🔒
                            </div>
                        </div>
                    )}

                    {/* Unlock icon for decryption */}
                    {step === 4 && (
                        <div className="absolute top-0 right-3 animate-pulse">
                            <div className="text-[12px]">🔓</div>
                        </div>
                    )}

                    <span className="absolute top-7 left-1/2 -translate-x-1/2 text-[7px] text-gray-500 font-mono whitespace-nowrap">
                        UNSECURE NETWORK
                    </span>

                    {/* Mallory - Eavesdropper */}
                    <div className={`absolute top-11 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all ${step === 3 ? 'opacity-100' : 'opacity-60'}`}>
                        <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${step === 3 ? 'border-red-500 bg-red-500/20 animate-pulse' : 'border-red-500/50 bg-red-500/10'}`}>
                            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <span className="text-[9px] text-red-400 font-mono mt-0.5">MALLORY</span>
                        <span className={`text-[8px] font-mono ${step === 3 ? 'text-red-500 animate-pulse' : 'text-red-400'}`}>
                            {step === 3 ? 'EAVESDROPPING!' : '(Attacker)'}
                        </span>
                    </div>

                    <style>{`
                        @keyframes packetRight { 
                            0% { left: 0; opacity: 1; } 
                            100% { left: calc(100% - 12px); opacity: 0.5; } 
                        }
                    `}</style>
                </div>

                {/* Bob */}
                <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${decrypted ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]' :
                        step >= 4 ? 'border-cyan-500 bg-cyan-500/10' : 'border-blue-500 bg-blue-500/10'
                        }`}>
                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono mt-1">BOB</span>
                    {/* Key indicator */}
                    <div className={`mt-1 text-[9px] font-mono transition-all ${step >= 1 ? 'text-amber-400' : 'text-gray-700'}`}>
                        🔑
                    </div>
                    {/* Message state */}
                    <div className={`mt-1 px-1 py-0.5 rounded text-[8px] font-mono border transition-all ${decrypted ? 'border-green-500 bg-green-500/20 text-green-400' :
                        step >= 3 ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-gray-800 text-gray-700'
                        }`}>
                        {decrypted ? '📄 Plaintext ✓' : step >= 3 ? '🔒 Ciphertext' : '⏳ Waiting'}
                    </div>
                </div>
            </div>

            {/* Step display */}
            <div className="mt-3 flex flex-col items-center">
                <div className={`px-3 py-1 rounded-full border text-xs font-mono transition-all ${decrypted ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-cyan-500/50 bg-gray-900 text-cyan-400'
                    }`}>
                    {steps[step]?.label || 'Initializing...'}
                </div>
                <div className="mt-1 text-[10px] text-gray-500 font-mono">
                    {steps[step]?.desc || ''}
                </div>
                <div className="mt-2 flex gap-1">
                    {steps.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i < step ? 'bg-green-500' : i === step ? 'bg-cyan-500 animate-pulse' : 'bg-gray-700'
                            }`} />
                    ))}
                </div>
            </div>

            {/* Status */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${decrypted ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-500">
                    {decrypted ? 'SECURE EXCHANGE COMPLETE' : 'ENCRYPTING...'}
                </span>
            </div>
        </div>
    );
};

// ================== DDoS ANIMATION ==================
// Distributed Denial of Service attack visualization
const DDoSAnimation: React.FC<{ phase: string; accentColor: string }> = ({ phase }) => {
    const [step, setStep] = useState(0);
    const [packets, setPackets] = useState<{ id: number; from: number; progress: number; isAttacker: boolean }[]>([]);
    const [ringRotation, setRingRotation] = useState(0);

    // Nodes around the perimeter - mix of attackers (red) and legitimate (green)
    const nodes = [
        { id: 0, angle: 0, isAttacker: true },
        { id: 1, angle: 30, isAttacker: false },
        { id: 2, angle: 60, isAttacker: true },
        { id: 3, angle: 90, isAttacker: true },
        { id: 4, angle: 120, isAttacker: false },
        { id: 5, angle: 150, isAttacker: true },
        { id: 6, angle: 180, isAttacker: true },
        { id: 7, angle: 210, isAttacker: false },
        { id: 8, angle: 240, isAttacker: true },
        { id: 9, angle: 270, isAttacker: true },
        { id: 10, angle: 300, isAttacker: false },
        { id: 11, angle: 330, isAttacker: true },
    ];

    const attackerNodes = nodes.filter(n => n.isAttacker);
    const legitimateNodes = nodes.filter(n => !n.isAttacker);

    useEffect(() => {
        let isMounted = true;
        let packetId = 0;

        // Phase progression - very fast to show full attack
        const phaseTimers = [
            setTimeout(() => { if (isMounted) setStep(1); }, 200),
            setTimeout(() => { if (isMounted) setStep(2); }, 1000),
            setTimeout(() => { if (isMounted) setStep(3); }, 2000),
        ];

        // Increase load progress slowly over time - gradual fill
        const loadInterval = setInterval(() => {
            if (!isMounted) return;
            setRingRotation(prev => Math.min(prev + 1.5, 100)); // Slow steady fill
        }, 50);

        // Spawn packets from attacker nodes (red) and legitimate nodes (green)
        const spawnInterval = setInterval(() => {
            if (!isMounted) return;

            setStep(currentStep => {
                const newPackets: { id: number; from: number; progress: number; isAttacker: boolean }[] = [];

                // Always spawn some legitimate traffic (green)
                if (Math.random() > 0.5) {
                    const legitIndex = Math.floor(Math.random() * legitimateNodes.length);
                    newPackets.push({
                        id: packetId++,
                        from: legitimateNodes[legitIndex].id,
                        progress: 0,
                        isAttacker: false,
                    });
                }

                // Spawn attack traffic (red) - more when attack is active
                if (currentStep >= 1) {
                    const spawnCount = currentStep >= 2 ? 3 : 2;
                    for (let i = 0; i < spawnCount; i++) {
                        const attackerIndex = Math.floor(Math.random() * attackerNodes.length);
                        newPackets.push({
                            id: packetId++,
                            from: attackerNodes[attackerIndex].id,
                            progress: 0,
                            isAttacker: true,
                        });
                    }
                }

                if (newPackets.length > 0) {
                    setPackets(prev => [...prev.slice(-20), ...newPackets]);
                }
                return currentStep;
            });
        }, 150);

        // Move packets toward center
        const moveInterval = setInterval(() => {
            if (!isMounted) return;
            setPackets(prev =>
                prev
                    .map(p => ({ ...p, progress: p.progress + 4 }))
                    .filter(p => p.progress < 100)
            );
        }, 30);

        return () => {
            isMounted = false;
            phaseTimers.forEach(t => clearTimeout(t));
            clearInterval(loadInterval);
            clearInterval(spawnInterval);
            clearInterval(moveInterval);
        };
    }, []);

    // Get position from angle
    const getPos = (angle: number, radius: number) => {
        const rad = ((angle - 90) * Math.PI) / 180; // Start from top
        return {
            x: Math.cos(rad) * radius,
            y: Math.sin(rad) * radius,
        };
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Title */}
            <div className="absolute top-2 text-xs text-gray-400 font-mono">
                DDoS ATTACK SIMULATION
            </div>

            {/* Main visualization area */}
            <div className="relative w-64 h-64">
                {/* Outer ring of nodes (colored dots) */}
                {nodes.map(node => {
                    const pos = getPos(node.angle, 105);
                    const isActive = step >= 1 && node.isAttacker;
                    return (
                        <div
                            key={node.id}
                            className="absolute"
                            style={{
                                left: `calc(50% + ${pos.x}px)`,
                                top: `calc(50% + ${pos.y}px)`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <div
                                className={`w-4 h-4 rounded-full transition-all duration-300 ${node.isAttacker
                                    ? isActive
                                        ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                                        : 'bg-red-500/50'
                                    : 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.4)]'
                                    } ${isActive && step >= 2 ? 'animate-pulse' : ''}`}
                            />
                        </div>
                    );
                })}

                {/* Progress ring - fills up as attack progresses */}
                <svg
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24"
                    style={{ transform: 'translate(-50%, -50%) rotate(-90deg)' }}
                >
                    {/* Background circle */}
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="6"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke={ringRotation >= 66 ? '#ef4444' : ringRotation >= 33 ? '#f97316' : '#eab308'}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - ringRotation / 100)}`}
                        style={{ transition: 'stroke-dashoffset 0.1s ease-out, stroke 0.3s ease' }}
                    />
                </svg>

                {/* Global shake animation styles */}
                <style>{`
                    @keyframes violentShake {
                        0%, 100% { transform: translate(0, 0); }
                        25% { transform: translate(-3px, 0); }
                        50% { transform: translate(3px, 0); }
                        75% { transform: translate(0, -3px); }
                    }
                    .server-shake {
                        animation: violentShake 0.08s infinite linear !important;
                    }
                `}</style>

                {/* Central server (large circle) with shake animation */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className={`w-14 h-14 rounded-full flex flex-col items-center justify-center ${step >= 3 ? 'server-shake bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : ringRotation >= 50 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]'}`}
                    >
                        <span className="text-[10px] font-mono font-bold text-white">{Math.round(ringRotation)}%</span>
                    </div>
                </div>
                {/* Attack packets flying toward center */}
                {packets.map(packet => {
                    const node = nodes.find(n => n.id === packet.from);
                    if (!node) return null;
                    const startPos = getPos(node.angle, 95);
                    const currentX = startPos.x * (1 - packet.progress / 100);
                    const currentY = startPos.y * (1 - packet.progress / 100);

                    return (
                        <div
                            key={packet.id}
                            className={`absolute w-2 h-2 rounded-full ${packet.isAttacker ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{
                                left: `calc(50% + ${currentX}px)`,
                                top: `calc(50% + ${currentY}px)`,
                                transform: 'translate(-50%, -50%)',
                                opacity: 0.9,
                                boxShadow: packet.isAttacker ? '0 0 6px rgba(239,68,68,0.8)' : '0 0 6px rgba(34,197,94,0.8)',
                            }}
                        />
                    );
                })}
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-red-500' : step >= 1 ? 'bg-orange-500' : 'bg-green-500'} animate-pulse`} />
                <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
                    {step === 0 ? 'MONITORING...' : step === 1 ? 'ATTACK STARTING...' : step === 2 ? 'UNDER ATTACK' : 'SERVER DOWN'}
                </span>
            </div>
        </div>
    );
};

export default SensorIntro;

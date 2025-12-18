import React, { useEffect, useState } from 'react';
import { Shield, Search, Activity, RefreshCw, Zap, Lock, Globe, Terminal, AlertTriangle, Cpu, Target, Radar, Database } from 'lucide-react';

type SimulationPhase = 'KILL_CHAIN' | 'NIST_FRAMEWORK';

const NistSimulation: React.FC = () => {
  const [phase, setPhase] = useState<SimulationPhase>('NIST_FRAMEWORK');
  const [stepIndex, setStepIndex] = useState(0);
  const [systemHealth, setSystemHealth] = useState(100);
  const [isAlert, setIsAlert] = useState(false);

  const killChainSteps = [
    { name: 'RECONNAISSANCE', desc: 'DATA_GATHERING', icon: Radar, color: 'text-gray-500' },
    { name: 'WEAPONIZATION', desc: 'PAYLOAD_GEN', icon: Target, color: 'text-gray-500' },
    { name: 'DELIVERY', desc: 'PACKET_INJECTION', icon: Zap, color: 'text-nist-respond' },
    { name: 'EXPLOITATION', desc: 'VULN_TRIGGER', icon: AlertTriangle, color: 'text-nist-respond' },
    { name: 'INSTALLATION', desc: 'BACKDOOR_INIT', icon: Cpu, color: 'text-nist-respond' },
    { name: 'COMMAND & CONTROL', desc: 'BEACONING_ACTIVE', icon: Globe, color: 'text-nist-respond' },
    { name: 'ACTIONS', desc: 'DATA_EXFIL', icon: Terminal, color: 'text-nist-respond' },
  ];

  const nistSteps = [
    { name: 'IDENTIFY', desc: 'ASSET_DISCOVERY', icon: Search, color: 'text-nist-identify' },
    { name: 'PROTECT', desc: 'HARDENING_ACTIVE', icon: Shield, color: 'text-nist-protect' },
    { name: 'DETECT', desc: 'MONITORING_IOA', icon: Activity, color: 'text-nist-detect' },
    { name: 'RESPOND', desc: 'MITIGATION_SEQ', icon: Zap, color: 'text-nist-respond' },
    { name: 'RECOVER', desc: 'SYSTEM_RESTORE', icon: RefreshCw, color: 'text-nist-recover' },
  ];

  const currentSteps = phase === 'KILL_CHAIN' ? killChainSteps : nistSteps;

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1;
        
        // Phase Logic
        if (phase === 'KILL_CHAIN') {
          if (next >= killChainSteps.length) {
            setPhase('NIST_FRAMEWORK');
            setIsAlert(false);
            return 0;
          }
          // Attack progress visual impacts
          if (next >= 3) {
            setIsAlert(true);
            setSystemHealth(h => Math.max(15, h - 15));
          }
        } else {
          if (next >= nistSteps.length) {
            setPhase('KILL_CHAIN');
            return 0;
          }
          // Defense progress visual impacts
          if (next === 3) setIsAlert(false); // Respond starts fixing
          if (next === 4) setSystemHealth(100); // Recover restores
        }

        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-black/20 rounded-xl border border-edition-border/30 font-mono">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>

      {/* SYSTEM_INTEGRITY HUD (Top Left) */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-black/60 backdrop-blur-md border border-edition-border p-4 min-w-[160px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-2">System_Integrity</div>
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-display font-bold ${systemHealth < 50 ? 'text-nist-respond animate-pulse' : 'text-nist-recover'}`}>
              {systemHealth}%
            </span>
            <span className="text-[10px] text-gray-600 uppercase font-bold tracking-tight">Stable</span>
          </div>
        </div>
      </div>

      {/* STATUS HUD (Middle Left) */}
      <div className="absolute top-32 left-6 z-20">
        <div className="bg-black/60 backdrop-blur-md border border-edition-border p-4 min-w-[160px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-3">
            {phase === 'KILL_CHAIN' ? 'Kill_Chain_Progress' : 'Nist_Status'}
          </div>
          <div className="space-y-1.5">
            {currentSteps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${stepIndex === i ? (phase === 'KILL_CHAIN' ? 'bg-nist-respond' : s.color.replace('text-', 'bg-')) : 'bg-gray-800'}`}></div>
                <span className={`text-[9px] uppercase tracking-tighter ${stepIndex === i ? 'text-white' : 'text-gray-600'}`}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orbital Visualization */}
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        
        {/* Outer Ring - Recovery Layer */}
        <div className="absolute inset-0 rounded-full border border-white/[0.03]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={`px-3 py-1 bg-black border border-nist-recover/20 text-nist-recover text-[8px] font-bold rounded-full uppercase tracking-widest transition-opacity duration-700 ${phase === 'NIST_FRAMEWORK' && stepIndex === 4 ? 'opacity-100' : 'opacity-40'}`}>
              RECOVERY_STABLE
            </div>
          </div>
          {/* Scanning Node */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className={`absolute top-0 left-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${phase === 'KILL_CHAIN' ? 'text-nist-respond bg-nist-respond' : 'text-nist-recover bg-nist-recover'}`}></div>
          </div>
        </div>

        {/* Middle Ring - Anomaly Detection Layer */}
        <div className="absolute inset-[15%] rounded-full border border-dashed border-white/5">
           <div className="absolute top-10 right-10 flex items-center gap-2 animate-pulse">
              <div className="w-1 h-1 bg-nist-detect rounded-full"></div>
              <span className="text-[8px] text-nist-detect opacity-60">ANOMALY_04</span>
           </div>
           <div className="absolute bottom-12 left-6 flex items-center gap-2">
              <div className="w-1 h-1 bg-nist-detect rounded-full"></div>
              <span className="text-[8px] text-nist-detect opacity-60">ANOMALY_09</span>
           </div>
        </div>

        {/* Inner Ring - Protection Layer */}
        <div className={`absolute inset-[28%] rounded-full border transition-all duration-1000 ${isAlert ? 'border-nist-respond/30 scale-105' : 'border-nist-identify/10 scale-100'}`}>
           {/* Rotating Lock Icons during Protect phase */}
           {phase === 'NIST_FRAMEWORK' && stepIndex === 1 && (
             <div className="absolute inset-0 animate-spin">
                <Lock size={12} className="text-nist-protect absolute -top-1.5 left-1/2 -translate-x-1/2" />
                <Lock size={12} className="text-nist-protect absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
             </div>
           )}
        </div>

        {/* Core Identity / Step Circle */}
        <div className="relative z-20 flex flex-col items-center">
          <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${isAlert ? 'border-nist-respond bg-nist-respond/5 shadow-[0_0_40px_rgba(249,115,103,0.2)]' : 'border-nist-identify bg-black shadow-[0_0_40px_rgba(75,178,224,0.1)]'}`}>
            <div className={`absolute inset-0 rounded-full border animate-ping opacity-20 ${isAlert ? 'border-nist-respond' : 'border-nist-identify'}`}></div>
            
            {/* Active Icon */}
            {React.createElement(currentSteps[stepIndex].icon, {
              className: `w-12 h-12 transition-colors duration-500 ${isAlert ? 'text-nist-respond' : currentSteps[stepIndex].color}`,
              strokeWidth: 1.5
            })}
          </div>
          
          {/* Label Below Core */}
          <div className="absolute -bottom-16 w-max text-center">
            <div className={`text-[12px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${isAlert ? 'text-nist-respond' : currentSteps[stepIndex].color}`}>
              {currentSteps[stepIndex].name}
            </div>
            <div className="text-[9px] text-gray-500 tracking-[0.2em] mt-1.5 uppercase">
              {currentSteps[stepIndex].desc}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Telemetry */}
      <div className="absolute bottom-6 right-6 text-right z-20">
        <div className="flex items-center justify-end gap-2 text-nist-identify text-[10px] font-bold mb-1">
          <Database size={12} />
          NODE_SYNCHRONIZED
        </div>
        <div className="text-gray-600 text-[9px] leading-relaxed">
          SECURE_ENCLAVE: 0x4f...8a <br />
          FREQ: 2.44GHZ_WAVE
        </div>
      </div>
    </div>
  );
};

export default NistSimulation;
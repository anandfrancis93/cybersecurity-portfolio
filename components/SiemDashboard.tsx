import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, Activity, Server, Search, RefreshCw, AlertCircle, Globe, Lock } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  severity: 'INFO' | 'WARN' | 'CRIT';
  event: string;
  source: string;
  destination: string;
}

const SiemDashboard: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [eps, setEps] = useState(842); // Events per second
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'MED' | 'HIGH'>('MED');
  const [activeIncidents, setActiveIncidents] = useState(12);

  // Simulation logic
  useEffect(() => {
    const generateLog = () => {
      const severities: ('INFO' | 'WARN' | 'CRIT')[] = ['INFO', 'INFO', 'INFO', 'WARN', 'WARN', 'CRIT'];
      const events = [
        'PORT_SCAN_DETECTED', 'SSH_LOGIN_ATTEMPT', 'FIREWALL_DROP', 
        'MALWARE_SIGNATURE_MATCH', 'DATA_EXFILTRATION_ATTEMPT', 'PRIVILEGE_ESCALATION',
        'SQL_INJECTION_BLOCK', 'XSS_FILTER_TRIGGER', 'API_RATE_LIMIT_EXCEEDED'
      ];
      const randomIp = () => `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
      
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        severity: severities[Math.floor(Math.random() * severities.length)],
        event: events[Math.floor(Math.random() * events.length)],
        source: randomIp(),
        destination: '10.0.0.5' // Internal Server
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 6)); // Keep last 6
      setEps(prev => Math.max(0, prev + Math.floor(Math.random() * 40) - 20));
      
      // Randomly update active incidents slightly
      if (Math.random() > 0.7) {
          setActiveIncidents(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    };

    const interval = setInterval(generateLog, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl bg-[#030303] border border-edition-border/50 rounded-sm overflow-hidden font-mono text-xs shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-edition-border/50 p-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-edition-accent">
                <Shield size={14} className="animate-pulse" />
                <span className="font-bold tracking-widest">SIEM :: SENTINEL</span>
            </div>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">DASHBOARD_V.4.2</span>
        </div>
        <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-2 py-1 bg-green-900/20 border border-green-900/50 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-green-500 font-bold text-[10px]">LIVE</span>
             </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-px bg-edition-border/30">
         {/* EPS */}
         <div className="bg-[#050505] p-3 md:p-4">
            <div className="text-gray-500 mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider">
                <Activity size={10} /> EPS
            </div>
            <div className="text-lg md:text-xl text-white font-bold">{eps.toLocaleString()}</div>
         </div>
         {/* THREAT LEVEL */}
         <div className="bg-[#050505] p-3 md:p-4">
            <div className="text-gray-500 mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider">
                <AlertTriangle size={10} /> Threat Lvl
            </div>
            <div className={`text-lg md:text-xl font-bold ${threatLevel === 'HIGH' ? 'text-red-500' : 'text-yellow-500'}`}>
                {threatLevel}
            </div>
         </div>
         {/* INCIDENTS */}
         <div className="bg-[#050505] p-3 md:p-4">
            <div className="text-gray-500 mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider">
                <AlertCircle size={10} /> Incidents
            </div>
            <div className="text-lg md:text-xl text-edition-highlight font-bold">{activeIncidents}</div>
         </div>
         {/* ASSETS */}
         <div className="bg-[#050505] p-3 md:p-4">
            <div className="text-gray-500 mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider">
                <Server size={10} /> Monitored
            </div>
            <div className="text-lg md:text-xl text-white font-bold">142</div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-edition-border/30 border-t border-b border-edition-border/30">
          
          {/* Left: Charts / Visualization (Mocked) */}
          <div className="col-span-1 bg-[#050505] p-4 flex flex-col gap-6">
              <div>
                  <div className="text-gray-500 mb-3 text-[10px] uppercase tracking-wider flex justify-between">
                      <span>Traffic Volume</span>
                      <span className="text-edition-accent">High</span>
                  </div>
                  <div className="flex items-end gap-1 h-20 border-b border-edition-border/50 pb-1">
                      {[...Array(15)].map((_, i) => (
                          <div key={i} className="flex-1 bg-edition-accent/10 hover:bg-edition-accent/30 transition-colors relative group rounded-t-sm overflow-hidden">
                              <div className="absolute bottom-0 w-full bg-edition-accent/60" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                          </div>
                      ))}
                  </div>
              </div>
              
              <div>
                 <div className="text-gray-500 mb-3 text-[10px] uppercase tracking-wider flex items-center gap-2">
                     <Globe size={10} /> Geo Distribution
                 </div>
                 <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-gray-400">
                            <span>US-EAST-1</span>
                            <span>45%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[45%]"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-gray-400">
                            <span>CN-NORTH</span>
                            <span>30%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[30%]"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-gray-400">
                            <span>EU-WEST</span>
                            <span>25%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 w-[25%]"></div>
                        </div>
                    </div>
                 </div>
              </div>
          </div>

          {/* Right: Log Table */}
          <div className="col-span-2 bg-[#080808] p-4">
              <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-500 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                      <Search size={10} /> Live Event Stream
                  </div>
                  <RefreshCw size={10} className="text-gray-600 animate-spin-slow" />
              </div>
              
              <div className="w-full">
                  <div className="grid grid-cols-12 text-[9px] text-gray-600 uppercase tracking-wider pb-2 border-b border-gray-800 mb-2">
                      <div className="col-span-2">Time</div>
                      <div className="col-span-2">Level</div>
                      <div className="col-span-5">Event Signature</div>
                      <div className="col-span-3">Source IP</div>
                  </div>
                  <div className="space-y-1">
                      {logs.map((log) => (
                          <div key={log.id} className="grid grid-cols-12 text-[10px] items-center py-2 border-b border-gray-800/30 hover:bg-white/5 transition-colors cursor-default group">
                              <div className="col-span-2 text-gray-500 font-mono">{log.timestamp}</div>
                              <div className="col-span-2">
                                  <span className={`px-1.5 py-0.5 rounded-[1px] text-[9px] font-bold border ${
                                      log.severity === 'CRIT' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                                      log.severity === 'WARN' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                                      'bg-blue-500/10 text-blue-500 border-blue-500/30'
                                  }`}>
                                      {log.severity}
                                  </span>
                              </div>
                              <div className="col-span-5 text-gray-300 truncate group-hover:text-white transition-colors">{log.event}</div>
                              <div className="col-span-3 text-gray-500 font-mono">{log.source}</div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#0a0a0a] border-t border-edition-border/50 p-2 px-3 flex justify-between items-center text-[9px] text-gray-500 uppercase tracking-wider">
         <div className="flex gap-4">
             <span className="flex items-center gap-1"><Server size={8} /> CPU: 42%</span>
             <span className="flex items-center gap-1"><Activity size={8} /> MEM: 16.4GB</span>
             <span className="flex items-center gap-1"><Lock size={8} /> DISK: ENCRYPTED</span>
         </div>
         <div>
             SECURE_CONNECTION_ESTABLISHED
         </div>
      </div>
    </div>
  );
};

export default SiemDashboard;
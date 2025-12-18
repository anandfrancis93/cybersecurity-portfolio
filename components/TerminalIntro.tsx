import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

interface TerminalIntroProps {
    onComplete: () => void;
    moduleName: string;
    accentColor?: string;
}

const TerminalIntro: React.FC<TerminalIntroProps> = ({
    onComplete,
    moduleName,
    accentColor = 'text-nist-identify'
}) => {
    const [terminalLines, setTerminalLines] = useState<string[]>([]);

    useEffect(() => {
        const moduleUpper = moduleName.toUpperCase();

        const sequence = [
            { text: "ssh root@127.0.0.1", delay: 50 },
            { text: "root@127.0.0.1's password: *****************", delay: 200 },
            { text: "> AUTH_SUCCESS // Welcome back, Operator.", delay: 400 },
            { text: `> Accessing ${moduleUpper} module...`, delay: 600 },
            { text: `> [${moduleUpper}] ... OK`, delay: 900 },
            { text: "> Module operational.", delay: 1100 },
        ];

        const timeouts: NodeJS.Timeout[] = [];
        sequence.forEach((item) => {
            const t = setTimeout(() => {
                setTerminalLines((prev) => [...prev, item.text]);
            }, item.delay);
            timeouts.push(t);
        });

        const completeTimeout = setTimeout(() => {
            onComplete();
        }, 1500);
        timeouts.push(completeTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [onComplete, moduleName]);

    // Determine selection color based on module
    const selectionClass = `selection:bg-${moduleName === 'identify' ? 'nist-identify' :
        moduleName === 'protect' ? 'nist-protect' :
            moduleName === 'detect' ? 'nist-detect' :
                moduleName === 'respond' ? 'nist-respond' : 'nist-recover'} selection:text-black`;

    return (
        <div className={`fixed inset-0 bg-[#020202] text-white flex items-center justify-center p-4 z-[9999] ${selectionClass}`}>
            <div className="w-full max-w-xl bg-[#0a0a0a] border border-edition-border shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden animate-fade-in">
                <div className="bg-[#111] px-4 py-2 flex items-center gap-2 border-b border-edition-border">
                    <Terminal size={14} className="text-gray-500" />
                    <span className="text-xs text-gray-400 font-mono tracking-wider">&gt;_ {moduleName.toUpperCase()}_ACCESS</span>
                </div>
                <div className="p-6 min-h-[250px] font-mono text-sm leading-relaxed">
                    <div className="text-gray-500 mb-4 select-none">------------------------------------------------</div>
                    {terminalLines.map((line, i) => (
                        <div key={i} className={`${line.startsWith('>') ? accentColor : 'text-gray-300'}`}>
                            {line}
                        </div>
                    ))}
                    <div className={`${accentColor} animate-pulse mt-1 inline-block`}>_</div>
                </div>
            </div>
        </div>
    );
};

export default TerminalIntro;

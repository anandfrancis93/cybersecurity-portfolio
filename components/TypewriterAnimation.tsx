import React, { useEffect, useRef } from 'react';

const TypewriterAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 280;
        let height = 320;
        const dpr = Math.max(2, window.devicePixelRatio || 1);

        // Initial high-DPI setup
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = false;

        // Colors
        const COLOR_BLUE = '#3B82F6';
        const COLOR_DIM = 'rgba(255, 255, 255, 0.2)';
        const COLOR_PAPER = '#000000';
        const COLOR_PAPER_SHADOW = 'rgba(0, 0, 0, 0.5)';
        const COLOR_TYPEWRITER = '#1a1a1a';
        const COLOR_DARK = '#0a0a0a';

        // Article content - 38 cybersecurity topics
        const articles = [
            { title: 'CONFIDENTIALITY', subject: 'CIA Triad', body: 'Keeping sensitive information private and only accessible to those who should see it.' },
            { title: 'INTEGRITY', subject: 'CIA Triad', body: 'Making sure data stays accurate and unchanged unless modified by authorized users.' },
            { title: 'AVAILABILITY', subject: 'CIA Triad', body: 'Ensuring systems and data are working and accessible when people need them.' },
            { title: 'ZERO TRUST', subject: 'Architecture', body: 'A security model where nothing is trusted by default, even inside the network.' },
            { title: 'IAM', subject: 'Access Control', body: 'Identity and Access Management. Managing who can access what systems.' },
            { title: 'PKI', subject: 'Cryptography', body: 'Public Key Infrastructure. A system for managing digital certificates.' },
            { title: 'INCIDENT RESPONSE', subject: 'Operations', body: 'The process of detecting, investigating, and recovering from security breaches.' },
            { title: 'AAA', subject: 'Framework', body: 'Authentication, Authorization, Accounting. Verify who, what, and when.' },
            { title: 'THREAT ACTOR', subject: 'Intelligence', body: 'Anyone who poses a cybersecurity threat, from hackers to nation-states.' },
            { title: 'ATTACK SURFACE', subject: 'Risk', body: 'All the possible entry points where an attacker could try to break into a system.' },
            { title: 'ATTACK VECTOR', subject: 'Methodology', body: 'The specific method or path an attacker uses to gain unauthorized access.' },
            { title: 'ZERO-DAY', subject: 'Vulnerabilities', body: 'A security flaw that developers do not know about yet, making it very dangerous.' },
            { title: 'MALWARE', subject: 'Threats', body: 'Software designed to harm computers, including viruses, ransomware, and trojans.' },
            { title: 'ACL', subject: 'Access Control', body: 'Access Control List. Rules defining who can access what resources.' },
            { title: 'LEAST PRIVILEGE', subject: 'Principle', body: 'Giving users only the minimum access they need to do their job, nothing extra.' },
            { title: 'AIR-GAP', subject: 'Isolation', body: 'Physically disconnecting a computer from all networks for maximum security.' },
            { title: 'DATA SOVEREIGNTY', subject: 'Compliance', body: 'Data must follow the laws of the country where it is stored or processed.' },
            { title: 'DISASTER RECOVERY', subject: 'Continuity', body: 'Plans and procedures to restore systems and data after a major incident.' },
            { title: 'OSINT', subject: 'Intelligence', body: 'Open Source Intelligence. Gathering info from public sources.' },
            { title: 'PEN TESTING', subject: 'Assessment', body: 'Hiring ethical hackers to safely attack your systems and find weaknesses.' },
            { title: 'DIGITAL FORENSICS', subject: 'Investigation', body: 'The science of collecting and analyzing digital evidence after a cyber incident.' },
            { title: 'PROMPT INJECTION', subject: 'AI Security', body: 'Tricking AI chatbots into doing unintended things through specially crafted inputs.' },
            { title: 'STUXNET', subject: 'APT Malware', body: 'A famous worm created by governments to sabotage Iran nuclear facilities in 2010.' },
            { title: 'PEGASUS', subject: 'Spyware', body: 'Powerful spyware that can secretly take over phones without users clicking anything.' },
            { title: 'NOTPETYA', subject: 'Wiper', body: 'A 2017 attack disguised as ransomware that destroyed data worldwide, causing $10B damage.' },
            { title: 'WANNACRY', subject: 'Ransomware', body: 'A 2017 ransomware that spread globally, crippling hospitals and businesses.' },
            { title: 'SOLARWINDS', subject: 'Supply Chain', body: 'A 2020 attack where hackers hid malware in software updates, affecting thousands.' },
            { title: 'RED TEAM', subject: 'Offensive', body: 'Security professionals who simulate real attacks to test an organization defenses.' },
            { title: 'BLUE TEAM', subject: 'Defensive', body: 'Security professionals who defend systems and respond to attacks in real-time.' },
            { title: 'PURPLE TEAM', subject: 'Collaboration', body: 'Red and Blue teams working together to continuously improve security.' },
            { title: 'YELLOW TEAM', subject: 'Development', body: 'Developers who focus on building security into software from the beginning.' },
            { title: 'ORANGE TEAM', subject: 'Education', body: 'Teams that train employees to recognize phishing and other security threats.' },
            { title: 'WHITE TEAM', subject: 'Governance', body: 'Management that oversees security exercises and sets the rules.' },
            { title: 'RED HAT', subject: 'Vigilante', body: 'Hackers who fight back against malicious hackers using aggressive methods.' },
            { title: 'BLUE HAT', subject: 'External Tester', body: 'Outside security experts hired to find bugs before software is released.' },
            { title: 'GREEN HAT', subject: 'Newbie', body: 'Beginner hackers who are learning but may not understand the risks involved.' },
            { title: 'PURPLE HAT', subject: 'Self-Taught', body: 'Hackers who practice and improve their skills by testing their own systems.' },
            { title: 'PINK HAT', subject: 'Evaluator', body: 'Specialists who evaluate security systems with a focus on unique defensive methods.' },
            { title: 'DEFENSE-IN-DEPTH', subject: 'Strategy', body: 'Layered security. Using multiple defensive lines so if one fails, another stops the attack.' },
            { title: 'APT', subject: 'Threats', body: 'Advanced Persistent Threat. Sophisticated attackers who hide in a network for a long time.' },
            { title: 'SHADOW IT', subject: 'Risk', body: 'Tech used without IT approval. Employees using unauthorized apps or devices.' },
            { title: 'PAM', subject: 'Access Control', body: 'Privileged Access Management. Securing accounts with "god mode" access.' },
            { title: 'XDR', subject: 'Operations', body: 'Extended Detection and Response. A tool that collects data everywhere to spot attacks.' },
            { title: 'NIST CSF 2.0', subject: 'Framework', body: 'The standard framework for managing cyber risk: Govern, Identify, Protect, Detect, Respond, Recover.' },
            { title: 'WHITE BOX', subject: 'Testing', body: 'Security testing where the hacker has full knowledge of the system, including source code and diagrams.' },
            { title: 'BLACK BOX', subject: 'Testing', body: 'Security testing where the hacker has zero prior knowledge, simulating a real outside attack.' },
            { title: 'GREY BOX', subject: 'Testing', body: 'A blended testing approach where the hacker has some limited knowledge, like low-level credentials.' },
            { title: 'DEVSECOPS', subject: 'Methodology', body: 'Integrating security practices within the DevOps process. Security as code, from start to finish.' },
            { title: 'NON-REPUDIATION', subject: 'Integrity', body: 'Ensuring a sender cannot deny sending a message. Proof of origin and integrity.' },
            { title: 'SYMMETRIC ENCRYPTION', subject: 'Cryptography', body: 'Using the same secret key to both encrypt and decrypt information. Fast but requires key sharing.' },
            { title: 'ASYMMETRIC ENCRYPTION', subject: 'Cryptography', body: 'Using a pair of keys (Public and Private). One effectively locks, the other unlocks.' },
            { title: 'DIGITAL CERTIFICATE', subject: 'Identity', body: 'An electronic "passport" that verifies the identity of a user or server using PKI.' },
            { title: 'DIGITAL SIGNATURE', subject: 'Authentication', body: 'A cryptographic mark that validates the authenticity and integrity of a message or document.' },
            { title: 'PHISHING', subject: 'Social Engineering', body: 'Sending fraudulent emails that resemble reputable sources to steal sensitive data.' },
            { title: 'VISHING', subject: 'Social Engineering', body: 'Voice Phishing. Attackers use phone calls to trick victims into revealing info.' },
            { title: 'SMISHING', subject: 'Social Engineering', body: 'SMS Phishing. Deceptive text messages used to trick users into downloading malware.' },
            { title: 'WATERING HOLE', subject: 'Attack Vector', body: 'Infecting a website that a specific target group is known to visit regularly.' },
            { title: 'TYPOSQUATTING', subject: 'Social Engineering', body: 'URL Hijacking. Registering misspelled domain names (e.g., goggle.com) to trap users.' },
            { title: 'RANSOMWARE', subject: 'Malware', body: 'Malicious software that blocks access to a system until a sum of money is paid.' },
            { title: 'TROJAN', subject: 'Malware', body: 'Malware disguised as legitimate software. It hides inside harmless-looking apps.' },
            { title: 'WORM', subject: 'Malware', body: 'Self-replicating malware that spreads across networks without needing human interaction.' },
            { title: 'SPYWARE', subject: 'Malware', body: 'Software that secretly records user activity, passwords, and personal information.' },
            { title: 'VIRUS', subject: 'Malware', body: 'Malicious code that attaches itself to clean files and spreads when those files are run.' },
            { title: 'KEYLOGGER', subject: 'Spyware', body: 'Hardware or software that records every keystroke made on a computer.' },
            { title: 'LOGIC BOMB', subject: 'Malware', body: 'Malicious code inserted into a program that runs only when specific conditions are met.' },
            { title: 'ROOTKIT', subject: 'Malware', body: 'Tools designed to hide deep in the OS, giving attackers persistent "root" access.' },
            { title: 'DDOS', subject: 'Attack', body: 'Distributed Denial of Service. Overwhelming a server with traffic from many sources to crash it.' },
            { title: 'STEGANOGRAPHY', subject: 'Evasion', body: 'Hiding secret data within an ordinary file (like an image) to avoid detection.' },
            { title: 'TOKENIZATION', subject: 'Data Protection', body: 'Replacing sensitive data with a non-sensitive equivalent (token) that has no intrinsic value.' },
            { title: 'DATA MASKING', subject: 'Data Protection', body: 'Obfuscating specific data within a database so it remains usable but not personally identifiable.' },
            { title: 'HASHING', subject: 'Cryptography', body: 'Converting data into a fixed-size string of characters. A one-way fingerprint of data.' },
            { title: 'SALTING', subject: 'Cryptography', body: 'Adding random data to a password before hashing it to defend against dictionary attacks.' },
            { title: 'CVE', subject: 'Vulnerability', body: 'Common Vulnerabilities and Exposures. A list of publicly disclosed cybersecurity flaws.' },
            { title: 'CVSS', subject: 'Scoring', body: 'Common Vulnerability Scoring System. A standard for assessing the severity of security vulnerabilities.' },
            { title: 'DATA OWNER', subject: 'Governance', body: 'The individual or entity with legal ownership and ultimate responsibility for a specific set of data.' },
            { title: 'DATA CONTROLLER', subject: 'GDPR/Privacy', body: 'The entity that determines the purposes and means of processing personal data.' },
            { title: 'DATA PROCESSOR', subject: 'GDPR/Privacy', body: 'An entity that processes personal data on behalf of the Data Controller.' },
            { title: 'DATA CUSTODIAN', subject: 'Governance', body: 'Responsible for the safe custody, transport, and storage of data. Also called Data Steward.' },
            { title: 'DATA SUBJECT', subject: 'GDPR/Privacy', body: 'The individual whom the personal data is about. The person whose data is being processed.' },
            { title: 'SLE', subject: 'Risk Assessment', body: 'Single Loss Expectancy. The estimated financial loss from a single security incident. (AV x EF)' },
            { title: 'ARO', subject: 'Risk Assessment', body: 'Annualized Rate of Occurrence. How many times a specific threat is expected to happen in a year.' },
            { title: 'ALE', subject: 'Risk Assessment', body: 'Annualized Loss Expectancy. The total expected financial loss per year. (SLE x ARO)' },
            { title: 'RTO', subject: 'Recovery', body: 'Recovery Time Objective. The maximum acceptable amount of time to get systems back online.' },
            { title: 'RPO', subject: 'Recovery', body: 'Recovery Point Objective. The maximum acceptable amount of data loss measured in time.' },
            { title: 'MTTR', subject: 'Metrics', body: 'Mean Time To Repair. The average time it takes to fix a failed component or system.' },
            { title: 'MTBF', subject: 'Metrics', body: 'Mean Time Between Failures. The average time a system runs before it fails.' },
            { title: 'SLA', subject: 'Agreements', body: 'Service Level Agreement. A contract defining the level of service derived from a service provider.' },
            { title: 'MOA', subject: 'Agreements', body: 'Memorandum of Agreement. A legal document describing the terms of cooperation between parties.' },
            { title: 'MOU', subject: 'Agreements', body: 'Memorandum of Understanding. A formal agreement between parties expressing a convergence of will.' },
            { title: 'MSA', subject: 'Agreements', body: 'Master Service Agreement. A contract reaching an understanding on future transactions/agreements.' },
            { title: 'SOW', subject: 'Agreements', body: 'Statement of Work. A document defining project-specific activities, deliverables, and timelines.' },
            { title: 'BCP', subject: 'Resilience', body: 'Business Continuity Planning. Strategy to ensure operations continue during a disaster.' },
            { title: 'COOP', subject: 'Resilience', body: 'Continuity of Operations Planning. Federal term for ensuring mission-critical functions continue.' },
            { title: 'CYBERSECURITY', subject: 'Discipline', body: 'The practice of protecting systems, networks, and data from digital attacks, theft, and damage.' },
            { title: 'SHIFT LEFT', subject: 'DevSecOps', body: 'Integrating security earlier in the development lifecycle to catch vulnerabilities before deployment.' },
            { title: 'MITRE ATT&CK', subject: 'Framework', body: 'A knowledge base of adversary tactics and techniques based on real-world observations of cyberattacks.' },
            { title: 'MITRE ATLAS', subject: 'AI Security', body: 'Adversarial Threat Landscape for AI Systems. A framework for AI/ML security threats and mitigations.' }
        ];

        // Shred particle interface
        interface Shred {
            x: number;
            y: number;
            vx: number;
            vy: number;
            width: number;
            height: number;
            angle: number;
            rotSpeed: number;
        }

        let shreds: Shred[] = [];
        let phase: 'typing' | 'reading' | 'shredding' = 'typing';
        let currentArticleIndex = 0;
        let articleStartTime = performance.now();
        let frameCount = 0;
        let lastShredTime = 0;

        // Configuration
        const READING_TIME = 3000; // Time to read after typing finishes
        const SHREDDING_DURATION = 1500; // Time to shred the paper

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            frameCount++;

            const article = articles[currentArticleIndex];
            const now = performance.now();
            const elapsed = now - articleStartTime;

            const centerX = width / 2;

            // Typewriter dimensions
            const twWidth = width * 0.85;
            const twHeight = 65;
            const twTop = height - 80;
            const twLeft = (width - twWidth) / 2;

            // Paper dimensions
            const paperWidth = twWidth * 0.75;
            const paperMaxHeight = twTop - 30;
            const paperLeft = (width - paperWidth) / 2;

            // --- CALCULATE PHASES ---
            // 1. Typing Duration
            const typingDuration = 500 + article.title.length * 50 + 300 + (article.subject.length + 4) * 40 + 500 + article.body.length * 35;

            // 2. Determine current phase state based on elapsed time
            let paperYOffset = 0; // 0 = fully up, paperMaxHeight = fully down (shredded)

            if (elapsed < typingDuration) {
                phase = 'typing';
            } else if (elapsed < typingDuration + READING_TIME) {
                phase = 'reading';
            } else if (elapsed < typingDuration + READING_TIME + SHREDDING_DURATION) {
                phase = 'shredding';
            } else {
                // Cycle Complete -> Reset
                currentArticleIndex = (currentArticleIndex + 1) % articles.length;
                articleStartTime = now;
                shreds = []; // Clear shreds
                phase = 'typing';
                return requestAnimationFrame(draw); // Skip drawing this frame to avoid glitch
            }

            // Paper Animation Logic
            // Emergance (start)
            let paperVisibleHeight = paperMaxHeight;
            if (phase === 'typing' && elapsed < 1000) {
                paperVisibleHeight = paperMaxHeight * (elapsed / 1000);
            }

            // Shredding (end)
            if (phase === 'shredding') {
                const shredProgress = (elapsed - (typingDuration + READING_TIME)) / SHREDDING_DURATION;
                paperYOffset = paperMaxHeight * shredProgress; // Move paper down

                // Spawn shreds
                if (now - lastShredTime > 40 && paperYOffset < paperMaxHeight * 0.9) {
                    lastShredTime = now;
                    // Spawn a batch of shreds
                    for (let k = 0; k < 3; k++) {
                        shreds.push({
                            x: paperLeft + Math.random() * paperWidth,
                            y: twTop + twHeight - 10,
                            vx: (Math.random() - 0.5) * 2,
                            vy: Math.random() * 2 + 2,
                            width: Math.random() * 4 + 2,
                            height: Math.random() * 8 + 4,
                            angle: Math.random() * Math.PI * 2,
                            rotSpeed: (Math.random() - 0.5) * 0.2
                        });
                    }
                }
            }

            const paperTop = twTop - paperVisibleHeight + paperYOffset;

            // === DRAW PAPER (behind typewriter) ===
            // Clip paper so it doesn't draw below the typewriter slot entry
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, width, twTop + 10); // Clip everything below the slot line roughly
            ctx.clip();

            if (paperVisibleHeight - paperYOffset > 0) {
                // Paper shadow
                ctx.fillStyle = COLOR_PAPER_SHADOW;
                ctx.fillRect(paperLeft + 4, paperTop + 4, paperWidth, paperVisibleHeight);

                // Paper (dark)
                ctx.fillStyle = COLOR_PAPER;
                ctx.fillRect(paperLeft, paperTop, paperWidth, paperVisibleHeight);

                // Paper border
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
                ctx.lineWidth = 1;
                ctx.strokeRect(paperLeft, paperTop, paperWidth, paperVisibleHeight);

                // Start Text Logic
                const contentPadding = 25;
                let textY = paperTop + 25;

                ctx.textAlign = 'left';

                // 1. Title
                if (textY < twTop) { // Only draw if above typewriter body
                    // Dynamic font sizing
                    const maxTitleWidth = paperWidth - (contentPadding * 2);
                    let fontSize = 16;
                    ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

                    // Measure full title to determine scale (using full title length)
                    while (ctx.measureText(article.title).width > maxTitleWidth && fontSize > 10) {
                        fontSize--;
                        ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
                    }

                    const titleToShow = phase === 'typing' ? article.title.substring(0, Math.floor((elapsed - 300) / 40)) : article.title;
                    if (titleToShow.length > 0) {
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillText(titleToShow, paperLeft + contentPadding, textY);
                    }
                }

                textY += 25;

                // 2. Subject Line
                if (textY < twTop) {
                    ctx.font = '10px "JetBrains Mono", monospace';
                    const subjectStart = 300 + article.title.length * 50 + 200;
                    if (elapsed > subjectStart) {
                        const subjectToShow = phase === 'typing' ? `SUBJECT: ${article.subject}`.substring(0, Math.floor((elapsed - subjectStart) / 40)) : `SUBJECT: ${article.subject}`;
                        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
                        ctx.fillText(subjectToShow, paperLeft + contentPadding, textY);
                    }
                }

                textY += 10;
                // Divider
                if (textY < twTop && elapsed > 1000) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.fillRect(paperLeft + contentPadding, textY + 5, paperWidth - contentPadding * 2, 1);
                }
                textY += 20;

                // 3. Body Text
                if (textY < twTop) {
                    ctx.font = '11px "JetBrains Mono", monospace';
                    const bodyStart = 300 + article.title.length * 50 + 200 + (article.subject.length + 4) * 40 + 300;

                    if (elapsed > bodyStart) {
                        const bodyChars = phase === 'typing' ? Math.floor((elapsed - bodyStart) / 35) : article.body.length;
                        const words = article.body.split(' ');
                        let line = '';
                        let currentBodyChars = 0;

                        ctx.fillStyle = '#FFFFFF';

                        for (let i = 0; i < words.length; i++) {
                            if (currentBodyChars >= bodyChars) break;

                            const testLine = line + words[i] + ' ';
                            const metrics = ctx.measureText(testLine);
                            const maxWidth = paperWidth - contentPadding * 2;

                            if (metrics.width > maxWidth && i > 0) {
                                if (textY < twTop) ctx.fillText(line, paperLeft + contentPadding, textY);
                                line = words[i] + ' ';
                                textY += 16;
                            } else {
                                line = testLine;
                            }
                            currentBodyChars += words[i].length + 1;
                        }
                        if (line.length > 0 && textY < twTop && currentBodyChars <= bodyChars + 20) { // Slight buffer
                            ctx.fillText(line, paperLeft + contentPadding, textY);
                        }

                        // Cursor
                        if (phase === 'typing' && Math.floor(frameCount / 20) % 2 === 0) {
                            const lineWidth = ctx.measureText(line).width;
                            ctx.fillStyle = COLOR_BLUE;
                            if (textY < twTop) ctx.fillRect(paperLeft + contentPadding + lineWidth, textY - 10, 2, 14);
                        }
                    }
                }
            }
            ctx.restore(); // End clipping

            // === DRAW SHREDS (FALLING PARTICLES) ===
            if (shreds.length > 0) {
                for (let i = shreds.length - 1; i >= 0; i--) {
                    const s = shreds[i];
                    s.y += s.vy;
                    s.x += s.vx; // Slight drift
                    s.angle += s.rotSpeed;

                    ctx.save();
                    ctx.translate(s.x, s.y);
                    ctx.rotate(s.angle);
                    ctx.fillStyle = 'rgba(230, 230, 230, 0.9)'; // Paper color
                    ctx.fillRect(-s.width / 2, -s.height / 2, s.width, s.height);
                    ctx.restore();

                    // Remove if off screen
                    if (s.y > height + 20) {
                        shreds.splice(i, 1);
                    }
                }
            }

            // === DRAW TYPEWRITER ===
            ctx.fillStyle = COLOR_TYPEWRITER;
            ctx.beginPath();
            ctx.roundRect(twLeft, twTop, twWidth, twHeight, 8);
            ctx.fill();

            // Typewriter Detail: Slot
            ctx.fillStyle = COLOR_DARK;
            ctx.fillRect(twLeft + 10, twTop - 8, twWidth - 20, 12);

            // Paper slot
            ctx.fillStyle = 'rgba(20, 20, 25, 1)';
            ctx.fillRect(twLeft + twWidth * 0.2, twTop - 3, twWidth * 0.6, 6);

            // Keys area
            ctx.fillStyle = 'rgba(30, 30, 35, 1)';
            ctx.fillRect(twLeft + 15, twTop + 35, twWidth - 30, 20);

            // Individual keys - random pressing (slower, more realistic)
            const keyCount = 10;
            const keyWidth = (twWidth - 50) / keyCount;
            // Generate pseudo-random key press pattern - only while typing
            const isTyping = phase === 'typing' && elapsed < typingDuration;
            const pressedKey = isTyping ? Math.floor((Math.sin(frameCount * 0.03) * 5 + Math.cos(frameCount * 0.05) * 3 + 8) % keyCount) : -1;

            for (let i = 0; i < keyCount; i++) {
                const keyX = twLeft + 20 + i * keyWidth;
                const isPressed = i === pressedKey && Math.floor(frameCount / 15) % 2 === 0;
                ctx.fillStyle = isPressed ? 'rgba(80, 80, 90, 1)' : 'rgba(50, 50, 60, 1)';
                ctx.beginPath();
                ctx.roundRect(keyX, twTop + 37 + (isPressed ? 2 : 0), keyWidth - 4, 14, 2);
                ctx.fill();
            }

            // Decorative elements on typewriter
            ctx.fillStyle = COLOR_BLUE;
            ctx.beginPath();
            ctx.arc(twLeft + 25, twTop + 18, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(twLeft + twWidth - 25, twTop + 18, 4, 0, Math.PI * 2);
            ctx.fill();

            // Label
            ctx.font = 'bold 12px monospace';
            ctx.fillStyle = COLOR_BLUE;
            ctx.textAlign = 'center';
            ctx.fillText('INTEL BRIEFING', centerX, twTop + 22);
            ctx.textAlign = 'left';

            animationFrameId = requestAnimationFrame(draw);
        };

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            if (entry) {
                width = entry.contentRect.width;
                height = entry.contentRect.height;
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${width}px`;
                canvas.style.height = `${height}px`;
                ctx.scale(dpr, dpr);
            }
        });

        if (canvas.parentElement) {
            observer.observe(canvas.parentElement);
            const rect = canvas.parentElement.getBoundingClientRect();
            width = rect.width || 280;
            height = rect.height || 320;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        }

        animationFrameId = requestAnimationFrame(draw);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default TypewriterAnimation;

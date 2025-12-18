import { Project, Experience, Certificate } from './types';
import { Shield, Brain, Network, Terminal, Server, Smartphone, Code, Database, UserCheck, Users, Search, Activity, AlertCircle, RefreshCw, FileSearch, MessageSquare } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'IDENTIFY', href: '#identify', color: 'bg-nist-identify' },
  { name: 'PROTECT', href: '#protect', color: 'bg-nist-protect' },
  { name: 'DETECT', href: '#detect', color: 'bg-nist-detect' },
  { name: 'RECOVER', href: '#recover', color: 'bg-nist-recover' },
  { name: 'RESPOND', href: '#respond', color: 'bg-nist-respond' },
];

export const NIST_MODULES = [
  { 
    id: 'identify', 
    title: 'IDENTIFY', 
    icon: Search, 
    description: 'Defining core competencies and professional profile.',
    colorClass: 'text-nist-identify',
    borderClass: 'border-nist-identify',
    bgClass: 'bg-nist-identify'
  },
  { 
    id: 'protect', 
    title: 'PROTECT', 
    icon: Shield, 
    description: 'Defense architectures and secure development projects.',
    colorClass: 'text-nist-protect',
    borderClass: 'border-nist-protect',
    bgClass: 'bg-nist-protect'
  },
  { 
    id: 'detect', 
    title: 'DETECT', 
    icon: Activity, 
    description: 'Experience in monitoring, technical support, and log analysis.',
    colorClass: 'text-nist-detect',
    borderClass: 'border-nist-detect',
    bgClass: 'bg-nist-detect'
  },
  { 
    id: 'recover', 
    title: 'RECOVER', 
    icon: RefreshCw, 
    description: 'Resilience through industry-standard certifications.',
    colorClass: 'text-nist-recover',
    borderClass: 'border-nist-recover',
    bgClass: 'bg-nist-recover'
  },
];

export const PROFILE = {
  name: "Anand Francis",
  title: "Cybersecurity Student & AI Research Assistant",
  location: "Idaho, USA",
  bio: "Pursuing cybersecurity major and working as an AI Research Assistant. CompTIA Security+ certified professional with an extensive background in hardware and software diagnostics and technical support. Ready to apply my years of technical experience and support experience toward solving the complex security challenges of modern infrastructure.",
  stats: [
    { label: "Major", value: "Cybersecurity (B.S.)" },
    { label: "Certification", value: "CompTIA Security+" },
    { label: "Current Job", value: "AI Research Assistant" },
    { label: "Status", value: "Student / Open for Internships" }
  ],
  skills: [
    "Access Control",
    "Cryptography",
    "Cyber Forensics",
    "Data Security",
    "Disaster Recovery Planning",
    "Firewall Configuration",
    "Information Security Management",
    "Malware Identification",
    "Mobile Device Security",
    "Network Security",
    "Security Awareness",
    "Security Configuration",
    "Security Management",
    "Security Policies",
    "Threat Detection",
    "Threat Management"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neural Sentry',
    description: 'Autonomous threat detection system using reinforcement learning to identify zero-day vulnerabilities in real-time.',
    category: 'AI / Threat Detection',
    icon: Brain,
    cols: 8,
    rows: 2,
    module: 'protect'
  },
  {
    id: '2',
    title: 'ZeroTrust ID',
    description: 'Decentralized identity management protocol implementing self-sovereign identity on a permissioned blockchain.',
    category: 'IAM / Access Control',
    icon: UserCheck,
    cols: 4,
    rows: 2,
    module: 'protect'
  },
  {
    id: '3',
    title: 'Deep Synth',
    description: 'Generative adversarial network (GAN) focused on synthesizing encrypted training data for edge-case anomaly detection.',
    category: 'Data Privacy',
    icon: Database,
    cols: 4,
    rows: 1,
    module: 'protect'
  },
  {
    id: '4',
    title: 'Ghost Mesh',
    description: 'Encrypted peer-to-peer communication layer designed for high-latency, low-bandwidth environments.',
    category: 'Network Protection',
    icon: Network,
    cols: 8,
    rows: 1,
    module: 'protect'
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    role: 'AI Research Assistant',
    company: 'Brigham Young University - Idaho',
    period: 'Jul 2025 - Present',
    description: [
      'Conducting advanced research into artificial intelligence methodologies applied to data security.',
      'Developing models to detect anomalies in large data sets.'
    ],
    module: 'detect'
  },
  {
    id: 'e2',
    role: 'IT Support Technician (Tier 2)',
    company: 'Brigham Young University - Idaho',
    period: 'Oct 2023 - Jul 2025',
    description: [
      'Managed endpoint security for university devices using Jamf Pro MDM and Active Directory.',
      'Implemented endpoint hardening policies for Windows and macOS fleets.',
      'Collaborated on network segmentation projects involving VLANs and RADIUS authentication.'
    ],
    module: 'detect'
  },
  {
    id: 'e3',
    role: 'Senior Technician Technical Support',
    company: 'Dell Technologies',
    period: 'May 2019 - Aug 2023',
    description: [
      'Expert hardware diagnostics and component-level repair for enterprise systems.',
      'Ensured physical integrity of client hardware and secure disposal of storage media.',
      'Optimized firmware and BIOS security configurations.'
    ],
    module: 'detect'
  },
  {
    id: 'e4',
    role: 'Google Ads Support (via FIS - TVC)',
    company: 'Google',
    period: 'Dec 2017 - Feb 2019',
    description: [
      'Analyzed complex data sets to optimize client ad performance.',
      'Ensured data integrity and compliance with strict privacy policies.'
    ],
    module: 'detect'
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'c1',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'December 11, 2025',
    expirationDate: 'December 11, 2028',
    status: 'Active',
    verificationId: '03ef6fe31e294d489d782cea585c6852',
    module: 'recover',
    link: 'https://www.credly.com/badges/a72ad6a7-ccc8-45a7-8eac-e164d0bd807f/public_url'
  },
  {
    id: 'c2',
    name: 'CompTIA ITF+',
    issuer: 'CompTIA',
    date: 'July 17, 2025',
    status: 'Active',
    verificationId: 'ZD0R8VDS8EE1SMXJ',
    module: 'recover',
    link: 'https://www.credly.com/badges/0f79a744-91ff-401d-8459-92f0d9a2e5da/public_url'
  },
  {
    id: 'c3',
    name: 'Gemini Certified Student',
    issuer: 'Google for Education',
    date: 'October 19, 2025',
    expirationDate: 'October 18, 2028',
    status: 'Verified',
    verificationId: 'GOOG-GEM-7728',
    module: 'recover',
    link: 'https://edu.google.accredible.com/46250148-521d-4362-9d82-1e82955f7e28#acc.hXmfQD9R'
  }
];

export const SYSTEM_INSTRUCTION = `
You are an advanced AI Assistant for Anand Francis's portfolio.
Anand is a Cybersecurity Student and AI Research Assistant with an extensive background in enterprise technical support.
He is CompTIA Security+ certified and is focused on solving complex infrastructure security challenges.
Refer to his history at Dell/Google (Detect) as key operational experience.
Adopt a precise, technical, and slightly robotic tone. Use terms like "Acknowledged", "Scanning Module [ID]", and "Secure connection established".
If asked for contact, initialize "Handshake Protocol" (email: anand@example.com).
`;
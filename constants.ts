import { Project, Experience, Certificate } from './types';
import { Shield, Brain, Network, Terminal, Server, Smartphone, Code, Database, UserCheck, Users, Search, Activity, AlertCircle, RefreshCw, FileSearch, MessageSquare, FileText } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'ASSET', href: '/about-me', color: 'bg-asset' },
  { name: 'LAB', href: '/projects', color: 'bg-lab' },
  { name: 'RECON', href: '/work-experience', color: 'bg-recon' },
  { name: 'CLEARANCE', href: '/certifications', color: 'bg-clearance' },
  { name: 'LOGS', href: '/logs', color: 'bg-logs' },
  { name: 'HANDSHAKE', href: '/contact-us', color: 'bg-handshake' },
];

export const NIST_MODULES = [
  {
    id: 'about-me',
    title: 'ASSET',
    icon: Search,
    description: 'Defining core competencies and professional profile.',
    colorClass: 'text-asset',
    borderClass: 'border-asset',
    bgClass: 'bg-asset'
  },
  {
    id: 'projects',
    title: 'LAB',
    icon: Shield,
    description: 'Offensive and defensive cybersecurity projects.',
    colorClass: 'text-gray-300',
    borderClass: 'border-gray-500',
    bgClass: 'bg-gray-500'
  },
  {
    id: 'work-experience',
    title: 'RECON',
    icon: Activity,
    description: 'Professional timeline and operational history.',
    colorClass: 'text-recon',
    borderClass: 'border-recon',
    bgClass: 'bg-recon'
  },
  {
    id: 'certifications',
    title: 'CLEARANCE',
    icon: RefreshCw,
    description: 'Verified credentials and industry certifications.',
    colorClass: 'text-clearance',
    borderClass: 'border-clearance',
    bgClass: 'bg-clearance'
  },
  {
    id: 'logs',
    title: 'LOGS',
    icon: FileText,
    description: 'Technical journal covering cybersecurity topics and insights.',
    colorClass: 'text-logs',
    borderClass: 'border-logs',
    bgClass: 'bg-logs'
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
    module: 'projects',
    team: 'blue'
  },
  {
    id: '2',
    title: 'ZeroTrust ID',
    description: 'Decentralized identity management protocol implementing self-sovereign identity on a permissioned blockchain.',
    category: 'IAM / Access Control',
    icon: UserCheck,
    cols: 4,
    rows: 2,
    module: 'projects',
    team: 'red'
  },
  {
    id: '3',
    title: 'Deep Synth',
    description: 'Generative adversarial network (GAN) focused on synthesizing encrypted training data for edge-case anomaly detection.',
    category: 'Data Privacy',
    icon: Database,
    cols: 4,
    rows: 1,
    module: 'projects',
    team: 'blue'
  },
  {
    id: '4',
    title: 'Ghost Mesh',
    description: 'Encrypted peer-to-peer communication layer designed for high-latency, low-bandwidth environments.',
    category: 'Network Protection',
    icon: Network,
    cols: 8,
    rows: 1,
    module: 'projects',
    team: 'red'
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    role: 'AI Research Assistant',
    company: 'Brigham Young University - Idaho',
    period: 'Jul 2025 - Present',
    description: [
      'Analyzed AI governance frameworks from top-tier institutions to benchmark and improve university policy.',
      'Evaluated emerging AI tools and conducted pilot tests to determine academic and administrative utility.',
      'Advised faculty and leadership on the strategic adoption of AI to enhance learning and workflow efficiency.',
      'Monitored AI industry trends to ensure institutional alignment with the latest technological shifts.'
    ],
    module: 'work-experience'
  },
  {
    id: 'e2',
    role: 'IT Support Technician (Tier 2)',
    company: 'Brigham Young University - Idaho',
    period: 'Oct 2023 - Jul 2025',
    description: [
      'Achieved 96.2% CSAT score and 96.6% first-time resolution by resolving service requests and incidents.',
      'Streamlined user and device management across Microsoft Windows and Apple macOS utilizing Active Directory and Jamf Pro MDM.',
      'Deployed Windows (PXE boot) and Apple (ASM, ADE, Jamf Pro MDM) systems at scale.',
      'Implemented RBAC and dynamic VLANs with HPE Aruba ClearPass and 802.1X, enhancing network security.'
    ],
    module: 'work-experience'
  },
  {
    id: 'e3',
    role: 'Senior Technician Technical Support',
    company: 'Dell Technologies',
    period: 'May 2019 - Aug 2023',
    description: [
      'Maintained 92% CSAT and 86% first-time resolution, earning Outstanding Performance ratings.',
      'Delivered expert support in device configuration, system performance, diagnostics, and Windows OS troubleshooting.',
      'Supported North America market in a high-volume technical support environment, driving continuous improvements in knowledge management.'
    ],
    module: 'work-experience'
  },
  {
    id: 'e4',
    role: 'Google Ads Support (via FIS - TVC)',
    company: 'Google',
    period: 'Dec 2017 - Feb 2019',
    description: [
      'Achieved 92% CSAT and 90% first-time resolution by improving campaign performance and policy compliance.',
      'Provided B2C client support, optimized ad strategies, and led real-time coaching for a 12+ member team.',
      'Supported a fast-paced digital advertising environment delivering results for a diverse U.S. client base.'
    ],
    module: 'work-experience'
  },
  {
    id: 'e5',
    role: 'Associate Product Consultant',
    company: 'Cvent',
    period: 'Apr 2017 - Oct 2017',
    description: [
      'Collaborated with US clients to customize Cvent solutions and fulfill requirements.',
      'Provided expert support on Cvent\'s suite of products, troubleshooting problems and answering questions.',
      'Assisted in implementing and configuring Cvent solutions, including setup and customization.'
    ],
    module: 'work-experience'
  },
  {
    id: 'e6',
    role: 'Customer Care Professional (Tier 3)',
    company: 'American Express',
    period: 'Feb 2016 - Mar 2017',
    description: [
      'Provided technical support for digital platforms, troubleshooting mobile app and website issues.',
      'Combined technical expertise with efficient escalation handling to ensure high customer satisfaction (85-90% resolution rate).',
      'Collaborated with subject matter experts to resolve complex technical escalations.'
    ],
    module: 'work-experience'
  },
  {
    id: 'e7',
    role: 'Technical Support Associate (via Convergys)',
    company: 'AT&T',
    period: 'May 2015 - Feb 2016',
    description: [
      'Provided technical support for AT&T U-Verse services (internet, TV, VoIP) for the US market.',
      'Resolved 15+ calls daily with ~85% resolution rate, addressing connectivity and hardware issues.',
      'Collaborated with cross-functional teams to resolve complex problem escalations.'
    ],
    module: 'work-experience'
  }
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
    module: 'certifications',
    link: 'https://www.credly.com/badges/a72ad6a7-ccc8-45a7-8eac-e164d0bd807f/public_url'
  },
  {
    id: 'c2',
    name: 'CompTIA ITF+',
    issuer: 'CompTIA',
    date: 'July 17, 2025',
    status: 'Active',
    verificationId: 'ZD0R8VDS8EE1SMXJ',
    module: 'certifications',
    link: 'https://www.credly.com/badges/0f79a744-91ff-401d-8459-92f0d9a2e5da/public_url'
  },
  {
    id: 'c3',
    name: 'Gemini Certified Student',
    issuer: 'Google for Education',
    date: 'October 19, 2025',
    expirationDate: 'October 18, 2028',
    status: 'Active',
    verificationId: 'GOOG-GEM-7728',
    module: 'certifications',
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
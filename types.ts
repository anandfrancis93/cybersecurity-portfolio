import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  link?: string;
  cols?: number; // For Bento grid sizing (1-12)
  rows?: number; // For Bento grid sizing
  module: string; // NIST Framework Module ID
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  module: string; // NIST Framework Module ID
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  status: string;
  verificationId: string;
  module: string; // NIST Framework Module ID
  link?: string;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
}
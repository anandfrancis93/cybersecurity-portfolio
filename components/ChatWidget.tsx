import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Terminal, Loader2, Minimize2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';
import { useIntro } from '../contexts/IntroContext';

// Map routes to their accent colors
const ROUTE_COLORS: Record<string, { text: string; border: string; bg: string; hex: string }> = {
  '/about-me': { text: 'text-asset', border: 'border-asset', bg: 'bg-asset', hex: '#22D3EE' },
  '/projects': { text: 'text-lab', border: 'border-lab', bg: 'bg-lab', hex: '#A855F7' },
  '/work-experience': { text: 'text-recon', border: 'border-recon', bg: 'bg-recon', hex: '#F59E0B' },
  '/certifications': { text: 'text-clearance', border: 'border-clearance', bg: 'bg-clearance', hex: '#22C55E' },
  '/logs': { text: 'text-logs', border: 'border-logs', bg: 'bg-logs', hex: '#F43F5E' },
  '/contact-us': { text: 'text-handshake', border: 'border-handshake', bg: 'bg-handshake', hex: '#14B8A6' },
};

const DEFAULT_COLOR = { text: 'text-edition-accent', border: 'border-edition-accent', bg: 'bg-edition-accent', hex: '#00FF9D' };

const ChatWidget: React.FC = () => {
  const { isIntroComplete } = useIntro();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "> Terminal initialized.\n> Identity verified.\n> How may I assist you with the system architecture?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Get color based on current route
  const colors = ROUTE_COLORS[location.pathname] || DEFAULT_COLOR;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const historyContext = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const responseText = await sendMessageToGemini(userMsg.text, historyContext);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hide chat widget during intro animation
  if (!isIntroComplete) {
    return null;
  }

  return (
    <div className="fixed bottom-6 sm:bottom-8 right-3 sm:right-6 z-50 flex flex-col items-end font-mono">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`mb-3 sm:mb-4 w-[calc(100vw-24px)] sm:w-[380px] md:w-[400px] h-[70vh] sm:h-[500px] max-h-[600px] bg-black border ${colors.border}/30 flex flex-col overflow-hidden animate-slide-up`}
          style={{ boxShadow: `0 0 30px ${colors.hex}20` }}
        >
          {/* Header */}
          <div className={`p-2.5 sm:p-3 border-b ${colors.border}/30 flex justify-between items-center backdrop-blur-sm shrink-0`}
            style={{ backgroundColor: `${colors.hex}10` }}
          >
            <div className="flex items-center gap-2">
              <Terminal className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${colors.text}`} />
              <span className={`text-sm sm:text-base ${colors.text} uppercase tracking-widest truncate`}>SECURE_LINK <span className="hidden xs:inline">// V.2.0</span></span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`${colors.text}/50 hover:${colors.text} transition-colors p-1 -mr-1`}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-black/90">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] p-2.5 sm:p-3 text-sm sm:text-base md:text-lg whitespace-pre-wrap ${msg.role === MessageRole.USER
                    ? `${colors.bg}/10 ${colors.text} border ${colors.border}/30`
                    : 'text-gray-300'
                    }`}
                >
                  <span className="opacity-50 mr-2">{msg.role === MessageRole.USER ? 'USR \u003E' : 'SYS \u003E'}</span>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`text-sm sm:text-base ${colors.text} flex items-center gap-2 animate-pulse`}>
                  <span>SYS &gt; Processing Query</span>
                  <span className={`inline-block w-2 h-4 ${colors.bg}`}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className={`p-2.5 sm:p-3 border-t ${colors.border}/30 bg-black shrink-0`}>
            <div className="relative flex items-center gap-2">
              <span className={colors.text}>{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-600 font-mono focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`${colors.text} hover:text-white transition-colors disabled:opacity-30 p-1.5 -mr-1.5`}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-black border ${colors.border}/50 hover:${colors.border} transition-all duration-300 active:scale-95`}
        style={{ boxShadow: `0 0 15px ${colors.hex}30` }}
      >
        <div className={`absolute inset-0 ${colors.bg}/5`}></div>
        {isOpen ? (
          <X className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`} />
        ) : (
          <MessageSquare className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`} />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
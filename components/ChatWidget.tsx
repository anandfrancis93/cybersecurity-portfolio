import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Terminal, Loader2, Minimize2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';

const ChatWidget: React.FC = () => {
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-mono">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-black border border-edition-accent/30 flex flex-col overflow-hidden animate-slide-up shadow-[0_0_30px_rgba(0,255,157,0.1)]">
          {/* Header */}
          <div className="p-3 border-b border-edition-accent/30 flex justify-between items-center bg-edition-accent/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-edition-accent" />
              <span className="text-xs text-edition-accent uppercase tracking-widest">SECURE_LINK // V.2.0</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-edition-accent/50 hover:text-edition-accent transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/90">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] p-3 text-xs md:text-sm whitespace-pre-wrap ${
                    msg.role === MessageRole.USER
                      ? 'bg-edition-accent/10 text-edition-accent border border-edition-accent/30'
                      : 'text-gray-300'
                  }`}
                >
                  <span className="opacity-50 mr-2">{msg.role === MessageRole.USER ? 'USR >' : 'SYS >'}</span>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="text-xs text-edition-accent flex items-center gap-2 animate-pulse">
                  <span>SYS > Processing Query</span>
                  <span className="inline-block w-2 h-4 bg-edition-accent"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-edition-accent/30 bg-black">
            <div className="relative flex items-center gap-2">
              <span className="text-edition-accent">{'>'}</span>
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
                className="text-edition-accent hover:text-white transition-colors disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-black border border-edition-accent/50 hover:border-edition-accent transition-all duration-300 shadow-[0_0_15px_rgba(0,255,157,0.2)]"
      >
        <div className="absolute inset-0 bg-edition-accent/5"></div>
        {isOpen ? (
          <X className="w-6 h-6 text-edition-accent" />
        ) : (
          <MessageSquare className="w-6 h-6 text-edition-accent" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
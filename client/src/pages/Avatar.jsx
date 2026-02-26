import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Shield, Info, Loader2 } from 'lucide-react';
import { aiService } from '../services/api';

const Avatar = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'avatar', text: "Hello. I am the AI preservation of your loved one's memory. You can ask me about their values, stories, or experiences." }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const data = await aiService.getAvatarResponse(input);
            const avatarMsg = { id: Date.now() + 1, type: 'avatar', text: data.response };
            setMessages(prev => [...prev, avatarMsg]);
        } catch (error) {
            console.error('Chat failed:', error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="py-8 max-w-4xl mx-auto h-[calc(100-240px)] flex flex-col">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                        <Bot className="text-primary-700" />
                        Memory Avatar
                    </h1>
                    <p className="text-primary-600">Interact with preserved wisdom and personality.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold ring-1 ring-emerald-100">
                    <Shield size={14} />
                    <span>Ethical Safeguards Active</span>
                </div>
            </header>

            <div className="flex-1 card p-0 flex flex-col overflow-hidden shadow-2xl bg-white/50 backdrop-blur-xl border-primary-100">
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
                >
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] flex items-start gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.type === 'user' ? 'bg-primary-700 text-white' : 'bg-white border border-primary-100 text-primary-700'}`}>
                                        {msg.type === 'user' ? <User size={18} /> : <Bot size={18} />}
                                    </div>
                                    <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${msg.type === 'user' ? 'bg-primary-700 text-white rounded-tr-none' : 'bg-white border border-primary-100 text-primary-800 rounded-tl-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white border border-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                                    <Bot size={18} />
                                </div>
                                <div className="p-5 bg-white border border-primary-100 rounded-3xl rounded-tl-none flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-white border-t border-primary-100">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about memories, values, or life advice..."
                            className="w-full pl-6 pr-16 py-4 bg-primary-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary-200 transition-all font-medium"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-2 w-12 h-12 bg-primary-700 text-white rounded-xl flex items-center justify-center hover:bg-primary-800 transition-colors shadow-lg shadow-primary-200 active:scale-95"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                    <p className="text-[10px] text-primary-400 mt-4 text-center uppercase tracking-widest flex items-center justify-center gap-2">
                        <Info size={12} />
                        This AI is built from structured records & personality inputs providing a legacy bridge.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Avatar;

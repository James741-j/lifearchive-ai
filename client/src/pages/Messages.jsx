import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, Clock, User, Plus, X, Loader2, ArrowRight } from 'lucide-react';
import { messageService } from '../services/api';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [isScheduling, setIsScheduling] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await messageService.getMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-8">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Future Messages</h1>
                    <p className="text-primary-600">Send letters and wisdom to the future.</p>
                </div>
                <button
                    onClick={() => setIsScheduling(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    <span>Schedule New</span>
                </button>
            </header>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="animate-spin text-primary-500" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary-800">
                            <Clock className="text-primary-500" />
                            Pending Deliveries
                        </h2>
                        {messages.length === 0 ? (
                            <div className="card text-center py-12 bg-primary-50/50">
                                <Calendar size={48} className="mx-auto mb-4 text-primary-200" />
                                <p className="text-primary-500 font-medium">No messages scheduled yet.</p>
                                <button
                                    onClick={() => setIsScheduling(true)}
                                    className="mt-4 text-primary-700 font-bold hover:underline"
                                >
                                    Create your first future letter
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map(msg => (
                                    <FutureMessageItem key={msg.id} msg={msg} />
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary-800">
                            <Send className="text-primary-500" />
                            Quick Templates
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TemplateCard title="Birthday Wish" description="Schedule a message for a child's milestone birthday." />
                            <TemplateCard title="Anniversary Note" description="A surprise for your partner in 10 years." />
                            <TemplateCard title="Wisdom Legacy" description="General life advice for future generations." />
                            <TemplateCard title="Event Trigger" description="Deliver after a specific life event occurs." />
                        </div>
                    </section>
                </div>
            )}

            {isScheduling && (
                <ScheduleModal
                    onClose={() => setIsScheduling(false)}
                    onSuccess={() => {
                        fetchMessages();
                        setIsScheduling(false);
                    }}
                />
            )}
        </div>
    );
};

const FutureMessageItem = ({ msg }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card flex items-center justify-between p-6"
    >
        <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                <User size={20} />
            </div>
            <div>
                <h3 className="font-bold text-lg">{msg.recipient}</h3>
                <p className="text-primary-500 text-sm">{msg.subject}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-primary-700 text-sm uppercase tracking-widest">{new Date(msg.deliverDate).toLocaleDateString()}</p>
            <p className="text-xs text-primary-400">Scheduled {msg.createdAt}</p>
        </div>
    </motion.div>
);

const TemplateCard = ({ title, description }) => (
    <div className="card p-6 border-primary-50 hover:border-primary-200 group cursor-pointer">
        <h3 className="font-bold mb-2 group-hover:text-primary-700 transition-colors uppercase tracking-tight">{title}</h3>
        <p className="text-sm text-primary-500 mb-4">{description}</p>
        <div className="flex items-center gap-2 text-xs font-bold text-primary-400 group-hover:text-primary-700 transition-colors">
            USE TEMPLATE <ArrowRight size={14} />
        </div>
    </div>
);

const ScheduleModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        recipient: '',
        email: '',
        subject: '',
        content: '',
        deliverDate: '',
        trigger: 'Specific Date'
    });
    const [isScheduling, setIsScheduling] = useState(false);

    const handleSubmit = async () => {
        if (!formData.recipient || !formData.content || !formData.deliverDate) return;

        setIsScheduling(true);
        try {
            await messageService.scheduleMessage(formData);
            onSuccess();
        } catch (error) {
            console.error('Scheduling failed:', error);
        } finally {
            setIsScheduling(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl w-full max-w-3xl relative z-10 p-8 shadow-2xl overflow-hidden"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Schedule Future Message</h2>
                    <button onClick={onClose} className="p-2 hover:bg-primary-50 rounded-full"><X size={20} /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-primary-700 mb-2">Recipient Name</label>
                            <input
                                type="text"
                                value={formData.recipient}
                                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                                className="w-full px-4 py-3 bg-primary-50 border-none rounded-xl outline-none"
                                placeholder="Who is this for?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-primary-700 mb-2">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 bg-primary-50 border-none rounded-xl outline-none"
                                placeholder="Subject of the message"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-primary-700 mb-2">Delivery Trigger</label>
                            <select
                                value={formData.trigger}
                                onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                                className="w-full px-4 py-3 bg-primary-50 border-none rounded-xl outline-none appearance-none"
                            >
                                <option>Specific Date</option>
                                <option>21st Birthday</option>
                                <option>Graduation Milestone</option>
                                <option>Custom Milestone</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-primary-700 mb-2">Delivery Date</label>
                            <input
                                type="date"
                                value={formData.deliverDate}
                                onChange={(e) => setFormData({ ...formData, deliverDate: e.target.value })}
                                className="w-full px-4 py-3 bg-primary-50 border-none rounded-xl outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-primary-700 mb-2">Your Message</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full h-[256px] px-4 py-3 bg-primary-50 border-none rounded-2xl outline-none resize-none"
                            placeholder="Write something meaningful for the future..."
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-3 font-bold text-primary-600">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={isScheduling}
                        className="btn-primary flex items-center gap-2 min-w-[180px] justify-center"
                    >
                        {isScheduling ? <Loader2 className="animate-spin" size={20} /> : 'Schedule Message'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Messages;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Video, Mic, FileText, Plus, Loader2 } from 'lucide-react';
import { vaultService } from '../services/api';

const Vault = () => {
    const [memories, setMemories] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMemories();
    }, []);

    const fetchMemories = async () => {
        try {
            const data = await vaultService.getMemories();
            setMemories(data);
        } catch (error) {
            console.error('Error fetching memories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-8">
            <header className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Smart Memory Vault</h1>
                    <p className="text-primary-600">Securely archive and organize your life's milestones.</p>
                </div>
                <button
                    onClick={() => setIsUploading(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    <span>New Memory</span>
                </button>
            </header>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="animate-spin text-primary-500" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Memory Grid */}
                    <div className="card aspect-square flex flex-col items-center justify-center border-dashed border-2 text-primary-400 group cursor-pointer hover:border-primary-400" onClick={() => setIsUploading(true)}>
                        <Upload size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                        <p className="font-medium">Archiving a moment...</p>
                    </div>

                    {memories.map(memory => (
                        <MemoryCard
                            key={memory.id}
                            title={memory.title}
                            type={memory.type}
                            date={new Date(memory.date).toLocaleDateString()}
                        />
                    ))}

                    {/* Visual placeholders if empty */}
                    {memories.length === 0 && (
                        <>
                            <MemoryCard title="Family Vacation 2024" type="image" date="June 12, 2024" opacity="opacity-40" />
                            <MemoryCard title="Message to my Daughter" type="video" date="May 20, 2025" opacity="opacity-40" />
                        </>
                    )}
                </div>
            )}

            {isUploading && (
                <UploadModal
                    onClose={() => setIsUploading(false)}
                    onSuccess={() => {
                        fetchMemories();
                        setIsUploading(false);
                    }}
                />
            )}
        </div>
    );
};

const MemoryCard = ({ title, type, date, opacity = "" }) => (
    <motion.div
        whileHover={{ y: -8 }}
        className={`card group cursor-pointer ${opacity}`}
    >
        <div className="bg-primary-50 aspect-video rounded-xl mb-4 flex items-center justify-center text-primary-300 overflow-hidden">
            {type === 'image' && <ImageIcon size={40} />}
            {type === 'video' && <Video size={40} />}
            {type === 'audio' && <Mic size={40} />}
            {type === 'document' && <FileText size={40} />}
        </div>
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary-700 transition-colors uppercase tracking-tight">{title}</h3>
        <p className="text-sm text-primary-500">{date}</p>
    </motion.div>
);

const UploadModal = ({ onClose, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('image');
    const [file, setFile] = useState(null);
    const [isPreserving, setIsPreserving] = useState(false);

    const handlePreserve = async () => {
        if (!file && type !== 'text') return;

        setIsPreserving(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('type', type);
        if (file) formData.append('file', file);

        try {
            await vaultService.uploadMemory(formData);
            onSuccess();
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsPreserving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl w-full max-w-2xl relative z-10 p-8 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">New Memory</h2>
                    <button onClick={onClose} className="p-2 hover:bg-primary-50 rounded-full"><X size={20} /></button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <UploadType active={type === 'image'} onClick={() => setType('image')} icon={<ImageIcon />} label="Photo" color="bg-blue-50 text-blue-600" />
                    <UploadType active={type === 'video'} onClick={() => setType('video')} icon={<Video />} label="Video" color="bg-purple-50 text-purple-600" />
                    <UploadType active={type === 'audio'} onClick={() => setType('audio')} icon={<Mic />} label="Voice" color="bg-orange-50 text-orange-600" />
                    <UploadType active={type === 'document'} onClick={() => setType('document')} icon={<FileText />} label="Legacy Doc" color="bg-emerald-50 text-emerald-600" />
                </div>

                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-primary-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-primary-50 border-none rounded-xl focus:ring-2 focus:ring-primary-300 outline-none transition-all"
                            placeholder="What's this memory called?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-primary-700 mb-2">Select File</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full text-sm text-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-3 font-bold text-primary-600">Cancel</button>
                    <button
                        onClick={handlePreserve}
                        disabled={isPreserving}
                        className="btn-primary flex items-center gap-2 min-w-[140px] justify-center"
                    >
                        {isPreserving ? <Loader2 className="animate-spin" size={20} /> : 'Preserve'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const UploadType = ({ icon, label, color, onClick, active }) => (
    <div className="flex flex-col items-center gap-2" onClick={onClick}>
        <div className={`w-16 h-16 ${color} ${active ? 'ring-4 ring-offset-2 ring-primary-300' : ''} rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}>
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-primary-900' : 'text-primary-400'}`}>{label}</span>
    </div>
);

export default Vault;

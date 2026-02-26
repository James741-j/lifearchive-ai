import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Download, FileText, Music, Play, Loader2, ChevronRight } from 'lucide-react';
import { aiService } from '../services/api';

const LifeStory = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [story, setStory] = useState(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const data = await aiService.generateStory({ theme: 'inspirational' });
            setStory(data);
        } catch (error) {
            console.error('Generation failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Life Story Generator</h1>
                <p className="text-primary-600">AI-curated narratives woven from your preserved memories.</p>
            </header>

            {!story ? (
                <div className="max-w-3xl mx-auto text-center py-20 bg-white rounded-3xl border border-primary-100 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800"></div>
                    <BookOpen size={64} className="mx-auto mb-6 text-primary-200" />
                    <h2 className="text-3xl font-bold mb-4">Your Story is Waiting to be Told</h2>
                    <p className="text-primary-600 mb-10 max-w-lg mx-auto leading-relaxed">
                        Our AI analyzes your stored photos, videos, and notes to create a beautifully structured autobiography draft.
                    </p>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="btn-primary flex items-center gap-3 mx-auto text-lg px-8 py-4"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
                        <span>{isGenerating ? 'Analyzing Life Patterns...' : 'Generate My Life Story'}</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-12 prose prose-stone max-w-none shadow-2xl"
                        >
                            <h1 className="text-5xl font-serif font-bold text-primary-900 mb-8 leading-tight italic">{story.title}</h1>
                            <div className="space-y-6 text-lg text-primary-800 leading-loose">
                                {story.chapters.map((chapter, idx) => (
                                    <div key={idx} className="mb-12">
                                        <h3 className="text-2xl font-bold text-primary-700 mb-4 border-b border-primary-100 pb-2">{chapter.title}</h3>
                                        <p>{chapter.content}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Download className="text-primary-500" />
                            Preservation Formats
                        </h2>
                        <FormatCard icon={<FileText />} title="PDF Biography" description="Printable 40-page book draft." />
                        <FormatCard icon={<Download />} title="Digital Archive" description="Interactive web experience." />
                        <FormatCard icon={<Music />} title="Audio Narration" description="AI voice read-through." />

                        <div className="pt-8">
                            <button
                                onClick={() => setStory(null)}
                                className="w-full py-4 border-2 border-primary-200 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-colors"
                            >
                                Regenerate Narrative
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const FormatCard = ({ icon, title, description }) => (
    <div className="card p-4 flex items-center gap-4 hover:border-primary-400 cursor-pointer group">
        <div className="p-3 bg-primary-100 rounded-xl text-primary-700 group-hover:bg-primary-700 group-hover:text-white transition-colors">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <h3 className="font-bold text-sm uppercase tracking-tight">{title}</h3>
            <p className="text-xs text-primary-500">{description}</p>
        </div>
    </div>
);

export default LifeStory;

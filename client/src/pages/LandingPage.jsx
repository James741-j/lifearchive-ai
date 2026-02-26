import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="pt-20 pb-32">
            <div className="text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary-700 uppercase bg-primary-100 rounded-full">
                        The Future of Memory Preservation
                    </span>
                    <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                        Your Life. Your Legacy. <br />
                        <span className="text-primary-500 italic">Preserved Forever.</span>
                    </h1>
                    <p className="text-xl text-primary-600 mb-12 max-w-2xl mx-auto leading-relaxed font-sans">
                        Securely store your most precious memories, schedule future messages, and build a digital legacy that lives on for generations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/vault" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                            Begin Your Archive <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;

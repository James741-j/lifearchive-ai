import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Landmark, Shield, List, ArrowRight, Download, Plus, CheckCircle2 } from 'lucide-react';

const DigitalWill = () => {
    return (
        <div className="py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Digital Will Assistant</h1>
                <p className="text-primary-600">Organize your digital assets and legal documents in a structured legacy template.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-8">
                    <section className="card">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Landmark className="text-primary-700" />
                            Asset Inventory
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AssetCategory
                                icon={<Shield size={20} />}
                                title="Financial Accounts"
                                count="4 Accounts"
                                percent={85}
                            />
                            <AssetCategory
                                icon={<FileText size={20} />}
                                title="Legal Documents"
                                count="2 Documents"
                                percent={40}
                            />
                            <AssetCategory
                                icon={<List size={20} />}
                                title="Digital Properties"
                                count="12 Items"
                                percent={60}
                            />
                            <AssetCategory
                                icon={<Plus size={20} />}
                                title="Intellectual Property"
                                count="Setup Required"
                                percent={0}
                            />
                        </div>
                    </section>

                    <section className="card border-primary-100 bg-primary-50/30">
                        <h2 className="text-2xl font-bold mb-6">Will Generation Progress</h2>
                        <div className="space-y-6">
                            <ProgressItem label="Executor Assignment" completed={true} />
                            <ProgressItem label="Asset Categorization" completed={true} />
                            <ProgressItem label="Instruction for Heirs" completed={false} />
                        </div>
                        <div className="mt-10 pt-8 border-t border-primary-100 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-1">Status</p>
                                <p className="font-bold text-lg text-primary-900">72% Completed</p>
                            </div>
                            <button className="btn-primary flex items-center gap-2">
                                <Download size={20} />
                                Export Will Draft
                            </button>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="card border-gold-200 bg-gold-50/20 shadow-lg shadow-gold-100">
                        <h3 className="text-xl font-bold text-gold-900 mb-4">Legal Disclaimer</h3>
                        <p className="text-sm text-gold-700 leading-relaxed mb-6">
                            "This assistant is a structural tool for organization. We do not provide legal advice. Please consult with a certified estate attorney to finalize your legal will."
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-gold-800">
                            LEARN MORE <ArrowRight size={14} />
                        </div>
                    </section>

                    <section className="card">
                        <h3 className="text-xl font-bold mb-6">Executor Contact</h3>
                        <div className="p-4 bg-primary-50 rounded-2xl">
                            <p className="font-bold text-sm mb-1">Marcus Thorne</p>
                            <p className="text-xs text-primary-500 mb-3">m.thorne@legal.com</p>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                Primary Executor
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const AssetCategory = ({ icon, title, count, percent }) => (
    <div className="p-6 bg-white border border-primary-100 rounded-3xl hover:border-primary-400 hover:shadow-xl transition-all group cursor-pointer">
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-50 text-primary-700 rounded-2xl flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-colors">
                {icon}
            </div>
            <span className="text-xs font-bold text-primary-400 uppercase">{count}</span>
        </div>
        <h4 className="font-bold mb-4">{title}</h4>
        <div className="w-full h-1.5 bg-primary-50 rounded-full overflow-hidden">
            <div className="h-full bg-primary-700 transition-all duration-1000" style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

const ProgressItem = ({ label, completed }) => (
    <div className="flex items-center justify-between">
        <span className={`font-medium ${completed ? 'text-primary-900' : 'text-primary-400 italic'}`}>{label}</span>
        {completed ? (
            <CheckCircle2 className="text-emerald-500" size={20} />
        ) : (
            <div className="w-5 h-5 border-2 border-primary-200 rounded-full" />
        )}
    </div>
);

export default DigitalWill;

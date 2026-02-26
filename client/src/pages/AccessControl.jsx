import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, User, Lock, Eye, EyeOff, Plus, Trash2, ShieldCheck } from 'lucide-react';

const AccessControl = () => {
    const [trustees, setTrustees] = useState([
        { id: 1, name: 'Sarah Miller', relation: 'Spouse', access: 'Full Archive', status: 'Verified' },
        { id: 2, name: 'David Jones', relation: 'Brother', access: 'Legal Documents Only', status: 'Pending Verification' }
    ]);

    return (
        <div className="py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Legacy Access Control</h1>
                <p className="text-primary-600">Define who inherits your digital archive and when they gain access.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="card">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <User className="text-primary-600" />
                                Designated Trustees
                            </h2>
                            <button className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                                <Plus size={18} />
                                Add Trustee
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-primary-100 text-xs font-bold text-primary-400 uppercase tracking-widest">
                                        <th className="pb-4">Name</th>
                                        <th className="pb-4">Relation</th>
                                        <th className="pb-4">Access Level</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary-50">
                                    {trustees.map(t => (
                                        <tr key={t.id} className="group hover:bg-primary-50/50 transition-colors">
                                            <td className="py-4 font-bold">{t.name}</td>
                                            <td className="py-4 text-primary-500">{t.relation}</td>
                                            <td className="py-4">
                                                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-[10px] font-bold uppercase tracking-tight">
                                                    {t.access}
                                                </span>
                                            </td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${t.status === 'Verified' ? 'bg-emerald-500' : 'bg-orange-400'}`}></div>
                                                    <span className="text-xs text-primary-600 font-medium">{t.status}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button className="p-2 text-primary-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="card border-primary-100 bg-primary-50/30">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Lock className="text-gold-500" />
                            Emergency Access Rules
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RuleCard
                                title="Inactivity Trigger"
                                description="Activate legacy access after 6 months of account inactivity."
                                active={true}
                            />
                            <RuleCard
                                title="Multi-Sig Verification"
                                description="Require 2 out of 3 trustees to confirm a verification request."
                                active={false}
                            />
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="card bg-emerald-900 text-white border-none shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold">Security Status</h3>
                        </div>
                        <ul className="space-y-4 text-sm text-emerald-100">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                256-bit AES Encryption Active
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                Zero-Knowledge Architecture
                            </li>
                            <li className="flex items-center gap-3 opacity-50">
                                <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                                Digital Social Proofing (Recommended)
                            </li>
                        </ul>
                    </section>

                    <section className="card">
                        <h3 className="text-xl font-bold mb-4">MFA Settings</h3>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                                <span className="font-bold text-sm">Biometric Unlock</span>
                                <div className="w-10 h-5 bg-primary-700 rounded-full relative">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                                <span className="font-bold text-sm">Security Key (FIDO)</span>
                                <Plus size={16} />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const RuleCard = ({ title, description, active }) => (
    <div className={`p-6 rounded-2xl border-2 transition-all ${active ? 'border-primary-400 bg-white' : 'border-primary-100 bg-primary-50'}`}>
        <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold">{title}</h4>
            <div className={`w-4 h-4 rounded-full border-4 ${active ? 'border-primary-700 bg-primary-700' : 'border-primary-200 bg-white'}`}></div>
        </div>
        <p className="text-sm text-primary-500 leading-relaxed">{description}</p>
    </div>
);

export default AccessControl;

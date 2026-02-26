import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Milestone, History, Calendar, Star } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Timeline = () => {
    const chartData = {
        labels: ['2015', '2017', '2019', '2021', '2023', '2025'],
        datasets: [
            {
                fill: true,
                label: 'Emotional Growth Index',
                data: [65, 59, 80, 81, 75, 95],
                borderColor: '#6d8396',
                backgroundColor: 'rgba(109, 131, 150, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        }
    };

    return (
        <div className="py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Emotional Timeline</h1>
                <p className="text-primary-600">Visualizing your life's journey and emotional patterns.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="card">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <TrendingUp className="text-sage-500" />
                                Happiness Trends
                            </h2>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-primary-100 rounded-full text-xs font-bold text-primary-600">All Time</span>
                            </div>
                        </div>
                        <div className="h-80">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <History className="text-gold-500" />
                            Life Milestones
                        </h2>
                        <div className="relative border-l-2 border-primary-100 ml-4 pl-8 space-y-12 py-4">
                            <TimelineEvent
                                year="2026"
                                title="LifeArchive Launched"
                                description="Started preservation of digital legacy."
                                icon={<Star className="text-gold-500" />}
                            />
                            <TimelineEvent
                                year="2024"
                                title="First Family Reunion"
                                description="Captured 40+ memories in one day."
                            />
                            <TimelineEvent
                                year="2021"
                                title="Career Milestone"
                                description="Promoted to Senior Architect."
                                icon={<Milestone className="text-blue-500" />}
                            />
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="card bg-primary-900 text-white border-none shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">AI Insights</h3>
                        <p className="text-primary-200 text-sm leading-relaxed mb-6">
                            "Your emotional resilience shows a strong 15% upward trend since 2021. Peak happiness correlates with 'Family' tagged memories."
                        </p>
                        <div className="space-y-4">
                            <InsightBadge label="Resilience: High" />
                            <InsightBadge label="Key Theme: Family" />
                            <InsightBadge label="Growth Cycle: 2yr" />
                        </div>
                    </section>

                    <section className="card">
                        <h3 className="text-xl font-bold mb-6">Upcoming Milestones</h3>
                        <div className="space-y-4">
                            <UpcomingEvent title="Birthday Celebration" date="Aug 14" />
                            <UpcomingEvent title="20th Anniversary" date="May 12" />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const TimelineEvent = ({ year, title, description, icon = <div className="w-2 h-2 bg-primary-300 rounded-full" /> }) => (
    <div className="relative">
        <div className="absolute -left-[41px] top-1 w-6 h-6 bg-white rounded-full border-2 border-primary-200 flex items-center justify-center">
            {icon}
        </div>
        <div className="card hover:shadow-md">
            <span className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-1 block">{year}</span>
            <h4 className="text-lg font-bold mb-1">{title}</h4>
            <p className="text-sm text-primary-500">{description}</p>
        </div>
    </div>
);

const InsightBadge = ({ label }) => (
    <div className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10">
        {label}
    </div>
);

const UpcomingEvent = ({ title, date }) => (
    <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
        <span className="font-bold text-sm">{title}</span>
        <span className="text-xs font-bold text-primary-400">{date}</span>
    </div>
);

export default Timeline;

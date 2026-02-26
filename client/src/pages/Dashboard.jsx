import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Target, TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { vaultService, messageService, timelineService } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        memories: 0,
        messages: 0,
        nextMilestone: 'Calculating...'
    });
    const [upcomingDeliveries, setUpcomingDeliveries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [memories, messages, milestones] = await Promise.all([
                    vaultService.getMemories(),
                    messageService.getMessages(),
                    timelineService.getMilestones()
                ]);

                setStats({
                    memories: memories.length,
                    messages: messages.length,
                    nextMilestone: milestones.length > 0 ? `${milestones[0].title} (${milestones[0].year})` : 'None scheduled'
                });

                setUpcomingDeliveries(messages.slice(0, 3));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-primary-500" size={48} />
            </div>
        );
    }

    return (
        <div className="py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Welcome Home, <span className="text-primary-600">Archive Keeper</span></h1>
                <p className="text-primary-600">Your digital legacy is growing beautifully.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <StatCard icon={<History />} label="Stored Memories" value={stats.memories} />
                <StatCard icon={<Target />} label="Future Messages" value={stats.messages} />
                <StatCard icon={<Calendar />} label="Next Milestone" value={stats.nextMilestone} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="card">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <TrendingUp size={24} className="text-sage-500" />
                        Emotional Growth
                    </h2>
                    <div className="h-64 bg-primary-50 rounded-xl flex items-center justify-center text-primary-300 italic">
                        Visualizing happiness trends...
                    </div>
                </section>

                <section className="card">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Calendar size={24} className="text-gold-500" />
                        Upcoming Deliveries
                    </h2>
                    <ul className="space-y-4">
                        {upcomingDeliveries.length > 0 ? (
                            upcomingDeliveries.map((delivery, index) => (
                                <DeliveryItem
                                    key={index}
                                    title={delivery.subject}
                                    for={delivery.recipient}
                                    date={new Date(delivery.deliverDate).toLocaleDateString()}
                                />
                            ))
                        ) : (
                            <li className="text-center py-4 text-primary-400 italic">No upcoming deliveries</li>
                        )}
                    </ul>
                </section>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <motion.div whileHover={{ scale: 1.02 }} className="card flex items-center gap-6">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-700">
            {React.cloneElement(icon, { size: 32 })}
        </div>
        <div>
            <p className="text-sm font-bold text-primary-500 uppercase tracking-widest">{label}</p>
            <p className="text-3xl font-bold text-primary-900">{value}</p>
        </div>
    </motion.div>
);

const DeliveryItem = ({ title, for: target, date }) => (
    <li className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
        <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm text-primary-500">For: {target}</p>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-primary-400">{date}</span>
    </li>
);

export default Dashboard;

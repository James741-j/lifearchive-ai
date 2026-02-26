import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Home, Archive, Clock, Send, BookOpen, Bot, Landmark, Shield, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-primary-100">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center text-white group-hover:bg-primary-800 transition-colors shadow-lg shadow-primary-200">
                        <Heart size={20} fill="currentColor" />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight text-primary-900">LifeArchive</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <>
                            <NavLink to="/dashboard" icon={<Home size={18} />} label="Home" />
                            <NavLink to="/vault" icon={<Archive size={18} />} label="Vault" />
                            <NavLink to="/messages" icon={<Send size={18} />} label="Messages" />
                            <NavLink to="/story" icon={<BookOpen size={18} />} label="Story" />
                            <NavLink to="/avatar" icon={<Bot size={18} />} label="Avatar" />
                            <NavLink to="/will" icon={<Landmark size={18} />} label="Will" />
                            <NavLink to="/access" icon={<Shield size={18} />} label="Security" />
                            <NavLink to="/timeline" icon={<Clock size={18} />} label="Timeline" />
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors ml-4"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="flex items-center gap-2 text-primary-600 hover:text-primary-900 font-medium">
                                <LogIn size={18} />
                                <span>Login</span>
                            </Link>
                            <Link to="/signup" className="btn-primary">
                                <span>Get Started</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, icon, label }) => (
    <Link to={to} className="flex items-center gap-2 text-primary-600 hover:text-primary-900 font-medium transition-colors">
        {icon}
        <span>{label}</span>
    </Link>
);

export default Navbar;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import Messages from './pages/Messages';
import Timeline from './pages/Timeline';
import LifeStory from './pages/LifeStory';
import Avatar from './pages/Avatar';
import AccessControl from './pages/AccessControl';
import DigitalWill from './pages/DigitalWill';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-primary-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Private Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/vault" element={<ProtectedRoute><Vault /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
              <Route path="/story" element={<ProtectedRoute><LifeStory /></ProtectedRoute>} />
              <Route path="/avatar" element={<ProtectedRoute><Avatar /></ProtectedRoute>} />
              <Route path="/access" element={<ProtectedRoute><AccessControl /></ProtectedRoute>} />
              <Route path="/will" element={<ProtectedRoute><DigitalWill /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

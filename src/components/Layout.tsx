
import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, User, Dumbbell, Plus, LogOut } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar/Navigation */}
      <div className="w-64 bg-slate-950 text-white p-6 hidden md:block">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Sporİzci</h2>
          <p className="text-slate-400 text-sm">Spor Programı & Takibi</p>
        </div>
        
        <nav className="space-y-1">
          <Link to="/dashboard" className="flex items-center p-3 rounded-md hover:bg-slate-800 transition-colors">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            <span>Genel Bakış</span>
          </Link>
          <Link to="/profile" className="flex items-center p-3 rounded-md hover:bg-slate-800 transition-colors">
            <User className="mr-3 h-5 w-5" />
            <span>Profil</span>
          </Link>
          <Link to="/workouts" className="flex items-center p-3 rounded-md hover:bg-slate-800 transition-colors">
            <Dumbbell className="mr-3 h-5 w-5" />
            <span>Antrenmanlar</span>
          </Link>
          <Link to="/create-workout" className="flex items-center p-3 rounded-md hover:bg-slate-800 transition-colors">
            <Plus className="mr-3 h-5 w-5" />
            <span>Program Oluştur</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-slate-800 hover:text-white" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950 md:hidden z-10">
        <div className="flex justify-around p-2">
          <Link to="/dashboard" className="flex flex-col items-center p-2">
            <LayoutDashboard className="h-6 w-6 text-white" />
            <span className="text-white text-xs">Ana Sayfa</span>
          </Link>
          <Link to="/workouts" className="flex flex-col items-center p-2">
            <Dumbbell className="h-6 w-6 text-white" />
            <span className="text-white text-xs">Antrenmanlar</span>
          </Link>
          <Link to="/create-workout" className="flex flex-col items-center p-2">
            <Plus className="h-6 w-6 text-white" />
            <span className="text-white text-xs">Oluştur</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2">
            <User className="h-6 w-6 text-white" />
            <span className="text-white text-xs">Profil</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

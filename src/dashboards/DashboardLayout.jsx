import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Truck, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Layers, 
  Award, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Bell, 
  Search, 
  CheckCircle,
  Menu,
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const DashboardLayout = ({ title, subtitle, children }) => {
  const { user, switchRole, logout, availableRoles } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getDashboardPath = (roleKey) => {
    switch (roleKey) {
      case 'admin': return '/dashboard/admin';
      case 'school': return '/dashboard/school';
      case 'instructor': return '/dashboard/instructor';
      case 'teacher': return '/dashboard/teacher';
      case 'student':
      default:
        return '/dashboard/student';
    }
  };

  const navItems = [
    { name: 'Overview', path: getDashboardPath(user?.roleKey || 'student'), icon: LayoutDashboard },
    { name: 'Public Site', path: '/', icon: Truck },
    { name: 'Workshops', path: '/workshops', icon: Layers },
    { name: 'CAD Hub', path: '/cad-hub', icon: BookOpen },
    { name: 'Learning Portal', path: '/learning', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
        
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-glow">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white block leading-tight">MakerSpace</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase">On Wheels Lab</span>
            </div>
          </Link>
        </div>

        {/* Current Role Card */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center gap-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-9 h-9 rounded-lg object-cover ring-1 ring-cyan-400"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50 font-semibold inline-block">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">
            Workspace Nav
          </p>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  active
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Quick Perspective Switcher for Testing Prototype */}
          <div className="pt-6">
            <p className="text-[10px] uppercase font-bold tracking-wider text-orange-400 px-3 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Role Switcher (Live)</span>
            </p>
            <div className="space-y-1">
              {availableRoles.map((r) => (
                <button
                  key={r.roleKey}
                  onClick={() => {
                    switchRole(r.roleKey);
                    navigate(getDashboardPath(r.roleKey));
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition ${
                    user?.roleKey === r.roleKey
                      ? 'bg-slate-800 text-cyan-300 font-bold border border-cyan-800/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span>{r.role}</span>
                  {user?.roleKey === r.roleKey && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white">{title}</h1>
              <p className="text-xs text-slate-400 hidden sm:block">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tag indicator */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Fleet Online • Van Unit Alpha & Beta</span>
            </span>

            <Link
              to="/school-registration"
              className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-400 text-slate-950 transition"
            >
              + Book Visit
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Dropdown */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Switch Perspective:</div>
            <div className="grid grid-cols-2 gap-2">
              {availableRoles.map((r) => (
                <button
                  key={r.roleKey}
                  onClick={() => {
                    switchRole(r.roleKey);
                    setMobileSidebarOpen(false);
                    navigate(getDashboardPath(r.roleKey));
                  }}
                  className={`p-2 rounded-lg text-xs font-semibold text-left ${
                    user?.roleKey === r.roleKey ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {r.role}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Body Content */}
        <main className="flex-1 p-4 sm:p-8 space-y-8">
          {children}
        </main>

      </div>

    </div>
  );
};


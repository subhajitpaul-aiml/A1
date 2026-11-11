import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Box, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Truck, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const { user, switchRole, logout, availableRoles } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Workshops', path: '/workshops' },
    { name: '3D & CAD Hub', path: '/cad-hub' },
    { name: 'Student Learning', path: '/learning' },
    { name: 'Contact', path: '/contact' },
  ];

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

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-glow group-hover:scale-105 transition-transform duration-300">
              <Truck className="w-6 h-6 text-slate-950" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  MakerSpace
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-400 border border-cyan-800/60 font-semibold tracking-wide uppercase">
                  On Wheels
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider font-medium">
                Learn. Design. Create. Innovate.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Book School Visit CTA */}
            <Link
              to="/school-registration"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Lab Visit</span>
            </Link>

            {/* User Profile & Role Switcher Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-cyan-500/50"
                  />
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-semibold text-slate-200 leading-tight">
                      {user.name.split(' ')[0]}
                    </p>
                    <span className="text-[10px] text-cyan-400 font-medium">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Role Switcher Popover */}
                {roleMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setRoleMenuOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="text-xs font-semibold text-slate-300">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                        {user.role} Dashboard
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setRoleMenuOpen(false);
                          navigate(getDashboardPath(user.roleKey));
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-cyan-400 hover:bg-slate-800/80 rounded-lg transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Go to {user.role} Dashboard
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Switch Role (Live Preview)
                      </div>
                      {availableRoles.map((r) => (
                        <button
                          key={r.roleKey}
                          onClick={() => {
                            switchRole(r.roleKey);
                            setRoleMenuOpen(false);
                            navigate(getDashboardPath(r.roleKey));
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                            user.roleKey === r.roleKey
                              ? 'bg-cyan-950 text-cyan-300 font-semibold'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                            <span>{r.role}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{r.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1.5 border-t border-slate-800 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setRoleMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/school-registration"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange"
            >
              <Calendar className="w-4 h-4" />
              <span>Book School Visit</span>
            </Link>

            {user && (
              <Link
                to={getDashboardPath(user.roleKey)}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl font-semibold text-sm bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open {user.role} Dashboard</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};


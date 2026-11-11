import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../services/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initial user defaults to Student or from localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('makerspace_auth_user');
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Student default
    } catch {
      return DEMO_USERS[0];
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authMode, setAuthMode] = useState('demo'); // 'demo' | 'live'

  useEffect(() => {
    if (user) {
      localStorage.setItem('makerspace_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('makerspace_auth_user');
    }
  }, [user]);

  // Quick switch role for testing all 5 perspectives effortlessly
  const switchRole = (roleKey) => {
    const matched = DEMO_USERS.find(u => u.roleKey === roleKey);
    if (matched) {
      setUser(matched);
      setIsAuthenticated(true);
      return matched;
    }
    return null;
  };

  const loginWithDemo = (roleKey = 'student') => {
    const target = DEMO_USERS.find(u => u.roleKey === roleKey) || DEMO_USERS[0];
    setUser(target);
    setIsAuthenticated(true);
    setAuthMode('demo');
    return { success: true, user: target };
  };

  const login = async (email, password, role = 'student') => {
    // Attempt backend login first if available, else match demo user
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
        setAuthMode('live');
        return { success: true, user: data.user, live: true };
      }
    } catch {
      // Backend not running, gracefully fallback to demo authentication
    }

    // Demo fallback with mock data
    const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      role: role.charAt(0).toUpperCase() + role.slice(1),
      roleKey: role,
      name: email.split('@')[0],
      email: email,
      title: `${role.toUpperCase()} Member`,
      school: 'Demo School District',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badge: 'Active Member'
    };

    setUser(matched);
    setIsAuthenticated(true);
    setAuthMode('demo');
    return { success: true, user: matched, live: false };
  };

  const register = async (formData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
        setAuthMode('live');
        return { success: true, user: data.user };
      }
    } catch {
      // Offline fallback
    }

    const newUser = {
      role: formData.role ? (formData.role.charAt(0).toUpperCase() + formData.role.slice(1)) : 'Student',
      roleKey: formData.role || 'student',
      name: formData.name || 'New Member',
      email: formData.email,
      title: `${formData.role || 'Student'} Member`,
      school: formData.school || 'Partner School',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badge: 'New Explorer'
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setAuthMode('demo');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('makerspace_auth_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      authMode,
      switchRole,
      loginWithDemo,
      login,
      register,
      logout,
      availableRoles: DEMO_USERS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


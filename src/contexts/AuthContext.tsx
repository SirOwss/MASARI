
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession, clearSession, UserType, SessionData } from '@/lib/auth';

interface AuthContextType {
  session: SessionData | null;
  loading: boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isStudent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = () => {
      const sessionData = getSession();
      setSession(sessionData);
      setLoading(false);
    };

    loadSession();
    window.addEventListener('storage', loadSession);
    
    return () => {
      window.removeEventListener('storage', loadSession);
    };
  }, []);

  const logout = () => {
    clearSession();
    setSession(null);
  };

  const isAuthenticated = () => {
    return session !== null;
  };

  const isAdmin = () => {
    return session?.userType === 'admin';
  };

  const isStudent = () => {
    return session?.userType === 'student';
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        loading, 
        logout,
        isAuthenticated,
        isAdmin,
        isStudent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

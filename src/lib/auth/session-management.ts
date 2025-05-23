
import { SessionData, UserType } from "./types";

// Create a session object in localStorage
export const createSession = (userId: string, userType: UserType, identifier: string): SessionData => {
  const session = {
    userId,
    userType,
    identifier,
    created: new Date().toISOString(),
  };
  localStorage.setItem('masari_session', JSON.stringify(session));
  return session;
};

export const getSession = (): SessionData | null => {
  const sessionData = localStorage.getItem('masari_session');
  if (!sessionData) return null;
  
  try {
    return JSON.parse(sessionData);
  } catch (e) {
    console.error('Error parsing session data', e);
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem('masari_session');
};

export const isAuthenticated = () => {
  return !!getSession();
};

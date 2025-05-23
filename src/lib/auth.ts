
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type UserType = 'admin' | 'instructor' | 'student';

export interface SessionData {
  id: string;
  userType: UserType;
  displayName?: string;
  studentId?: string;
}

/**
 * Gets the current session from local storage
 */
export const getSession = (): SessionData | null => {
  const sessionStr = localStorage.getItem('userSession');
  return sessionStr ? JSON.parse(sessionStr) : null;
};

/**
 * Creates a session and stores it in local storage
 */
export const createSession = (
  id: string, 
  userType: UserType, 
  displayName?: string,
  studentId?: string
): SessionData => {
  const session: SessionData = { 
    id, 
    userType,
    displayName,
    studentId
  };
  
  localStorage.setItem('userSession', JSON.stringify(session));
  return session;
};

/**
 * Clears the session from local storage
 */
export const clearSession = (): void => {
  localStorage.removeItem('userSession');
};

/**
 * Verifies student credentials and creates a session
 */
export const authenticateStudent = async (studentId: string, password: string): Promise<SessionData | null> => {
  try {
    // In a real app, you would validate against a secure backend
    // For demo, we're using a hardcoded check
    const isValid = studentId === '2136836' && password === '123456';
    
    if (!isValid) {
      toast.error("Login Failed", {
        description: "Invalid student ID or password."
      });
      return null;
    }
    
    console.log("Credentials valid for student login");
    
    // Create session with a student name for demo purposes
    return createSession(
      "student-" + studentId, 
      'student', 
      "Osama Hamed", // Demo student name
      studentId
    );
    
  } catch (error) {
    console.error('Authentication error:', error);
    toast.error("Authentication Error", {
      description: "An error occurred during login. Please try again."
    });
    return null;
  }
};

/**
 * Verifies admin credentials and creates a session
 */
export const authenticateAdmin = async (employeeId: string, password: string): Promise<SessionData | null> => {
  try {
    // In a real app, you would validate against a secure backend
    // For demo, we're using a hardcoded check for employee ID 0011
    const isValid = employeeId === '0011' && password === '123456';
    
    if (!isValid) {
      toast.error("Login Failed", {
        description: "Invalid employee ID or password."
      });
      return null;
    }
    
    console.log("Credentials valid for admin login");
    
    // Create session
    return createSession(
      "admin-" + employeeId, 
      'admin', 
      "Administrator"
    );
  } catch (error) {
    console.error('Authentication error:', error);
    toast.error("Authentication Error", {
      description: "An error occurred during login. Please try again."
    });
    return null;
  }
};

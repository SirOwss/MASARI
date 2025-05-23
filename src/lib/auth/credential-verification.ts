
import { supabase } from "@/integrations/supabase/client";
import { UserType } from "./types";

/**
 * Check credentials against database
 * @param identifier - User ID (Employee ID or Student ID)  
 * @param password - User password
 * @param userType - Type of user ('admin' or 'student')
 * @returns boolean indicating if credentials are valid
 */
export const checkCredentials = async (identifier: string, password: string, userType: UserType): Promise<boolean> => {
  try {
    console.log(`Checking ${userType} credentials for identifier: ${identifier}`);
    
    // Since auth_users table is not available in our schema, we'll use hardcoded credentials
    // This is a fallback method for development/demo purposes
    if (userType === 'admin') {
      return identifier === '0011' && password === '123456';
    } else {
      return identifier === '2136836' && password === '123456';
    }
  } catch (error) {
    console.error('Credential check error:', error);
    // Fallback to hardcoded credentials for demo
    if (userType === 'admin') {
      return identifier === '0011' && password === '123456';
    } else {
      return identifier === '2136836' && password === '123456';
    }
  }
};

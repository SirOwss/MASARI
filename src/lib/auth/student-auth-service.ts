
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { checkCredentials } from "./credential-verification";
import { createSession } from "./session-management";
import { SessionData, Student } from "./types";

export const authenticateStudent = async (studentId: string, password: string): Promise<SessionData | null> => {
  try {
    console.log("Attempting to authenticate student with ID:", studentId);
    
    // First check if credentials are valid
    const credentialsValid = await checkCredentials(studentId, password, 'student');
    
    if (!credentialsValid) {
      console.error("Invalid student credentials for ID:", studentId);
      toast.error("Authentication Failed", {
        description: "Invalid student ID or password."
      });
      return null;
    }
    
    console.log("Credentials valid for student login");
    
    // Mock student data since we're not creating accounts
    // In a real implementation, you would fetch this from the database
    const mockStudentId = "student-" + studentId;
    
    // Fetch or create a student record
    let student: Student | null = null;
    
    // For demo purposes, we'll just create a mock student
    student = {
      id: mockStudentId,
      student_id: studentId,
      name: "Osama Hamed"
    };
    
    // Create session with the mock ID and student information
    return createSession(mockStudentId, 'student', studentId);
    
  } catch (error) {
    console.error('Authentication error:', error);
    toast.error("Authentication Error", {
      description: "An error occurred during authentication. Please try again."
    });
    return null;
  }
};

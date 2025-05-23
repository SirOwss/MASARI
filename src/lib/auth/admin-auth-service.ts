
import { toast } from "@/components/ui/use-toast";
import { ensureAdminInstructorExists } from "./instructor-service";
import { checkCredentials } from "./credential-verification";
import { createSession } from "./session-management";
import { SessionData } from "./types";

export const authenticateAdmin = async (employeeId: string, password: string): Promise<SessionData | null> => {
  try {
    console.log("Authenticating admin with ID:", employeeId);
    // First check if credentials are valid
    const credentialsValid = await checkCredentials(employeeId, password, 'admin');
    
    if (!credentialsValid) {
      console.error("Invalid admin credentials");
      toast({
        title: "Authentication Failed",
        description: "Invalid employee ID or password.",
        variant: "destructive",
      });
      return null;
    }
    
    console.log("Admin credentials valid, fetching instructor data");
    
    // Try to ensure we have at least one instructor
    const instructorData = await ensureAdminInstructorExists();
    console.log("Instructor data from ensure function:", instructorData);
    
    if (!instructorData) {
      console.error("Failed to get or create instructor account");
      toast({
        title: "Account Error",
        description: "Could not find or create instructor account.",
        variant: "destructive",
      });
      return null;
    }
    
    // Create session
    console.log("Creating admin session with ID:", instructorData.id);
    return createSession(instructorData.id, 'admin', employeeId);
  } catch (error) {
    console.error('Authentication error:', error);
    toast({
      title: "Authentication Error",
      description: "An error occurred during authentication.",
      variant: "destructive",
    });
    return null;
  }
};

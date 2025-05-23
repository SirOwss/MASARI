
import { supabase } from "@/integrations/supabase/client";
import { Instructor } from "./types";

// Helper function to create a default admin instructor if none exists
export const ensureAdminInstructorExists = async (): Promise<Instructor | null> => {
  try {
    // First check if any instructor exists
    const { data: existingInstructors, error: checkError } = await supabase
      .from('instructors')
      .select('id, name, department')
      .limit(1);
    
    console.log("Existing instructors check:", existingInstructors, checkError);
    
    if (checkError) {
      console.error("Error checking for instructors:", checkError);
      return null;
    }
    
    // If no instructors exist, create a default one
    if (!existingInstructors || existingInstructors.length === 0) {
      console.log("No instructors found, creating default instructor");
      
      const { data: newInstructor, error: insertError } = await supabase
        .from('instructors')
        .insert({
          name: 'Ahmed',
          department: 'Administration'
        })
        .select()
        .single();
      
      console.log("New instructor creation result:", newInstructor, insertError);
      
      if (insertError) {
        console.error("Error creating instructor:", insertError);
        return null;
      }
      
      return newInstructor;
    } else {
      // Instructors exist, return the first one
      console.log("Using existing instructor:", existingInstructors[0]);
      return existingInstructors[0];
    }
  } catch (error) {
    console.error("Error in ensureAdminInstructorExists:", error);
    return null;
  }
};

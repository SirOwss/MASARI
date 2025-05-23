
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CourseRequest, CourseRequestForm } from "./types";
import { isValidUUID } from "./utils";

export const createCourseRequest = async (
  data: CourseRequestForm, 
  studentId: string | null,
  studentName?: string | null,
  universityId?: string | null
): Promise<CourseRequest> => {
  try {
    console.log(`Creating course request for student ${studentId}:`, data);

    // We'll store student info in metadata if not using a valid UUID
    let metadata = {};
    
    // Always set student_id to null since we're having issues with non-UUID formats
    // This allows anonymous submissions while preserving student information
    let validStudentId = null;
    
    // If we have student information but it's not a UUID, store it in metadata
    if (studentId && !isValidUUID(studentId)) {
      metadata = {
        display_name: studentName || 'Guest Student',
        university_id: universityId || studentId,
        non_uuid_student_id: studentId
      };
      console.log("Storing non-UUID student info in metadata:", metadata);
    } else if (studentId && isValidUUID(studentId)) {
      // If it's a valid UUID, use it for the student_id
      validStudentId = studentId;
    } else {
      console.log("No student ID provided, submitting as anonymous request");
    }

    const courseRequestData = {
      student_id: validStudentId,
      course_id: data.course_id,
      section_code: data.section_code,
      reason: data.reason,
      status: 'pending' as const,
      metadata: metadata
    };

    const { data: result, error } = await supabase
      .from('course_requests')
      .insert(courseRequestData)
      .select()
      .single();

    if (error) {
      console.error("Error creating course request:", error);
      throw error;
    }

    console.log("Course request created successfully:", result);
    return result as CourseRequest;
  } catch (error) {
    console.error("Error in createCourseRequest:", error);
    toast.error("Failed to submit course request");
    throw error;
  }
};

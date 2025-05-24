
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

    if (!studentId) {
      throw new Error("Student ID is required");
    }

    let metadata = {};

    metadata = {
      display_name: studentName || 'Guest Student',
      university_id: universityId || studentId,
      non_uuid_student_id: studentId
    };
    console.log("Storing student info in metadata:", metadata);

    const courseRequestData = {
      student_id: studentId, 
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

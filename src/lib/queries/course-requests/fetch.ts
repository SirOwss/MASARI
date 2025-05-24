import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CourseRequestWithDetails, CourseRequestsGrouped } from "./types";
import { isValidUUID } from "./utils";

export const fetchAllCourseRequests = async (): Promise<CourseRequestsGrouped[]> => {
  try {
    console.log("Fetching all course requests");
    
    const { data, error } = await supabase
      .from('course_requests')
      .select(`
        *,
        course:course_id(id, code, title),
        student:student_id(name, student_id)
      `)
      .order('created_at', { ascending: false });
    
   if (error) {
  console.error("Error fetching course requests:", error.message, error.details);
  throw error;
}
    
    console.log("Fetched course requests:", data);
    
    // Group requests by course
    const groupedRequests: CourseRequestsGrouped[] = [];
    
    data.forEach((request: any) => {
      // Find if we already have a group for this course
      const existingGroup = groupedRequests.find(
        group => group.course.id === request.course.id
      );
      
      if (existingGroup) {
        existingGroup.requests.push(request);
      } else {
        groupedRequests.push({
          course: request.course,
          requests: [request]
        });
      }
    });
    
    return groupedRequests;
  } catch (error) {
    console.error("Error in fetchAllCourseRequests:", error);
    toast.error("Failed to fetch course requests");
    return [];
  }
};

export const fetchStudentCourseRequests = async (studentId: string): Promise<CourseRequestWithDetails[]> => {
  try {
    console.log(`Fetching course requests for student ${studentId}`);

    const { data, error } = await supabase
      .from('course_requests')
      .select(`
        *,
        course:course_id(id, code, title)
      `)
      .eq('student_id', studentId) // ابحث مباشرة في student_id بما أنه varchar
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching student course requests:", error.message, error.details);
      throw error;
    }

    console.log("Fetched student course requests:", data);
    return data as CourseRequestWithDetails[];
  } catch (error) {
    console.error("Error in fetchStudentCourseRequests:", error);
    toast.error("Failed to fetch your course requests");
    return [];
  }
};

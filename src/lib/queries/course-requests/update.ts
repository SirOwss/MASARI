
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CourseRequest } from "./types";

export const updateCourseRequestStatus = async (
  requestId: string, 
  status: 'approved' | 'rejected',
  comment?: string,
  rejectionReason?: string
): Promise<CourseRequest> => {
  try {
    console.log(`Updating course request ${requestId} to status: ${status}`);

    const updates = {
      status: status,
      staff_comment: comment || null,
      rejection_reason: rejectionReason || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('course_requests')
      .update(updates)
      .eq('id', requestId)
      .select()
      .single();

    if (error) {
      console.error("Error updating course request:", error);
      throw error;
    }

    console.log("Course request updated successfully:", data);
    return data as CourseRequest;
  } catch (error) {
    console.error("Error in updateCourseRequestStatus:", error);
    toast.error("Failed to update course request status");
    throw error;
  }
};

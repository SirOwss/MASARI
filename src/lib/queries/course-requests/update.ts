
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
      status,
      staff_comment: comment || null,
      rejection_reason: rejectionReason || null,
      updated_at: new Date().toISOString(),
    };

    // عملية التحديث مع طلب عدد الصفوف المتأثرة
    const { data, error, count } = await supabase
  .from('course_requests')
  .update(updates)
  .eq('id', requestId)
  .select();

console.log("Update response:", { data, error, count: count ?? 'Not returned' });
    if (error) {
      console.error("Error updating course request:", error);
      throw error;
    }
    if (count === 0) {
      console.warn("No rows updated. Check requestId or RLS.");
      throw new Error("No rows updated. Possibly due to RLS or incorrect requestId.");
    }

    console.log("Course request updated successfully");

    // جلب البيانات المحدثة
    const { data: result, error: fetchError } = await supabase
      .from('course_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError) {
      console.error("Error fetching updated request:", fetchError);
      throw fetchError;
    }

    return result as CourseRequest;
  } catch (error) {
    console.error("Error in updateCourseRequestStatus:", error);
    toast.error("Failed to update course request status");
    throw error;
  }
};
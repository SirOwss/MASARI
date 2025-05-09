
import { supabase } from "@/integrations/supabase/client";

export interface TimeSlot {
  id: string;
  ts_start: string;
  ts_end: string;
  ts_day: number;
}

export async function fetchTimeSlots() {
  const { data, error } = await supabase
    .from('time_slots')
    .select('*')
    .order('ts_day')
    .order('ts_start');

  if (error) throw error;
  return data;
}

export async function addTimeSlot(timeSlot: Omit<TimeSlot, 'id'>) {
  const { data, error } = await supabase
    .from('time_slots')
    .insert([timeSlot])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTimeSlot(id: string) {
  const { error } = await supabase
    .from('time_slots')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Check for schedule conflicts
export async function checkScheduleConflicts(courseId: string, studentId: string) {
  // This is a simplified version - in a real application, you would:
  // 1. Get the time slots for the course
  // 2. Get all courses the student is registered for
  // 3. Get all time slots for those courses
  // 4. Check for overlaps
  
  // Using the DB function directly
  const { data, error } = await supabase
    .rpc('check_schedule_conflicts', { 
      p_course_id: courseId,
      p_student_id: studentId 
    });

  if (error) throw error;
  return data; // returns true if there's a conflict
}

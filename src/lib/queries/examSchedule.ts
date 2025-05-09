
import { supabase } from "@/integrations/supabase/client";

export interface ExamScheduleInput {
  course_id: string;
  venue_id: string;
  exam_date: string;
  start_time: string;
  end_time: string;
}

export async function fetchExamSchedules() {
  const { data, error } = await supabase
    .from('exam_schedule')
    .select(`
      *,
      course:courses(id, code, title),
      venue:exam_venues(id, name, capacity)
    `)
    .order('exam_date')
    .order('start_time');

  if (error) throw error;
  return data;
}

export async function addExamSchedule(schedule: ExamScheduleInput) {
  const { data, error } = await supabase
    .from('exam_schedule')
    .insert([schedule])
    .select(`
      *,
      course:courses(id, code, title),
      venue:exam_venues(id, name, capacity)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateExamSchedule(id: string, updates: Partial<ExamScheduleInput>) {
  const { data, error } = await supabase
    .from('exam_schedule')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select(`
      *,
      course:courses(id, code, title),
      venue:exam_venues(id, name, capacity)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExamSchedule(id: string) {
  const { error } = await supabase
    .from('exam_schedule')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

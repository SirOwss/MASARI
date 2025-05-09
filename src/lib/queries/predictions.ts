
import { supabase } from "@/integrations/supabase/client";

export async function fetchPredictions() {
  const { data, error } = await supabase
    .from('course_predictions')
    .select(`
      *,
      course_sections (*)
    `)
    .order('code');

  if (error) throw error;
  return data;
}

export async function updateCoursePrediction(id: string, updates: {
  predicted: number;
  sections: number;
}) {
  const { data, error } = await supabase
    .from('course_predictions')
    .update({
      predicted: updates.predicted,
      sections: updates.sections,
      avg_per_section: Math.ceil(updates.predicted / updates.sections),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

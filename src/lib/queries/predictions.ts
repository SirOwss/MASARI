
import { supabase } from "@/integrations/supabase/client";

export const fetchPredictions = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('id, code, title');

  if (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses');
  }

  return data || [];
};

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

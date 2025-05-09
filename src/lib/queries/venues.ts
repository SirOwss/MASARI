
import { supabase } from "@/integrations/supabase/client";

export async function fetchExamVenues() {
  const { data, error } = await supabase
    .from('exam_venues')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function addExamVenue(venue: { name: string; capacity: number }) {
  const { data, error } = await supabase
    .from('exam_venues')
    .insert([venue])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateExamVenue(id: string, updates: { name?: string; capacity?: number }) {
  const { data, error } = await supabase
    .from('exam_venues')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExamVenue(id: string) {
  const { error } = await supabase
    .from('exam_venues')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

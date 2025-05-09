import { supabase } from "@/integrations/supabase/client";

export async function fetchCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('code');

  if (error) throw error;
  return data;
}

export async function addCourse(course: {
  code: string;
  title: string;
  credits: number;
}) {
  const { data, error } = await supabase
    .from('courses')
    .insert([course])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCourse(id: string) {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

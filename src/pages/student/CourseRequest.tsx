
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { fetchCourses } from '@/lib/queries/courses';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen } from "lucide-react";

interface CourseRequestForm {
  course_id: string;
}

const CourseRequest = () => {
  const { t } = useTranslation();
  
  const form = useForm<CourseRequestForm>({
    defaultValues: {
      course_id: '',
    }
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const requestMutation = useMutation({
    mutationFn: async (data: CourseRequestForm) => {
      const { error } = await supabase
        .from('course_requests')
        .insert([{ 
          course_id: data.course_id,
          student_id: '00000000-0000-0000-0000-000000000000', // This will be replaced with actual student ID when auth is implemented
          status: 'pending'
        }]);
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success(t('courseRequest.success'));
      form.reset();
    },
    onError: (error) => {
      toast.error(t('courseRequest.error'));
      console.error(error);
    }
  });

  const onSubmit = (data: CourseRequestForm) => {
    requestMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('courseRequest.title')}</h1>
        <p className="text-muted-foreground">{t('courseRequest.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {t('courseRequest.formTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="course_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('courseRequest.course')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('courseRequest.selectCourse')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {coursesLoading ? (
                          <SelectItem value="loading" disabled>{t('common.loading')}</SelectItem>
                        ) : courses.length === 0 ? (
                          <SelectItem value="none" disabled>{t('courseRequest.noCourses')}</SelectItem>
                        ) : (
                          courses.map((course: any) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.code} - {course.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={requestMutation.isPending}
              >
                {requestMutation.isPending ? t('common.submitting') : t('courseRequest.submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-muted/50 text-sm text-muted-foreground">
          {t('courseRequest.note')}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseRequest;

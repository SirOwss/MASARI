
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from 'react-hook-form';
import { CourseRequestForm } from '@/lib/queries/course-requests';

interface CourseSelectorProps {
  form: UseFormReturn<CourseRequestForm>;
  courses: any[];
  coursesLoading: boolean;
}

export function CourseSelector({ form, courses, coursesLoading }: CourseSelectorProps) {
  const { t } = useTranslation();
  
  return (
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
                <SelectItem value="loading" disabled>
                  {t('common.loading')}
                </SelectItem>
              ) : courses.length === 0 ? (
                <SelectItem value="none" disabled>
                  {t('courseRequest.noCourses')}
                </SelectItem>
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
  );
}

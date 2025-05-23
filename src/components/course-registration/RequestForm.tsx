
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { BookOpen } from "lucide-react";
import { CourseRequestForm, createCourseRequest } from '@/lib/queries/course-requests';

// Import the new component parts
import { StudentInfoBanner } from './form/StudentInfoBanner';
import { CourseSelector } from './form/CourseSelector';
import { SectionField } from './form/SectionField';
import { ReasonField } from './form/ReasonField';
import { SubmitButton } from './form/SubmitButton';

interface RequestFormProps {
  courses: any[];
  coursesLoading: boolean;
  studentId: string | null;
  studentName?: string | null;
  universityId?: string | null;
}

// Extract the validation schema
const requestFormSchema = z.object({
  course_id: z.string().nonempty({
    message: 'Please select a course'
  }),
  section_code: z.string().nonempty({
    message: 'Please enter a section code'
  }).regex(/^[A-Za-z0-9]+$/, {
    message: 'Section code should contain only letters and numbers'
  }),
  reason: z.string().nonempty({
    message: 'Please provide a reason'
  }).max(500, {
    message: 'Reason must be 500 characters or less'
  })
});

export function RequestForm({
  courses,
  coursesLoading,
  studentId,
  studentName,
  universityId
}: RequestFormProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  
  const form = useForm<CourseRequestForm>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      course_id: '',
      section_code: '',
      reason: ''
    }
  });
  
  const requestMutation = useMutation({
    mutationFn: (data: CourseRequestForm) => 
      createCourseRequest(data, studentId, studentName, universityId),
    onSuccess: () => {
      toast({
        title: t('courseRequest.success'),
        description: "Your course request has been submitted successfully.",
        variant: "default"
      });
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ['student-course-requests']
      });
    },
    onError: error => {
      console.error(error);
      toast({
        title: t('courseRequest.error'),
        description: "Failed to submit your course request. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: CourseRequestForm) => {
    requestMutation.mutate(data);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {t('courseRequest.formTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <StudentInfoBanner 
          studentId={studentId}
          studentName={studentName}
          universityId={universityId}
        />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CourseSelector 
              form={form} 
              courses={courses} 
              coursesLoading={coursesLoading} 
            />
            
            <SectionField form={form} />
            
            <ReasonField form={form} />
            
            <SubmitButton isPending={requestMutation.isPending} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-muted/50 text-sm text-muted-foreground">
        {t('courseRequest.note')}
      </CardFooter>
    </Card>
  );
}

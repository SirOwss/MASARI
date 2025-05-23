
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestForm } from '@/components/course-registration/RequestForm';
import { RequestsList } from '@/components/course-registration/RequestsList';
import { fetchCourses } from '@/lib/queries/courses';
import { fetchStudentCourseRequests } from '@/lib/queries/courseRequests';
import { supabase } from '@/integrations/supabase/client';

const CourseRegistration = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState("submit");
  
  // For demo purposes, using a placeholder studentId
  // In a real application, this would come from authentication
  const studentId = '00000000-0000-0000-0000-000000000000'; 

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['student-course-requests', studentId],
    queryFn: () => fetchStudentCourseRequests(studentId),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('courseRequest.title')}</h1>
        <p className="text-muted-foreground">{t('courseRequest.subtitle')}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="submit">{t('courseRequest.tabs.submit')}</TabsTrigger>
          <TabsTrigger value="status">{t('courseRequest.tabs.status')}</TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <RequestForm 
            courses={courses} 
            coursesLoading={coursesLoading} 
            studentId={studentId} 
          />
        </TabsContent>

        <TabsContent value="status">
          <RequestsList 
            requests={requests} 
            isLoading={requestsLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseRegistration;

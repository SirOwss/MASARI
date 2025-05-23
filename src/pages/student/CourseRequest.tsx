
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { RequestForm } from '@/components/course-registration/RequestForm';
import { RequestsList } from '@/components/course-registration/RequestsList';
import { fetchStudentCourseRequests } from '@/lib/queries/course-requests';
import { useAuth } from '@/contexts/AuthContext';

const CourseRequestPage = () => {
  const { t } = useTranslation();
  const { session } = useAuth();
  
  // Extract student information from the session
  const studentId = session?.id || null;
  const studentName = session?.displayName || null;
  const universityId = session?.studentId || null;
  
  console.log("Session data:", {
    studentId,
    studentName,
    universityId,
    sessionData: session
  });

  // Fetch all courses for the dropdown
  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['all-courses'],
    queryFn: async () => {
      const { data } = await fetch('/api/courses').then(res => res.json());
      return data || [];
    }
  });

  // Fetch the student's existing course requests
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ['student-course-requests', studentId],
    queryFn: () => fetchStudentCourseRequests(studentId || ''),
    enabled: !!studentId
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('courseRequest.title')}</h1>
        <p className="text-muted-foreground">{t('courseRequest.description')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <RequestForm 
            courses={courses}
            coursesLoading={coursesLoading}
            studentId={studentId}
            studentName={studentName}
            universityId={universityId}
          />
        </div>
        <div>
          <RequestsList 
            requests={requests}
            isLoading={requestsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseRequestPage;

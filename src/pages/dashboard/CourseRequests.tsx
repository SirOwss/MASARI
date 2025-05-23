
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { RequestsDashboard } from '@/components/course-registration/admin/RequestsDashboard';
import { fetchAllCourseRequests } from '@/lib/queries/course-requests';

const CourseRequests = () => {
  const { t } = useTranslation();
  
  const { data: requestGroups = [], isLoading } = useQuery({
    queryKey: ['all-course-requests'],
    queryFn: fetchAllCourseRequests,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('courseRequest.admin.title')}</h1>
        <p className="text-muted-foreground">{t('courseRequest.admin.subtitle')}</p>
      </div>

      <Card className="mb-4">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('courseRequest.admin.overview')}
          </CardTitle>
          <CardDescription>
            {t('courseRequest.admin.overviewDescription')}
          </CardDescription>
        </CardHeader>
      </Card>

      <RequestsDashboard 
        requestGroups={requestGroups} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default CourseRequests;

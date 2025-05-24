
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  Accordion
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CourseRequestsGrouped, CourseRequestWithDetails, exportCourseRequestsToCSV, updateCourseRequestStatus } from '@/lib/queries/course-requests';
import { ReviewRequestDialog } from './ReviewRequestDialog';
import { CourseRequestGroup } from './CourseRequestGroup';

interface RequestsDashboardProps {
  requestGroups: CourseRequestsGrouped[];
  isLoading: boolean;
}

export function RequestsDashboard({ requestGroups, isLoading }: RequestsDashboardProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CourseRequestWithDetails | null>(null);
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected'>('approved');

  const updateRequestMutation = useMutation({
    mutationFn: ({ 
      requestId, 
      status, 
      comment, 
      rejectionReason 
    }: { 
      requestId: string; 
      status: 'approved' | 'rejected';
      comment?: string;
      rejectionReason?: string;
    }) => updateCourseRequestStatus(requestId, status, comment, rejectionReason),
    onSuccess: () => {
      toast.success(t('courseRequest.admin.updateSuccess'));
      queryClient.invalidateQueries({ queryKey: ['all-course-requests'] });
      setReviewDialogOpen(false);
      setSelectedRequest(null);
    },
    onError: (error) => {
      toast.error(t('courseRequest.admin.updateError'));
      console.error(error);
    }
  });

  const handleOpenReviewDialog = (request: CourseRequestWithDetails, action: 'approved' | 'rejected') => {
  console.log("Selected request ID:", request.id);
  setSelectedRequest(request);
  setReviewAction(action);
  setReviewDialogOpen(true);
};

  const handleExportRequests = (requests: CourseRequestWithDetails[], courseName: string) => {
    try {
      exportCourseRequestsToCSV(requests, courseName);
      toast.success(t('courseRequest.admin.exportSuccess'));
    } catch (error) {
      console.error('Export error:', error);
      toast.error(t('courseRequest.admin.exportError'));
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('courseRequest.admin.dashboardTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">{t('common.loading')}</div>
          ) : requestGroups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('courseRequest.admin.noRequests')}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {requestGroups.map((group, index) => (
                <CourseRequestGroup
                  key={index}
                  group={group}
                  index={index}
                  onApprove={(request) => handleOpenReviewDialog(request, 'approved')}
                  onReject={(request) => handleOpenReviewDialog(request, 'rejected')}
                  onExport={handleExportRequests}
                />
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
      
      <ReviewRequestDialog
        isOpen={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        request={selectedRequest}
        action={reviewAction}
        onSubmit={(comment, rejectionReason) => {
          if (selectedRequest) {
            updateRequestMutation.mutate({
              requestId: selectedRequest.id,
              status: reviewAction,
              comment,
              rejectionReason
            });
          }
        }}
        isSubmitting={updateRequestMutation.isPending}
      />
    </>
  );
}


import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { CourseRequestsGrouped, CourseRequestWithDetails } from '@/lib/queries/course-requests';
import { RequestsTable } from './RequestsTable';

interface CourseRequestGroupProps {
  group: CourseRequestsGrouped;
  index: number;
  onApprove: (request: CourseRequestWithDetails) => void;
  onReject: (request: CourseRequestWithDetails) => void;
  onExport: (requests: CourseRequestWithDetails[], courseName: string) => void;
}

export function CourseRequestGroup({ 
  group, 
  index, 
  onApprove, 
  onReject, 
  onExport 
}: CourseRequestGroupProps) {
  const { t } = useTranslation();

  const countPendingRequests = (requests: CourseRequestWithDetails[]) => {
    return requests.filter(req => req.status === 'pending').length;
  };

  return (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionTrigger className="px-4 hover:bg-muted/50">
        <div className="flex justify-between w-full items-center">
          <span>{group.course.code} - {group.course.title}</span>
          <div className="flex items-center gap-2">
            {countPendingRequests(group.requests) > 0 && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                {countPendingRequests(group.requests)} {t('courseRequest.admin.pending')}
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm"
              className="ml-2"
              onClick={(e) => {
                e.stopPropagation();
                onExport(group.requests, group.course.code);
              }}
            >
              <FileSpreadsheet className="h-4 w-4 mr-1" />
              {t('courseRequest.admin.export')}
            </Button>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <RequestsTable 
          requests={group.requests} 
          onApprove={onApprove}
          onReject={onReject}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

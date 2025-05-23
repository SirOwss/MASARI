import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { CourseRequestWithDetails } from '@/lib/queries/course-requests';

interface RequestsTableProps {
  requests: CourseRequestWithDetails[];
  onApprove: (request: CourseRequestWithDetails) => void;
  onReject: (request: CourseRequestWithDetails) => void;
}

export function RequestsTable({ requests, onApprove, onReject }: RequestsTableProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border mt-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('courseRequest.admin.table.student')}</TableHead>
            <TableHead>{t('courseRequest.admin.table.id')}</TableHead>
            <TableHead>{t('courseRequest.admin.table.section')}</TableHead>
            <TableHead>{t('courseRequest.admin.table.reason')}</TableHead>
            <TableHead>{t('courseRequest.admin.table.date')}</TableHead>
            <TableHead>{t('courseRequest.admin.table.status')}</TableHead>
            <TableHead>{t('courseRequest.admin.table.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            // Determine student name and ID from all possible sources
            let displayName = "Guest User";
            let studentId = "N/A";
            
            // Check if we have a database student record
            if (request.student) {
              displayName = request.student.name;
              studentId = request.student.student_id;
            } 
            // Check metadata for non-database student info
            else if (request.metadata) {
              displayName = request.metadata.display_name || "Unknown Student";
              studentId = request.metadata.university_id || "N/A";
            }
            // Fallback to legacy format if needed
            else if (request.student_id && request.student_id.startsWith("student-")) {
              displayName = "Student User";
              studentId = request.student_id.replace("student-", "");
            }
            
            return (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{displayName}</TableCell>
                <TableCell>{studentId}</TableCell>
                <TableCell>{request.section_code}</TableCell>
                <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  {request.status === 'approved' && (
                    <Badge variant="success">{t('courseRequest.status.approved')}</Badge>
                  )}
                  {request.status === 'rejected' && (
                    <Badge variant="destructive">{t('courseRequest.status.rejected')}</Badge>
                  )}
                  {request.status === 'pending' && (
                    <Badge variant="secondary">{t('courseRequest.status.pending')}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:bg-green-50 border-green-200"
                        onClick={() => onApprove(request)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {t('courseRequest.admin.approve')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 border-red-200"
                        onClick={() => onReject(request)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        {t('courseRequest.admin.reject')}
                      </Button>
                    </div>
                  )}
                  {request.status !== 'pending' && (
                    <span className="text-sm text-muted-foreground">
                      {request.status === 'approved' ? t('courseRequest.admin.processed') : ''}
                      {request.status === 'rejected' && request.rejection_reason ? request.rejection_reason : ''}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

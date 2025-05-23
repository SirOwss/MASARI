
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FileSearch, AlertCircle } from "lucide-react";

interface RequestsListProps {
  requests: any[];
  isLoading: boolean;
}

export function RequestsList({ requests, isLoading }: RequestsListProps) {
  const { t } = useTranslation();

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge variant="success">{t('courseRequest.status.approved')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t('courseRequest.status.rejected')}</Badge>;
      default:
        return <Badge variant="secondary">{t('courseRequest.status.pending')}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSearch className="h-5 w-5" />
          {t('courseRequest.yourRequests')}
        </CardTitle>
        <CardDescription>
          {t('courseRequest.requestsDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">{t('common.loading')}</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
            <AlertCircle className="h-12 w-12 mb-2 opacity-40" />
            <p>{t('courseRequest.noRequests')}</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('courseRequest.table.course')}</TableHead>
                  <TableHead>{t('courseRequest.table.sectionCode')}</TableHead>
                  <TableHead>{t('courseRequest.table.requestDate')}</TableHead>
                  <TableHead>{t('courseRequest.table.status')}</TableHead>
                  <TableHead>{t('courseRequest.table.comments')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.course?.code} - {request.course?.title}
                    </TableCell>
                    <TableCell>{request.section_code}</TableCell>
                    <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{renderStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.status === 'rejected' && request.rejection_reason && (
                        <div>
                          <p className="text-destructive font-medium">{t('courseRequest.rejected')}:</p>
                          <p className="text-sm text-muted-foreground">{request.rejection_reason}</p>
                        </div>
                      )}
                      {request.staff_comment && (
                        <div className="mt-1">
                          <p className="text-sm text-muted-foreground">{request.staff_comment}</p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

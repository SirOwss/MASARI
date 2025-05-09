
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchExamSchedules } from '@/lib/queries/examSchedule';
import { Calendar } from "lucide-react";

const Exams = () => {
  const { t } = useTranslation();
  
  const { data: examSchedules = [], isLoading } = useQuery({
    queryKey: ['exam-schedules'],
    queryFn: fetchExamSchedules,
  });

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('exams.title')}</h1>
        <p className="text-muted-foreground">{t('exams.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('exams.schedule')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">{t('common.loading')}</div>
          ) : examSchedules.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {t('exams.noExams')}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('exams.table.courseCode')}</TableHead>
                    <TableHead>{t('exams.table.courseTitle')}</TableHead>
                    <TableHead>{t('exams.table.date')}</TableHead>
                    <TableHead>{t('exams.table.time')}</TableHead>
                    <TableHead>{t('exams.table.venue')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examSchedules.map((exam: any) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.course?.code || '—'}</TableCell>
                      <TableCell>{exam.course?.title || '—'}</TableCell>
                      <TableCell>{new Date(exam.exam_date).toLocaleDateString()}</TableCell>
                      <TableCell>{`${formatTime(exam.start_time)} - ${formatTime(exam.end_time)}`}</TableCell>
                      <TableCell>{exam.venue?.name || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Exams;

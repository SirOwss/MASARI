
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExistingSchedulesProps, formatTime } from './types';

export const ExistingSchedules = ({ 
  examSchedules, 
  examsLoading, 
  onAddExam
}: ExistingSchedulesProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t('schedule.examSchedules')}
            </span>
            <Button variant="outline" size="sm" onClick={onAddExam}>
              <Plus className="h-4 w-4 mr-1" />
              {t('schedule.addExam')}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {examsLoading ? (
            <div className="text-center py-4">{t('schedule.loadingExams')}</div>
          ) : examSchedules.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">{t('schedule.noExams')}</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('schedule.table.courseCode')}</TableHead>
                    <TableHead>{t('schedule.table.courseTitle')}</TableHead>
                    <TableHead>{t('schedule.table.date')}</TableHead>
                    <TableHead>{t('schedule.table.time')}</TableHead>
                    <TableHead>{t('schedule.table.venue')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examSchedules.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.course.code}</TableCell>
                      <TableCell>{exam.course.title}</TableCell>
                      <TableCell>{new Date(exam.exam_date).toLocaleDateString()}</TableCell>
                      <TableCell>{`${formatTime(exam.start_time)} - ${formatTime(exam.end_time)}`}</TableCell>
                      <TableCell>{exam.venue.name}</TableCell>
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

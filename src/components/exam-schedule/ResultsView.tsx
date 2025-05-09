
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileDown, Upload, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ResultsViewProps } from './types';

export const ResultsView = ({ 
  processedExams, 
  venueAssignments, 
  conflicts, 
  unmatchedCourses, 
  onGenerateReport, 
  onSaveToDatabase 
}: ResultsViewProps) => {
  const { t } = useTranslation();

  if (processedExams.length === 0) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t('schedule.noProcessedExams')}</p>
            <p className="mt-2">
              <Button variant="link" onClick={() => {/* This would be handled by the parent */}}>
                {t('schedule.uploadFilesFirst')}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t('schedule.processedExams')}
            </span>
            <div>
              <Button 
                variant="outline" 
                onClick={onGenerateReport} 
                className="mr-2"
              >
                <FileDown className="mr-2 h-4 w-4" />
                {t('schedule.exportReport')}
              </Button>
              <Button onClick={onSaveToDatabase}>
                {t('schedule.saveToDatabase')}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {conflicts.length > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('schedule.conflictsDetected')}</AlertTitle>
              <AlertDescription>
                {t('schedule.conflictsDescription')}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('courses.table.code')}</TableHead>
                  <TableHead>{t('courses.table.title')}</TableHead>
                  <TableHead>{t('schedule.table.date')}</TableHead>
                  <TableHead>{t('schedule.table.time')}</TableHead>
                  <TableHead>{t('schedule.examNum')}</TableHead>
                  <TableHead>{t('schedule.studentCount')}</TableHead>
                  <TableHead>{t('schedule.table.venue')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {venueAssignments.map((exam, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{exam.courseCode}</TableCell>
                    <TableCell>{exam.courseTitle}</TableCell>
                    <TableCell>{exam.examDate}</TableCell>
                    <TableCell>{exam.examTime}</TableCell>
                    <TableCell>{exam.examNumber}</TableCell>
                    <TableCell>{exam.studentCount}</TableCell>
                    <TableCell>
                      {exam.venue ? (
                        <div className="flex items-center">
                          <span>{exam.venue.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {exam.venue.capacity}
                          </Badge>
                        </div>
                      ) : (
                        <Badge variant="destructive">No venue</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {conflicts.length > 0 && (
        <ConflictsTable conflicts={conflicts} />
      )}

      {unmatchedCourses.length > 0 && (
        <UnmatchedCoursesTable unmatchedCourses={unmatchedCourses} />
      )}
    </div>
  );
};

const ConflictsTable = ({ conflicts }: { conflicts: any[] }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {t('schedule.conflicts')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('schedule.table.venue')}</TableHead>
                <TableHead>{t('schedule.table.date')}</TableHead>
                <TableHead>{t('schedule.table.time')}</TableHead>
                <TableHead>{t('schedule.conflictingCourses')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conflicts.map((conflict, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{conflict.venue}</TableCell>
                  <TableCell>{conflict.date}</TableCell>
                  <TableCell>{conflict.time}</TableCell>
                  <TableCell>
                    {conflict.courses.map((course: string, i: number) => (
                      <Badge key={i} variant="outline" className="mr-1">
                        {course}
                      </Badge>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const UnmatchedCoursesTable = ({ unmatchedCourses }: { unmatchedCourses: any[] }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-warning">
      <CardHeader>
        <CardTitle className="text-warning flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {t('schedule.unmatchedCourses')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('courses.table.code')}</TableHead>
                <TableHead>{t('courses.table.title')}</TableHead>
                <TableHead>{t('schedule.firstLectureDay')}</TableHead>
                <TableHead>{t('schedule.firstLectureTime')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unmatchedCourses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{course.courseCode}</TableCell>
                  <TableCell>{course.courseTitle}</TableCell>
                  <TableCell>{course.firstLectureDay}</TableCell>
                  <TableCell>{course.firstLectureTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

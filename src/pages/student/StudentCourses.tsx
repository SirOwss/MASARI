
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap } from "lucide-react";
import { fetchCourses } from '@/lib/queries/courses';

const StudentCourses = () => {
  const { t } = useTranslation();
  
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['student-courses'],
    queryFn: fetchCourses,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('studentCourses.title')}</h1>
        <p className="text-muted-foreground">{t('studentCourses.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            {t('studentCourses.enrolledCourses')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">{t('common.loading')}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {t('courses.noCourses')}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('courses.table.code')}</TableHead>
                    <TableHead>{t('courses.table.title')}</TableHead>
                    <TableHead>{t('courses.table.credits')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course: any) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.credits}</TableCell>
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

export default StudentCourses;

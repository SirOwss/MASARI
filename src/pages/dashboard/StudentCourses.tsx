
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Check, X, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
}

interface CourseRequest {
  id: string;
  course: Course;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
}

const StudentCourses = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: availableCourses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ['available-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*');
        
      if (error) throw error;
      return data as Course[];
    },
  });

  const { data: enrolledCourses = [], isLoading: loadingEnrolled } = useQuery({
    queryKey: ['enrolled-courses'],
    queryFn: async () => {
      // In a real app, would get current user's enrolled courses
      return [] as Course[];
    },
  });

  const { data: courseRequests = [], isLoading: loadingRequests } = useQuery({
    queryKey: ['course-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course_requests')
        .select(`
          id,
          status,
          rejection_reason,
          course:courses(id, code, title, credits)
        `)
        .eq('student_id', 'current-user-id'); // Would use actual auth.uid() in production
        
      if (error) throw error;
      return data as CourseRequest[];
    },
  });

  const requestCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      const { data, error } = await supabase
        .from('course_requests')
        .insert([
          { 
            course_id: courseId, 
            student_id: 'current-user-id', // Would use actual auth.uid() in production
            status: 'pending' 
          }
        ]);
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-requests'] });
      toast({
        title: t('studentCourses.requestSent'),
        description: t('studentCourses.requestProcessing'),
      });
    },
    onError: (error) => {
      console.error('Request error:', error);
      toast({
        title: t('common.error'),
        description: t('studentCourses.requestError'),
        variant: "destructive",
      });
    },
  });

  const cancelRequestMutation = useMutation({
    mutationFn: async (requestId: string) => {
      const { data, error } = await supabase
        .from('course_requests')
        .delete()
        .eq('id', requestId);
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-requests'] });
      toast({
        title: t('studentCourses.requestCancelled'),
        description: t('studentCourses.requestCancelSuccess'),
      });
    },
  });

  const filteredCourses = availableCourses.filter(course => 
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestCourse = (courseId: string) => {
    requestCourseMutation.mutate(courseId);
  };

  const handleCancelRequest = (requestId: string) => {
    cancelRequestMutation.mutate(requestId);
  };

  const isRequested = (courseId: string) => {
    return courseRequests.some(request => request.course.id === courseId);
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  const getRequest = (courseId: string) => {
    return courseRequests.find(request => request.course.id === courseId);
  };

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {t('studentCourses.status.pending')}
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            {t('studentCourses.status.approved')}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            {t('studentCourses.status.rejected')}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('studentCourses.title')}</h1>
        <p className="text-muted-foreground">{t('studentCourses.subtitle')}</p>
      </div>

      <Tabs defaultValue="available">
        <TabsList className="mb-4">
          <TabsTrigger value="available">{t('studentCourses.tabs.available')}</TabsTrigger>
          <TabsTrigger value="requests">{t('studentCourses.tabs.requests')}</TabsTrigger>
          <TabsTrigger value="enrolled">{t('studentCourses.tabs.enrolled')}</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>{t('studentCourses.availableCourses')}</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t('studentCourses.searchPlaceholder')}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {loadingCourses ? (
                <div className="text-center py-4">{t('common.loading')}</div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  {t('studentCourses.noCourses')}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('courses.table.courseId')}</TableHead>
                      <TableHead>{t('courses.table.title')}</TableHead>
                      <TableHead>{t('courses.table.credits')}</TableHead>
                      <TableHead>{t('studentCourses.table.status')}</TableHead>
                      <TableHead className="text-right">{t('studentCourses.table.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map((course) => {
                      const request = getRequest(course.id);
                      const enrolled = isEnrolled(course.id);
                      
                      return (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>
                            {enrolled ? (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {t('studentCourses.status.enrolled')}
                              </Badge>
                            ) : request ? (
                              getStatusBadge(request.status)
                            ) : (
                              <span className="text-gray-500">{t('studentCourses.status.notRequested')}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {!enrolled && !request && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRequestCourse(course.id)}
                                disabled={requestCourseMutation.isPending}
                              >
                                <Plus className="mr-1 h-3 w-3" />
                                {t('studentCourses.actions.request')}
                              </Button>
                            )}
                            {request && request.status === 'pending' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleCancelRequest(request.id)}
                                disabled={cancelRequestMutation.isPending}
                              >
                                <X className="mr-1 h-3 w-3" />
                                {t('studentCourses.actions.cancel')}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>{t('studentCourses.courseRequests')}</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingRequests ? (
                <div className="text-center py-4">{t('common.loading')}</div>
              ) : courseRequests.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  {t('studentCourses.noRequests')}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('courses.table.courseId')}</TableHead>
                      <TableHead>{t('courses.table.title')}</TableHead>
                      <TableHead>{t('studentCourses.table.status')}</TableHead>
                      <TableHead>{t('studentCourses.table.reason')}</TableHead>
                      <TableHead className="text-right">{t('studentCourses.table.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.course.code}</TableCell>
                        <TableCell>{request.course.title}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          {request.rejection_reason || '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleCancelRequest(request.id)}
                              disabled={cancelRequestMutation.isPending}
                            >
                              <X className="mr-1 h-3 w-3" />
                              {t('studentCourses.actions.cancel')}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrolled">
          <Card>
            <CardHeader>
              <CardTitle>{t('studentCourses.enrolledCourses')}</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingEnrolled ? (
                <div className="text-center py-4">{t('common.loading')}</div>
              ) : enrolledCourses.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  {t('studentCourses.noEnrolled')}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('courses.table.courseId')}</TableHead>
                      <TableHead>{t('courses.table.title')}</TableHead>
                      <TableHead>{t('courses.table.credits')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrolledCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentCourses;

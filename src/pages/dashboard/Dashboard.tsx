
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, BookOpen, BarChart4 } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.welcome')}</h2>
        <p className="text-muted-foreground">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t('dashboard.metrics.totalCourses')}</CardTitle>
            <BookOpen className="h-4 w-4 text-masari" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              +2 added this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t('dashboard.metrics.activeStudents')}</CardTitle>
            <Users className="h-4 w-4 text-masari" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,854</div>
            <p className="text-xs text-muted-foreground">
              +120 from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t('dashboard.metrics.upcomingExams')}</CardTitle>
            <Calendar className="h-4 w-4 text-masari" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">
              Midterms starting next week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{t('dashboard.metrics.sectionOptimizations')}</CardTitle>
            <BarChart4 className="h-4 w-4 text-masari" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-muted-foreground">
              Improved capacity utilization
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Registration Activity</CardTitle>
            <CardDescription>
              Overview of course registration in the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">Registration activity chart will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

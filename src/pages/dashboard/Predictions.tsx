
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, Upload, FileText, Edit2, FileUp } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { EditCourseDialog } from '@/components/predictions/EditCourseDialog';
import { fetchPredictions } from '@/lib/queries/predictions';
import { supabase } from "@/integrations/supabase/client";
import { fetchCourses } from '@/lib/queries/courses';


interface UploadFormValues {
  courseFile: FileList;
  semester: string;
}



const Predictions = () => {
  const { t } = useTranslation();
  const [selectedSemester, setSelectedSemester] = useState('Semester');
  const [selectedYear, setSelectedYear] = useState('Year');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<any>(null);

  const {
    data: predictionData,
    isLoading: predictionsLoading,
    refetch: fetchPredictions
  } = useQuery({
    queryKey: ['predictions', selectedYear, selectedSemester],
    queryFn: async () => {
      if (!selectedYear || !selectedSemester) return [];

      const courses = await fetchCourses(); // نجيب الكورسات

      const allPredictions = await Promise.all(
        courses.map(async (course) => {
          const res = await fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              courseCode: course.code,
              semester: selectedSemester + selectedYear
            })
          });

          const result = await res.json();
          return {
            course: course.code,
            prediction: result.prediction
          };
        })
      );

      return allPredictions;
    },
    enabled: false // نوقف التشغيل التلقائي
  });



  const { data: predictions, isLoading } = useQuery({
    queryKey: ['predictions'],
    queryFn: fetchPredictions
  });

  const form = useForm<UploadFormValues>({
    defaultValues: {
      semester: 'Fall 2024',
    },
  });

  const handleFileUpload = (values: UploadFormValues) => {
    setShowUploadForm(false);
    toast({
      title: t('common.success'),
      description: t('predictions.uploadSuccess'),
    });
  };

  const handleExportReport = () => {
    toast({
      title: t('predictions.generatingReport'),
      description: t('predictions.reportDownloading'),
    });
  };



  const filteredSectionData = predictions && Array.isArray(predictions)
  ? (selectedCourse === 'All Courses'
    ? predictions
    : predictions.filter(item => item.code === selectedCourse))
  : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('predictions.title')}</h1>
        <p className="text-muted-foreground">{t('predictions.subtitle')}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">


          <Select value={selectedYear} onValueChange={(value) => { setSelectedYear(value); fetchCourses(); }}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t('predictions.year')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Year">{t('predictions.year')}</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSemester} onValueChange={(value) => { setSelectedSemester(value); fetchCourses(); }}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t('predictions.semester')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semester">{t('predictions.semester')}</SelectItem>
              <SelectItem value="Semester One">Semester One</SelectItem>
              <SelectItem value="Semester Two">Semester Two</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="mt-2" disabled={!selectedYear || !selectedSemester || predictionsLoading}
            onClick={fetchPredictions}>
            {predictionsLoading ? "جاري التنبؤ..." : "تنبؤ"}
            <FileUp className="mr-2 h-4 w-4" />
            Predict
          </Button>
        </div>
      </div>



      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              {t('predictions.sectionPredictions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={predictions || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="code" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="predicted" fill="#00A86B" name={t('predictions.table.enrollment')} />
                <Bar dataKey="sections" fill="#007F5F" name={t('predictions.table.section')} />
                <Bar dataKey="avg_per_section" fill="#004B49" name={t('predictions.table.capacity')} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('predictions.predictionMetrics')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">{t('predictions.metrics.accuracy')}</p>
                <p className="text-2xl font-bold text-green-600">95%</p>
                <p className="text-sm text-muted-foreground">
                  {t('predictions.basedOnHistorical')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">{t('predictions.metrics.confidence')}</p>
                <p className="text-2xl font-bold text-green-600">{t('predictions.highConfidence')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('predictions.forSemester', { semester: selectedSemester })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">{t('predictions.metrics.optimization')}</p>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <p>{t('predictions.optimizedEfficiency')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">

      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('predictions.detailedRecommendations')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">{t('common.loading')}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('predictions.table.courseCode')}</TableHead>
                  <TableHead>{t('predictions.table.courseTitle')}</TableHead>
                  <TableHead>{t('predictions.table.section')}</TableHead>
                  <TableHead className="text-right">{t('predictions.table.capacity')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      {t('common.loading')}
                    </TableCell>
                  </TableRow>
                ) : filteredSectionData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      {t('common.noDataAvailable')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSectionData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{predictionData?.map((item) => (
                        <div key={item.course} className="p-4 border rounded mb-2">
                          <h3 className="font-bold">{item.course}</h3>
                          <p>Prediction: {item.prediction}</p>
                        </div>
                      ))}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>



      <EditCourseDialog
        isOpen={!!selectedCourseForEdit}
        onClose={() => setSelectedCourseForEdit(null)}
        course={selectedCourseForEdit}
      />
    </div>
  );
};

export default Predictions;

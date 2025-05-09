
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, Upload, FileText, Edit2 } from "lucide-react";
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

interface UploadFormValues {
  courseFile: FileList;
  semester: string;
}

const Predictions = () => {
  const { t } = useTranslation();
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<any>(null);

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

  const filteredSectionData = predictions && selectedCourse === 'All Courses' 
    ? predictions 
    : predictions?.filter(item => item.code === selectedCourse) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('predictions.title')}</h1>
        <p className="text-muted-foreground">{t('predictions.subtitle')}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('predictions.selectSemester')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fall 2024">Fall 2024</SelectItem>
              <SelectItem value="Spring 2025">Spring 2025</SelectItem>
              <SelectItem value="Summer 2025">Summer 2025</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t('predictions.selectCourse')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Courses">{t('predictions.allCourses')}</SelectItem>
              <SelectItem value="CS101">CS101</SelectItem>
              <SelectItem value="CS102">CS102</SelectItem>
              <SelectItem value="CS201">CS201</SelectItem>
              <SelectItem value="CS202">CS202</SelectItem>
              <SelectItem value="CS301">CS301</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setShowUploadForm(true)} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            {t('predictions.uploadData')}
          </Button>
          <Button onClick={handleExportReport} variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            {t('predictions.exportReport')}
          </Button>
        </div>
      </div>

      {showUploadForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('predictions.uploadForm.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFileUpload)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="courseFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('predictions.uploadForm.courseFile')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".csv,.xlsx" 
                          onChange={(e) => {
                            if (e.target.files) {
                              field.onChange(e.target.files);
                            }
                          }} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('predictions.uploadForm.semester')}</FormLabel>
                      <Select 
                        defaultValue={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('predictions.selectSemester')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                          <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                          <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" variant="masari">{t('predictions.uploadForm.submit')}</Button>
                  <Button type="button" variant="outline" onClick={() => setShowUploadForm(false)}>
                    {t('predictions.uploadForm.cancel')}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

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
                  <TableHead className="text-right">{t('predictions.table.enrollment')}</TableHead>
                  <TableHead className="text-right">{t('predictions.table.fillRate')}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSectionData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.sections}</TableCell>
                    <TableCell className="text-right">{item.avg_per_section}</TableCell>
                    <TableCell className="text-right">{item.predicted}</TableCell>
                    <TableCell className="text-right">
                      <span 
                        className={`font-medium ${
                          (item.predicted / (item.sections * item.avg_per_section)) > 0.9 
                            ? 'text-amber-600' 
                            : 'text-green-600'
                        }`}
                      >
                        {Math.round((item.predicted / (item.sections * item.avg_per_section)) * 100)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedCourseForEdit(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">{t('common.edit')}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('predictions.predictionConstraints')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t('predictions.constraints.maxSection')}: <strong>30 {t('schedule.students')}</strong></li>
            <li>{t('predictions.constraints.minSection')}: <strong>15 {t('schedule.students')}</strong></li>
            <li>{t('predictions.constraints.faculty')}</li>
            <li>{t('predictions.constraints.rooms')}</li>
            <li>{t('predictions.constraints.prerequisites')}</li>
          </ul>
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

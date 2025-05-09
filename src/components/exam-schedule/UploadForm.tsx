
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileUp } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UploadFormProps } from './types';
import { 
  processExamScheduleFiles, 
  assignVenues, 
  detectSchedulingConflicts 
} from '@/lib/utils/examScheduleProcessor';

export const UploadForm = ({ 
  onFilesProcessed, 
  venues, 
  processing, 
  setProcessing 
}: UploadFormProps) => {
  const { t } = useTranslation();
  
  const uploadForm = useForm({
    defaultValues: {
      universityExamFile: undefined,
      courseDataFile: undefined,
    }
  });

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const universityExamFile = uploadForm.getValues("universityExamFile");
    const courseDataFile = uploadForm.getValues("courseDataFile");
    
    if (!universityExamFile || !courseDataFile) {
      toast.error(t('schedule.filesMissing'));
      return;
    }
    
    try {
      setProcessing(true);
      toast.info(t('schedule.processingFiles'));
      
      const result = await processExamScheduleFiles(
        universityExamFile as unknown as File,
        courseDataFile as unknown as File
      );
      
      // Assign venues based on student count
      const assignments = assignVenues(result.matches, venues);
      
      // Detect conflicts - pass venues array to the function
      const detectedConflicts = detectSchedulingConflicts(assignments, venues);
      
      onFilesProcessed(result.matches, result.unmatchedCourses, assignments, detectedConflicts);
      
      toast.success(t('schedule.processSuccess'));
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error(t('schedule.processError'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {t('schedule.uploadTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex-1">
            <img 
              src="/lovable-uploads/8fbd7264-4323-4b44-9f61-417d7b6a01cd.png" 
              alt="Course schedule mapping"
              className="w-full rounded-md border border-muted shadow-sm"
            />
          </div>
          <div className="flex-1">
            <img 
              src="/lovable-uploads/a4854f96-5db1-4019-a59d-ed9ab4126918.png" 
              alt="Exam schedule"
              className="w-full rounded-md border border-muted shadow-sm"
            />
          </div>
        </div>

        <Form {...uploadForm}>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={uploadForm.control}
                name="universityExamFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('schedule.universityExamFile')}</FormLabel>
                    <FormDescription>
                      {t('schedule.universityExamFileDesc')}
                    </FormDescription>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept=".xlsx,.csv,.xls" 
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        disabled={processing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={uploadForm.control}
                name="courseDataFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('schedule.courseDataFile')}</FormLabel>
                    <FormDescription>
                      {t('schedule.courseDataFileDesc')}
                    </FormDescription>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept=".xlsx,.csv,.xls" 
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        disabled={processing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="mt-2"
                disabled={processing}
              >
                <FileUp className="mr-2 h-4 w-4" />
                {processing ? t('schedule.processing') : t('schedule.processFiles')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

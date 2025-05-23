import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileUp } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormDescription, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface UploadFormProps {
  processing: boolean;
  setProcessing: (processing: boolean) => void;
  onDocxGenerated: (url: string) => void; // New prop

}

export const UploadForm = ({ processing, setProcessing }: UploadFormProps) => {
  const { t } = useTranslation();

  const uploadForm = useForm({
    defaultValues: {
      universityExamFile: undefined,
      courseDataFile: undefined,
    },
  });

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    const universityExamFile = uploadForm.getValues('universityExamFile');
    const courseDataFile = uploadForm.getValues('courseDataFile');

    if (!universityExamFile || !courseDataFile) {
      toast.error(t('schedule.filesMissing'));
      return;
    }

    try {
      setProcessing(true);
      toast.info(t('schedule.processingFiles'));

      const formData = new FormData();
      formData.append('universityExamFile', universityExamFile);
      formData.append('courseDataFile', courseDataFile);

      const response = await fetch('https://masari-api.onrender.com:5000/generate-docx', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || t('schedule.processError'));
      }

      // Trigger DOCX download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exam_schedule.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Store URL for re-download
      //onDocxGenerated(url);

      toast.success(t('schedule.reportGenerated'));

    } catch (error: any) {
      console.error('Error processing files:', error);
      toast.error(`${t('schedule.processError')}: ${error.message}`);
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
              src="/lovable-Uploads/8fbd7264-4323-4b44-9f61-417d7b6a01cd.png"
              alt="Course schedule mapping"
              className="w-full rounded-md border border-muted shadow-sm"
            />
          </div>
          <div className="flex-1">
            <img
              src="/lovable-Uploads/a4854f96-5db1-4019-a59d-ed9ab4126918.png"
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
                    <FormDescription>{t('schedule.universityExamFileDesc')}</FormDescription>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
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
                    <FormDescription>{t('schedule.courseDataFileDesc')}</FormDescription>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        disabled={processing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="mt-2" disabled={processing}>
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
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Upload } from 'lucide-react';

interface ResultsViewProps {
  docxUrl: string | null; // URL for the downloaded DOCX file
  onGenerateReport: () => void; // Re-download the file
}

export const ResultsView = ({ docxUrl, onGenerateReport }: ResultsViewProps) => {
  const { t } = useTranslation();

  if (!docxUrl) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t('schedule.noProcessedExams')}</p>
            <p className="mt-2">
              <Button variant="link" onClick={() => {/* Handled by parent */}}>
                {t('schedule.uploadFilesFirst')}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileDown className="h-5 w-5" />
          {t('schedule.reportGenerated')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t('schedule.downloadReady')}</p>
        <Button variant="outline" onClick={onGenerateReport} className="mt-4">
          <FileDown className="mr-2 h-4 w-4" />
          {t('schedule.downloadReport')}
        </Button>
      </CardContent>
    </Card>
  );
};
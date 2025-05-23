import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { toast } from 'sonner'; // Import toast for notifications
import { UploadForm } from './UploadForm';
import { ResultsView } from './ResultsView';

const App = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [processing, setProcessing] = useState(false);
  const [docxUrl, setDocxUrl] = useState<string | null>(null);

  const handleGenerateReport = () => {
    if (docxUrl) {
      const a = document.createElement('a');
      a.href = docxUrl;
      a.download = 'exam_schedule.docx';
      a.click();
    } else {
      toast.error(t('schedule.uploadFilesFirst')); // Use toast instead of alert
    }
  };

  return (
    <div className="container mx-auto p-4">
      <UploadForm
        processing={processing}
        setProcessing={setProcessing}
        onDocxGenerated={(url: string) => setDocxUrl(url)}
      />
      <ResultsView docxUrl={docxUrl} onGenerateReport={handleGenerateReport} />
    </div>
  );
};

export default App;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScheduleContext } from '../context/ScheduleContext';
import { useScheduleData } from '../hooks/useScheduleData';
import { useScheduleHandlers } from '../handlers/scheduleHandlers';
import { 
  UploadForm,
  ResultsView,
  VenuesTable,
  VenueForm,
  ExamForm,
  ExistingSchedules,
} from '@/components/exam-schedule';

export const ScheduleTabs: React.FC = () => {
  const { t } = useTranslation();
  const {
    processedExams,
    unmatchedCourses,
    venueAssignments,
    conflicts,
    processingFiles,
    activeTab,
    isAddingVenue,
    selectedVenue,
    isAddingExam,
    setProcessingFiles,
    setActiveTab,
    setIsAddingVenue,
    setSelectedVenue,
    setIsAddingExam
  } = useScheduleContext();
  
  const {
    venues,
    courses,
    examSchedules,
    venuesLoading,
    examsLoading,
    addVenueMutation,
    updateVenueMutation,
    deleteVenueMutation,
    addExamMutation
  } = useScheduleData();
  
  const {
    handleVenueSubmit,
    handleEditVenue,
    handleDeleteVenue,
    handleFilesProcessed,
    handleSaveToDatabase,
    handleGenerateReport
  } = useScheduleHandlers();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="upload">{t('schedule.uploadTab')}</TabsTrigger>
      </TabsList>

      <TabsContent value="upload">
        <UploadForm 
          onFilesProcessed={handleFilesProcessed} 
          venues={venues} 
          processing={processingFiles}
          setProcessing={setProcessingFiles}
        />
      </TabsContent>

      <TabsContent value="results">
        <ResultsView 
          processedExams={processedExams}
          venueAssignments={venueAssignments}
          conflicts={conflicts}
          unmatchedCourses={unmatchedCourses}
          onGenerateReport={() => handleGenerateReport(venueAssignments)}
          onSaveToDatabase={() => handleSaveToDatabase(venueAssignments, courses)}
        />
      </TabsContent>

      <TabsContent value="venues">
        <VenuesTable 
          venues={venues}
          isLoading={venuesLoading}
          onEditVenue={handleEditVenue}
          onDeleteVenue={(id) => handleDeleteVenue(deleteVenueMutation, id)}
          onAddVenue={() => setIsAddingVenue(true)}
        />
        
        <VenueForm 
          isOpen={isAddingVenue}
          onOpenChange={(open) => {
            setIsAddingVenue(open);
            if (!open) setSelectedVenue(null);
          }}
          selectedVenue={selectedVenue}
          onSubmit={(data) => handleVenueSubmit(addVenueMutation, updateVenueMutation, selectedVenue, data)}
        />
      </TabsContent>

      <TabsContent value="existing">
        <ExistingSchedules 
          examSchedules={examSchedules}
          examsLoading={examsLoading}
          onAddExam={() => setIsAddingExam(true)}
        />
        
        <ExamForm 
          isOpen={isAddingExam}
          onOpenChange={setIsAddingExam}
          onSubmit={(data) => addExamMutation.mutate(data)}
          venues={venues}
          courses={courses}
        />
      </TabsContent>
    </Tabs>
  );
};

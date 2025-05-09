
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { 
  ExamMatch, 
  ExamWithVenue, 
  Conflict,
  generateExamScheduleReport 
} from '@/lib/utils/examScheduleProcessor';
import { VenueItem, Course } from '../types';
import { ExamScheduleInput, addExamSchedule } from '@/lib/queries/examSchedule';
import { useScheduleContext } from '../context/ScheduleContext';

export const useScheduleHandlers = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    setProcessedExams,
    setUnmatchedCourses,
    setVenueAssignments,
    setConflicts,
    setActiveTab,
    setSelectedVenue,
    setIsAddingVenue,
  } = useScheduleContext();

  const handleVenueSubmit = (
    addVenueMutation: any,
    updateVenueMutation: any,
    selectedVenue: VenueItem | null,
    data: { name: string; capacity: number }
  ) => {
    if (selectedVenue) {
      updateVenueMutation.mutate({
        id: selectedVenue.id,
        updates: data
      });
    } else {
      addVenueMutation.mutate(data);
    }
  };

  const handleEditVenue = (venue: VenueItem) => {
    setSelectedVenue(venue);
    setIsAddingVenue(true);
  };

  const handleDeleteVenue = (deleteVenueMutation: any, id: string) => {
    if (confirm(t('venue.confirmDelete'))) {
      deleteVenueMutation.mutate(id);
    }
  };

  const handleFilesProcessed = (
    processed: ExamMatch[], 
    unmatched: any[], 
    assignments: ExamWithVenue[], 
    detectedConflicts: Conflict[]
  ) => {
    setProcessedExams(processed);
    setUnmatchedCourses(unmatched);
    setVenueAssignments(assignments);
    setConflicts(detectedConflicts);
    setActiveTab("results");
  };

  const handleSaveToDatabase = async (
    venueAssignments: ExamWithVenue[],
    courses: Course[]
  ) => {
    try {
      toast.info(t('schedule.savingToDatabase'));
      
      // Save each exam schedule to the database
      for (const exam of venueAssignments) {
        // Find the course ID from the code
        const course = courses.find((c: Course) => c.code === exam.courseCode);
        
        if (course && exam.venue?.id) {
          const examData: ExamScheduleInput = {
            course_id: course.id,
            venue_id: exam.venue.id,
            exam_date: exam.examDate,
            start_time: exam.examTime.split('-')[0].trim(),
            end_time: exam.examTime.split('-')[1].trim()
          };
          
          await addExamSchedule(examData);
        }
      }
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['exam-schedules'] });
      toast.success(t('schedule.savedToDatabase'));
      
      // Reset the processed data
      setActiveTab("upload");
    } catch (error) {
      console.error("Error saving to database:", error);
      toast.error(t('schedule.saveError'));
    }
  };

  const handleGenerateReport = (venueAssignments: ExamWithVenue[]) => {
    try {
      const report = generateExamScheduleReport(venueAssignments);
      
      // Create a download link
      const url = URL.createObjectURL(report);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exam-schedule-report.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success(t('schedule.reportGenerated'));
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error(t('schedule.reportError'));
    }
  };

  return {
    handleVenueSubmit,
    handleEditVenue,
    handleDeleteVenue,
    handleFilesProcessed,
    handleSaveToDatabase,
    handleGenerateReport,
  };
};

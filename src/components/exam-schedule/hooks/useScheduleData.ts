
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { 
  fetchExamVenues, 
  addExamVenue, 
  updateExamVenue, 
  deleteExamVenue 
} from '@/lib/queries/venues';
import { 
  fetchExamSchedules, 
  addExamSchedule, 
  updateExamSchedule, 
  deleteExamSchedule,
  ExamScheduleInput 
} from '@/lib/queries/examSchedule';
import { fetchCourses } from '@/lib/queries/courses';
import { VenueItem } from '../types';

export const useScheduleData = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Queries
  const { data: venues = [], isLoading: venuesLoading } = useQuery({
    queryKey: ['exam-venues'],
    queryFn: fetchExamVenues,
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const { data: examSchedules = [], isLoading: examsLoading } = useQuery({
    queryKey: ['exam-schedules'],
    queryFn: fetchExamSchedules,
  });

  // Mutations
  const addVenueMutation = useMutation({
    mutationFn: addExamVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam-venues'] });
      toast.success(t('venue.addSuccess'));
    },
    onError: (error) => {
      toast.error(t('venue.addError'));
      console.error(error);
    }
  });

  const updateVenueMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: { name?: string; capacity?: number } }) => 
      updateExamVenue(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam-venues'] });
      toast.success(t('venue.updateSuccess'));
    },
    onError: (error) => {
      toast.error(t('venue.updateError'));
      console.error(error);
    }
  });

  const deleteVenueMutation = useMutation({
    mutationFn: deleteExamVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam-venues'] });
      toast.success(t('venue.deleteSuccess'));
    },
    onError: (error) => {
      toast.error(t('venue.deleteError'));
      console.error(error);
    }
  });

  const addExamMutation = useMutation({
    mutationFn: addExamSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exam-schedules'] });
      toast.success(t('exam.addSuccess'));
    },
    onError: (error) => {
      toast.error(t('exam.addError'));
      console.error(error);
    }
  });

  return {
    // Data
    venues,
    courses,
    examSchedules,
    
    // Loading states
    venuesLoading,
    coursesLoading,
    examsLoading,
    
    // Mutations
    addVenueMutation,
    updateVenueMutation,
    deleteVenueMutation,
    addExamMutation,
  };
};


import { ExamScheduleInput } from '@/lib/queries/examSchedule';
import { ExamMatch, ExamWithVenue, Conflict } from '@/lib/utils/examScheduleProcessor';

export interface VenueItem {
  id: string;
  name: string;
  capacity: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
}

export interface ExamScheduleItem {
  id: string;
  exam_date: string;
  start_time: string;
  end_time: string;
  course: {
    id: string;
    code: string;
    title: string;
  };
  venue: {
    id: string;
    name: string;
    capacity: number;
  };
}

// Props for the components
export interface UploadFormProps {
  onFilesProcessed: (
    processedExams: ExamMatch[], 
    unmatchedCourses: any[], 
    venueAssignments: ExamWithVenue[], 
    conflicts: Conflict[]
  ) => void;
  venues: VenueItem[];
  processing: boolean;
  setProcessing: (processing: boolean) => void;
}

export interface ResultsViewProps {
  processedExams: ExamMatch[];
  venueAssignments: ExamWithVenue[];
  conflicts: Conflict[];
  unmatchedCourses: any[];
  onGenerateReport: () => void;
  onSaveToDatabase: () => void;
}

export interface VenuesTableProps {
  venues: VenueItem[];
  isLoading: boolean;
  onEditVenue: (venue: VenueItem) => void;
  onDeleteVenue: (id: string) => void;
  onAddVenue: () => void;
}

export interface VenueFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedVenue: VenueItem | null;
  onSubmit: (data: { name: string; capacity: number }) => void;
}

export interface ExamFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ExamScheduleInput) => void;
  venues: VenueItem[];
  courses: Course[];
}

export interface ExistingSchedulesProps {
  examSchedules: ExamScheduleItem[];
  examsLoading: boolean;
  onAddExam: () => void;
}

export const formatTime = (time: string) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

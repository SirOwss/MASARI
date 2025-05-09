
import React, { createContext, useContext, useState } from 'react';
import { ExamMatch, ExamWithVenue, Conflict } from '@/lib/utils/examScheduleProcessor';
import { VenueItem } from '../types';

interface ScheduleContextType {
  // State
  processedExams: ExamMatch[];
  unmatchedCourses: any[];
  venueAssignments: ExamWithVenue[];
  conflicts: Conflict[];
  processingFiles: boolean;
  activeTab: string;
  isAddingVenue: boolean;
  selectedVenue: VenueItem | null;
  isAddingExam: boolean;
  
  // Actions
  setProcessedExams: React.Dispatch<React.SetStateAction<ExamMatch[]>>;
  setUnmatchedCourses: React.Dispatch<React.SetStateAction<any[]>>;
  setVenueAssignments: React.Dispatch<React.SetStateAction<ExamWithVenue[]>>;
  setConflicts: React.Dispatch<React.SetStateAction<Conflict[]>>;
  setProcessingFiles: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsAddingVenue: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVenue: React.Dispatch<React.SetStateAction<VenueItem | null>>;
  setIsAddingExam: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for processed exam data
  const [processedExams, setProcessedExams] = useState<ExamMatch[]>([]);
  const [unmatchedCourses, setUnmatchedCourses] = useState<any[]>([]);
  const [venueAssignments, setVenueAssignments] = useState<ExamWithVenue[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [isAddingVenue, setIsAddingVenue] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<VenueItem | null>(null);
  const [isAddingExam, setIsAddingExam] = useState(false);

  const value = {
    processedExams,
    unmatchedCourses,
    venueAssignments,
    conflicts,
    processingFiles,
    activeTab,
    isAddingVenue,
    selectedVenue,
    isAddingExam,
    
    setProcessedExams,
    setUnmatchedCourses,
    setVenueAssignments,
    setConflicts,
    setProcessingFiles,
    setActiveTab,
    setIsAddingVenue,
    setSelectedVenue,
    setIsAddingExam,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};

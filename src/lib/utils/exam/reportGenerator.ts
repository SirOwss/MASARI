
import { ExamWithVenue } from './types';

// Generate exam schedule report
export const generateExamScheduleReport = (assignments: ExamWithVenue[]) => {
  console.log('Generating report for', assignments.length, 'courses');
  return new Blob([JSON.stringify(assignments, null, 2)], { type: 'application/json' });
};

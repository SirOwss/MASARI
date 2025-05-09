
import { ExamWithVenue, Venue, Conflict } from './types';

// Function to check for scheduling conflicts
export const detectSchedulingConflicts = (
  assignments: ExamWithVenue[],
  venues: Venue[]
): Conflict[] => {
  const conflicts: Conflict[] = [];
  
  // Group by venue, date, and time
  const groups: Record<string, string[]> = {};
  
  assignments.forEach(assignment => {
    if (assignment.venue.id) {
      const key = `${assignment.venue.id}_${assignment.examDate}_${assignment.examTime}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(assignment.courseCode);
    }
  });
  
  // Identify conflicts (multiple courses in same venue at same time)
  Object.entries(groups).forEach(([key, courses]) => {
    if (courses.length > 1) {
      const [venueId, date, time] = key.split('_');
      const venue = venues.find(v => v.id === venueId)?.name || 'Unknown';
      
      conflicts.push({
        venue,
        date,
        time,
        courses
      });
    }
  });
  
  return conflicts;
};

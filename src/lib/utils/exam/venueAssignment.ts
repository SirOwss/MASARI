
import { ExamMatch, ExamWithVenue, Venue } from './types';

// Assign venues based on student count and available capacity
export const assignVenues = (
  matches: ExamMatch[], 
  venues: Venue[]
): ExamWithVenue[] => {
  // Sort venues by capacity for optimal assignment
  const sortedVenues = [...venues].sort((a, b) => a.capacity - b.capacity);
  
  return matches.map(match => {
    // Find the smallest venue that can fit all students
    const suitableVenue = sortedVenues.find(venue => venue.capacity >= match.studentCount);
    
    return {
      ...match,
      venue: suitableVenue || { id: '', name: 'No suitable venue', capacity: 0 }
    };
  });
};

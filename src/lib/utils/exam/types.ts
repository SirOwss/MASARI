
// Types for exam scheduling system
export interface CourseData {
  courseCode: string;
  courseTitle: string;
  studentCount: number;
  firstLectureDay: string;
  firstLectureTime: string;
}

export interface ExamTimeSlot {
  examNumber: number;
  day: string;
  date: string;
  time: string;
}

export interface ExamMatch {
  courseCode: string;
  courseTitle: string;
  examDate: string;
  examTime: string;
  examNumber: number;
  studentCount: number;
}

export interface ExamWithVenue extends ExamMatch {
  venue: {
    id: string;
    name: string;
    capacity: number;
  };
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
}

export interface Conflict {
  venue: string;
  date: string;
  time: string;
  courses: string[];
}


import { CourseData, ExamTimeSlot, ExamMatch } from './types';

export const processExamScheduleFiles = async (
  universityExamFile: File, 
  courseDataFile: File
): Promise<{
  matches: ExamMatch[];
  unmatchedCourses: CourseData[];
}> => {
  try {
    // Mock processing for demo purposes
    // In production, we would use a library like xlsx or papaparse to read Excel/CSV files
    console.log('Processing files:', universityExamFile.name, courseDataFile.name);
    
    // Example course data (would come from courseDataFile)
    const coursesData: CourseData[] = [
      { courseCode: 'MATH101', courseTitle: 'Calculus I', studentCount: 45, firstLectureDay: 'Sunday', firstLectureTime: '8:00-9:50' },
      { courseCode: 'PHYS101', courseTitle: 'Physics I', studentCount: 38, firstLectureDay: 'Monday', firstLectureTime: '10:00-11:50' },
      { courseCode: 'CHEM101', courseTitle: 'Chemistry I', studentCount: 42, firstLectureDay: 'Tuesday', firstLectureTime: '1:00-2:50' },
      { courseCode: 'CS101', courseTitle: 'Introduction to Programming', studentCount: 35, firstLectureDay: 'Wednesday', firstLectureTime: '3:00-4:50' },
    ];
    
    // Example exam timeslots (would come from universityExamFile)
    const examTimeSlots: Record<number, ExamTimeSlot> = {
      1: { examNumber: 1, day: 'Sunday', date: '2023-12-10', time: '8:00-10:00' },
      6: { examNumber: 6, day: 'Sunday', date: '2023-12-10', time: '12:00-2:00' },
      9: { examNumber: 9, day: 'Sunday', date: '2023-12-10', time: '3:00-5:00' },
      12: { examNumber: 12, day: 'Sunday', date: '2023-12-10', time: '6:00-8:00' },
      15: { examNumber: 15, day: 'Monday', date: '2023-12-11', time: '8:00-10:00' },
      18: { examNumber: 18, day: 'Monday', date: '2023-12-11', time: '12:00-2:00' },
      21: { examNumber: 21, day: 'Monday', date: '2023-12-11', time: '3:00-5:00' },
      24: { examNumber: 24, day: 'Tuesday', date: '2023-12-12', time: '8:00-10:00' },
      27: { examNumber: 27, day: 'Tuesday', date: '2023-12-12', time: '12:00-2:00' },
      30: { examNumber: 30, day: 'Wednesday', date: '2023-12-13', time: '8:00-10:00' },
      33: { examNumber: 33, day: 'Wednesday', date: '2023-12-13', time: '12:00-2:00' },
      36: { examNumber: 36, day: 'Thursday', date: '2023-12-14', time: '8:00-10:00' },
      39: { examNumber: 39, day: 'Thursday', date: '2023-12-14', time: '12:00-2:00' },
    };
    
    // First image maps lecture times to exam numbers
    const lectureToExamMap: Record<string, number> = {
      'Sunday_8:00-9:50': 21,
      'Sunday_10:00-11:50': 30,
      'Sunday_1:00-2:50': 9,
      'Sunday_3:00-4:50': 39,
      'Monday_8:00-9:50': 27,
      'Monday_10:00-11:50': 3,
      'Monday_1:00-2:50': 18,
      'Monday_3:00-4:50': 21,
      'Tuesday_8:00-9:50': 6,
      'Tuesday_10:00-11:50': 33,
      'Tuesday_6:00-7:50': 33,
      'Wednesday_1:00-2:50': 18,
      'Wednesday_3:00-4:50': 12,
      'Thursday_8:00-9:50': 36,
      'Thursday_10:00-11:50': 18,
      'Thursday_1:00-2:50': 39,
      'Thursday_3:00-4:50': 26,
    };
    
    // Logic to match courses to exam slots based on first lecture day and time
    const matches = coursesData.map(course => {
      const key = `${course.firstLectureDay}_${course.firstLectureTime}`;
      const examNumber = lectureToExamMap[key];
      const examSlot = examTimeSlots[examNumber];
      
      if (!examSlot) {
        return {
          courseCode: course.courseCode,
          courseTitle: course.courseTitle,
          examDate: 'Not found',
          examTime: 'Not found',
          examNumber: -1,
          studentCount: course.studentCount
        };
      }
      
      return {
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        examDate: examSlot.date,
        examTime: examSlot.time,
        examNumber: examSlot.examNumber,
        studentCount: course.studentCount
      };
    });
    
    const unmatchedCourses = coursesData.filter(course => {
      const key = `${course.firstLectureDay}_${course.firstLectureTime}`;
      return !lectureToExamMap[key];
    });
    
    return {
      matches,
      unmatchedCourses
    };
  } catch (error) {
    console.error("Error processing exam schedule files:", error);
    throw new Error("Failed to process exam schedule files");
  }
};

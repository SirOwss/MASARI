
import { saveAs } from 'file-saver';
import { toast } from "sonner";
import { CourseRequestWithDetails } from './types';
import { escapeCSV } from './utils';

export const exportCourseRequestsToCSV = (requests: CourseRequestWithDetails[], courseName: string) => {
  if (!requests || requests.length === 0) {
    console.warn("No requests to export.");
    toast.error("No requests to export.");
    return;
  }

  const headers = [
    "Student Name", "Student ID", "Section Code", "Reason", "Status", "Rejection Reason", "Request Date"
  ];

  const csvRows = [
    headers.join(',')
  ];

  requests.forEach(request => {
    const studentName = request.student ? request.student.name : 'N/A';
    const studentId = request.student ? request.student.student_id : 'N/A';
    const sectionCode = request.section_code;
    const reason = request.reason;
    const status = request.status;
    const rejectionReason = request.rejection_reason || '';
    const requestDate = new Date(request.created_at).toLocaleDateString();

    const row = [
      studentName, studentId, sectionCode, reason, status, rejectionReason, requestDate
    ].map(escapeCSV).join(',');
    csvRows.push(row);
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `CourseRequests_${courseName}_${new Date().toLocaleDateString()}.csv`);
};

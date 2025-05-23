
export interface CourseRequest {
  id: string;
  student_id: string | null;
  course_id: string;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  reviewed_by: string | null;
  section_code: string;
  reason: string;
  staff_comment: string | null;
  metadata: any;
}

export interface CourseRequestWithDetails {
  id: string;
  student_id: string | null;
  course_id: string;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  reviewed_by: string | null;
  section_code: string;
  reason: string;
  staff_comment: string | null;
  course: {
    id: string;
    code: string;
    title: string;
  };
  student: {
    id: string;
    name: string;
    student_id: string;
  } | null;
  metadata: any;
}

export interface CourseRequestsGrouped {
  course: {
    id: string;
    code: string;
    title: string;
  };
  requests: CourseRequestWithDetails[];
}

export interface CourseRequestForm {
  course_id: string;
  section_code: string;
  reason: string;
}

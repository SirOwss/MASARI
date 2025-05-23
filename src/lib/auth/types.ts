
export type UserType = 'admin' | 'student';

export interface SessionData {
  userId: string;
  userType: UserType;
  identifier: string;
  created: string;
}

export interface AuthUser {
  identifier: string;
  password: string;
  user_type: UserType;
}

export interface Instructor {
  id: string;
  name: string;
  department: string;
}

export interface Student {
  id: string;
  name: string;
  student_id: string;
}

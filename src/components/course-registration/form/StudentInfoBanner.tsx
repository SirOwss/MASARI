
import React from 'react';

interface StudentInfoBannerProps {
  studentId: string | null;
  studentName?: string | null;
  universityId?: string | null;
}

export function StudentInfoBanner({ studentId, studentName, universityId }: StudentInfoBannerProps) {
  if (!studentId) {
    return (
      <div className="mb-4 p-3 bg-yellow-100/30 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">You're submitting as a guest. For better tracking, consider logging in.</p>
      </div>
    );
  }

  return (
    <div className="mb-4 p-3 bg-muted/30 rounded-md">
      <p className="text-sm font-medium">Submitting as: {studentName || 'Student'}</p>
      {universityId && <p className="text-sm text-muted-foreground">ID: {universityId}</p>}
    </div>
  );
}

// Core TypeScript types for Auto-Attend
// Import from here everywhere — never redefine types inline

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  college: string;
  createdAt: string;
}

// ─── Subjects ────────────────────────────────────────────────────────────────

export interface Subject {
  id: string;
  userId: string;
  name: string;
  color: string;           // hex color for subject pill
  type: SubjectType;
  minimumPercentage: number; // default 75
  createdAt: string;
}

export type SubjectType = 'lecture' | 'lab' | 'tutorial' | 'other';

// ─── Schedule ────────────────────────────────────────────────────────────────

export interface Schedule {
  id: string;
  subjectId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;       // "09:00"
  endTime: string;         // "10:00"
  room: string;
}

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

// ─── Classroom Location ───────────────────────────────────────────────────────

export interface ClassroomLocation {
  id: string;
  subjectId: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;    // geofence radius, default 100
}

// ─── Attendance ───────────────────────────────────────────────────────────────

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  date: string;            // "2026-07-17"
  status: AttendanceStatus;
  markedBy: MarkedBy;
  createdAt: string;
}

export type AttendanceStatus =
  | 'present'
  | 'absent'
  | 'cancelled'
  | 'holiday';

export type MarkedBy = 'auto' | 'manual';

// ─── Computed / UI ────────────────────────────────────────────────────────────

export interface SubjectAttendanceSummary {
  subject: Subject;
  totalClasses: number;
  attended: number;
  absent: number;
  cancelled: number;
  percentage: number;
  isSafe: boolean;         // percentage >= minimumPercentage
}

export interface TodayClass {
  schedule: Schedule;
  subject: Subject;
  status: AttendanceStatus | 'upcoming' | 'ongoing';
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type RootStackParamList = {
  '(auth)': undefined;
  '(tabs)': undefined;
  'onboarding': undefined;
  'subject/[id]': { id: string };
};

export type TabParamList = {
  index: undefined;
  report: undefined;
  schedule: undefined;
  settings: undefined;
};
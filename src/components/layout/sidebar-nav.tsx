
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  Settings,
  BarChart,
  GraduationCap,
  BookMarked,
  CalendarClock
} from "lucide-react";

interface SidebarNavProps {
  collapsed: boolean;
  userRole: 'admin' | 'faculty' | 'student';
}

interface NavItem {
  href: string;
  label: string;
  translationKey: string;
  icon: React.ElementType;
  roles: Array<'admin' | 'faculty' | 'student'>;
}

export function SidebarNav({ collapsed, userRole }: SidebarNavProps) {
  const { t, i18n } = useTranslation();

  const navItems: NavItem[] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      translationKey: 'dashboard.title',
      icon: LayoutDashboard,
      roles: ['admin', 'faculty', 'student'],
    },
    {
      href: '/dashboard/courses',
      label: 'Courses',
      translationKey: 'courses.title',
      icon: BookOpen,
      roles: ['admin', 'faculty'],
    },
    {
      href: '/dashboard/student-courses',
      label: 'Course Registration',
      translationKey: 'studentCourses.title',
      icon: BookMarked,
      roles: ['student'],
    },
    {
      href: '/dashboard/schedule',
      label: 'Course Schedule',
      translationKey: 'schedule.title',
      icon: Calendar,
      roles: ['admin', 'faculty', 'student'],
    },
    {
      href: '/dashboard/exams',
      label: 'Exam Schedule',
      translationKey: 'exams.title',
      icon: CalendarClock,
      roles: ['admin', 'faculty', 'student'],
    },
    {
      href: '/dashboard/students',
      label: 'Students',
      translationKey: 'students.title',
      icon: Users,
      roles: ['admin', 'faculty'],
    },
    {
      href: '/dashboard/predictions',
      label: 'Predictions',
      translationKey: 'predictions.title',
      icon: BarChart,
      roles: ['admin'],
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      translationKey: 'settings.title',
      icon: Settings,
      roles: ['admin', 'faculty', 'student'],
    },
  ];

  return (
    <div className="space-y-1" dir="auto">
      {navItems
        .filter((item) => item.roles.includes(userRole))
        .map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
              end={item.href === '/dashboard'}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && <span>{t(item.translationKey)}</span>}
            </NavLink>
          );
        })}
    </div>
  );
}

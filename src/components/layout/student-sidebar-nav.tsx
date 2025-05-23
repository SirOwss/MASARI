
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Settings,
  BookMarked,
  Home,
  GraduationCap,
  FileText
} from "lucide-react";

interface StudentSidebarNavProps {
  collapsed: boolean;
}

interface NavItem {
  href: string;
  label: string;
  translationKey: string;
  icon: React.ElementType;
}

export function StudentSidebarNav({ collapsed }: StudentSidebarNavProps) {
  const { t, i18n } = useTranslation();

  const navItems: NavItem[] = [
    {
      href: '/student',
      label: 'Dashboard',
      translationKey: 'dashboard.title',
      icon: Home,
    },
    {
      href: '/student/exams',
      label: 'Exam Schedule',
      translationKey: 'exams.title',
      icon: Calendar,
    },
    {
      href: '/student/course-request',
      label: 'Course Request',
      translationKey: 'courseRequest.title',
      icon: BookMarked,
    },
    {
      href: '/student/course-registration',
      label: 'Course Registration',
      translationKey: 'courseRequest.registration',
      icon: FileText,
    },
    {
      href: '/student/courses',
      label: 'My Courses',
      translationKey: 'studentCourses.title',
      icon: GraduationCap,
    },
    {
      href: '/student/settings',
      label: 'Settings',
      translationKey: 'settings.title',
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-1" dir="auto">
      {navItems.map((item) => {
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
            end={item.href === '/student'}
          >
            <Icon className="h-4 w-4" />
            {!collapsed && <span>{t(item.translationKey)}</span>}
          </NavLink>
        );
      })}
    </div>
  );
}


import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScheduleProvider } from '@/components/exam-schedule/context/ScheduleContext';
import { ScheduleHeader } from '@/components/exam-schedule/components/ScheduleHeader';
import { ScheduleTabs } from '@/components/exam-schedule/components/ScheduleTabs';

const Schedule = () => {
  const { t } = useTranslation();

  return (
    <ScheduleProvider>
      <div className="space-y-6">
        <ScheduleHeader 
          title="schedule.title"
          subtitle="schedule.subtitle" 
        />
        <ScheduleTabs />
      </div>
    </ScheduleProvider>
  );
};

export default Schedule;


import React from 'react';
import { useTranslation } from 'react-i18next';

interface ScheduleHeaderProps {
  title: string;
  subtitle: string;
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({ title, subtitle }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{t(title)}</h1>
      <p className="text-muted-foreground">{t(subtitle)}</p>
    </div>
  );
};

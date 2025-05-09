
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-masari">{t('notFound.title')}</h1>
      <h2 className="text-2xl font-semibold mt-4">{t('notFound.subtitle')}</h2>
      <p className="text-muted-foreground mt-2 mb-8 max-w-md">
        {t('notFound.description')}
      </p>
      <Button onClick={() => navigate('/dashboard')} className="masari-gradient">
        {t('notFound.backToDashboard')}
      </Button>
    </div>
  );
};

export default NotFound;

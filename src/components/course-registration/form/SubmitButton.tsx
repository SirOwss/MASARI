
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isPending: boolean;
}

export function SubmitButton({ isPending }: SubmitButtonProps) {
  const { t } = useTranslation();
  
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {isPending ? t('common.submitting') : t('courseRequest.submit')}
    </Button>
  );
}

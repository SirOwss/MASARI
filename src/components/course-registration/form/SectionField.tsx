
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from 'react-hook-form';
import { CourseRequestForm } from '@/lib/queries/course-requests';

interface SectionFieldProps {
  form: UseFormReturn<CourseRequestForm>;
}

export function SectionField({ form }: SectionFieldProps) {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={form.control} 
      name="section_code" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('courseRequest.sectionCode')}</FormLabel>
          <FormControl>
            <Input placeholder={t('courseRequest.sectionCodePlaceholder')} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

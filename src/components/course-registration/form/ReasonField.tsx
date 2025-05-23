
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from 'react-hook-form';
import { CourseRequestForm } from '@/lib/queries/course-requests';

interface ReasonFieldProps {
  form: UseFormReturn<CourseRequestForm>;
}

export function ReasonField({ form }: ReasonFieldProps) {
  const { t } = useTranslation();
  
  return (
    <FormField 
      control={form.control} 
      name="reason" 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('courseRequest.reason')}</FormLabel>
          <FormControl>
            <Textarea 
              placeholder={t('courseRequest.reasonPlaceholder')} 
              className="min-h-[100px]" 
              {...field} 
            />
          </FormControl>
          <FormMessage className="text-xs">
            {field.value.length}/500
          </FormMessage>
        </FormItem>
      )}
    />
  );
}

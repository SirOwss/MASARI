
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { VenueFormProps } from './types';

export const VenueForm = ({ 
  isOpen, 
  onOpenChange, 
  selectedVenue, 
  onSubmit 
}: VenueFormProps) => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      name: selectedVenue?.name || '',
      capacity: selectedVenue?.capacity || 100,
    }
  });

  // Update form values when selectedVenue changes
  React.useEffect(() => {
    if (selectedVenue) {
      form.setValue('name', selectedVenue.name);
      form.setValue('capacity', selectedVenue.capacity);
    } else {
      form.reset({ name: '', capacity: 100 });
    }
  }, [selectedVenue, form]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedVenue ? t('schedule.editVenue') : t('schedule.addVenue')}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('schedule.venueName')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('schedule.capacity')}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      min={1}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">
                {selectedVenue ? t('schedule.updateVenue') : t('schedule.saveVenue')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

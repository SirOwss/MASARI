
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseRequestWithDetails } from '@/lib/queries/courseRequests';

interface ReviewRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  request: CourseRequestWithDetails | null;
  action: 'approved' | 'rejected';
  onSubmit: (comment: string, rejectionReason?: string) => void;
  isSubmitting: boolean;
}

interface ReviewFormValues {
  comment: string;
  rejectionReason?: string;
}

export function ReviewRequestDialog({
  isOpen,
  onOpenChange,
  request,
  action,
  onSubmit,
  isSubmitting
}: ReviewRequestDialogProps) {
  const { t } = useTranslation();

  const schema = z.object({
    comment: z.string().optional(),
    rejectionReason: action === 'rejected'
      ? z.string().min(1, { message: t('courseRequest.admin.rejectionRequired') })
      : z.string().optional()
  });

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: '',
      rejectionReason: ''
    },
    mode: 'onChange'
  });

  const handleSubmit = (data: ReviewFormValues) => {
    onSubmit(data.comment, data.rejectionReason);
  };

  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {action === 'approved' 
              ? t('courseRequest.admin.approveRequest') 
              : t('courseRequest.admin.rejectRequest')}
          </DialogTitle>
          <DialogDescription>
            {action === 'approved' 
              ? t('courseRequest.admin.approveDescription') 
              : t('courseRequest.admin.rejectDescription')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">{t('courseRequest.admin.student')}</p>
              <p className="font-medium">
                {request.student ? request.student.name : 'Guest User'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">{t('courseRequest.admin.studentId')}</p>
              <p className="font-medium">
                {request.student ? request.student.student_id : 'N/A'}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-muted-foreground">{t('courseRequest.admin.course')}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {request.course.code}
              </Badge>
              <p className="font-medium">{request.course.title}</p>
            </div>
            <div className="mt-1">
              <p className="text-muted-foreground">{t('courseRequest.admin.sectionCode')}</p>
              <p className="font-medium">{request.section_code}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-muted-foreground">{t('courseRequest.admin.studentReason')}</p>
            <p className="bg-muted rounded-md p-3 mt-1">{request.reason}</p>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('courseRequest.admin.comment')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('courseRequest.admin.commentPlaceholder')}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {action === 'rejected' && (
              <FormField
                control={form.control}
                name="rejectionReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('courseRequest.admin.rejectionReason')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('courseRequest.admin.rejectionPlaceholder')}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant={action === 'approved' ? 'default' : 'destructive'}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('common.processing') : action === 'approved' 
                  ? t('courseRequest.admin.confirmApprove') 
                  : t('courseRequest.admin.confirmReject')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

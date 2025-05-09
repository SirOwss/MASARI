
import React from 'react';
import { useForm } from "react-hook-form";
import { useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updateCoursePrediction } from "@/lib/queries/predictions";

interface EditCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    code: string;
    title: string;
    predicted: number;
    sections: number;
    avgPerSection: number;
  } | null;
}

type FormValues = {
  predicted: number;
  sections: number;
};

export function EditCourseDialog({ isOpen, onClose, course }: EditCourseDialogProps) {
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    defaultValues: {
      predicted: course?.predicted || 0,
      sections: course?.sections || 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (!course?.id) return;
      
      await updateCoursePrediction(course.id, values);
      
      toast({
        title: "Course Updated",
        description: "The course predictions have been updated successfully.",
      });
      
      onClose();
      // Refresh the courses data
      queryClient.invalidateQueries({ queryKey: ['predictions'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course predictions.",
        variant: "destructive",
      });
    }
  };

  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Predictions</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Course Details</h4>
            <p className="text-sm text-muted-foreground">
              {course.code} - {course.title}
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="predicted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Predicted Enrollment</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Sections</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}


import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Filter, 
  Download 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { fetchCourses, deleteCourse } from '@/lib/queries/courses';
import { AddCourseDialog } from '@/components/courses/AddCourseDialog';

const CoursesPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{ id: string; code: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { 
    data: courses = [], 
    isLoading, 
    isError
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses
  });

  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch();
    } else {
      setFilteredCourses(courses);
    }
  }, [courses]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredCourses(courses);
      return;
    }
    
    const filtered = courses.filter(course => 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredCourses(filtered);
    toast({
      title: filtered.length > 0 ? "Search Results" : "No Results Found",
      description: filtered.length > 0 ? `Found ${filtered.length} courses` : "Try a different search term",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      setFilteredCourses(courses);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilter = () => {
    toast({
      title: "Filter Courses",
      description: "Course filtering options will be displayed here",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Course Data",
      description: "Course data is being prepared for download",
    });
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;

    try {
      setIsDeleting(true);
      await deleteCourse(courseToDelete.id);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({
        title: t('courses.deleteSuccess.title'),
        description: t('courses.deleteSuccess.description', { code: courseToDelete.code }),
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: t('common.error'),
        description: t('courses.deleteError'),
        variant: "destructive",
      });
    } finally {
      setCourseToDelete(null);
      setIsDeleting(false);
    }
  };

  const handleDropdownAction = (action: string, course: any) => {
    if (action === "Delete") {
      setCourseToDelete({ id: course.id, code: course.code });
    } else {
      toast({
        title: action,
        description: t('courses.actionPerformed', { action, code: course.code }),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">{t('common.loading')}</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-500">
          {t('courses.errorLoading')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t('courses.title')}</h2>
        <Button className="masari-gradient" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('courses.addCourse')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('courses.allCourses')}</CardTitle>
          <CardDescription>
            {t('courses.subtitle')}
          </CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('courses.searchPlaceholder')}
                className="w-full pl-8"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button variant="outline" size="icon" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleFilter}>
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredCourses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('courses.table.courseId')}</TableHead>
                  <TableHead>{t('courses.table.title')}</TableHead>
                  <TableHead>{t('courses.table.credits')}</TableHead>
                  <TableHead className="text-right">{t('courses.table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleDropdownAction(t('courses.actions.view'), course)}>
                            {t('courses.actions.view')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDropdownAction(t('courses.actions.edit'), course)}>
                            {t('courses.actions.edit')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDropdownAction("Delete", course)}
                          >
                            {t('courses.actions.delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              {searchQuery ? t('courses.noSearchResults') : t('courses.noCourses')}
            </div>
          )}
        </CardContent>
      </Card>

      <AddCourseDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />

      <AlertDialog 
        open={!!courseToDelete} 
        onOpenChange={(open) => {
          if (!open && !isDeleting) setCourseToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('courses.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('courses.delete.description', { code: courseToDelete?.code })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? t('courses.delete.deleting') : t('courses.delete.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursesPage;

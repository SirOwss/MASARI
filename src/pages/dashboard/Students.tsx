
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";

const Students = () => {
  const { t } = useTranslation();
  const mockStudents = [
    { 
      id: '1', 
      name: 'Ahmed Mohamed', 
      level: 'Level 3', 
      gpa: '3.5', 
      courses: 5,
      tags: ['Honors', 'Scholarship']
    },
    { 
      id: '2', 
      name: 'Sara Ahmed', 
      level: 'Level 4', 
      gpa: '3.8', 
      courses: 4,
      tags: ['International', 'Honors']
    },
    { 
      id: '3', 
      name: 'Omar Ali', 
      level: 'Level 2', 
      gpa: '3.2', 
      courses: 6,
      tags: ['Transfer']
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('students.title')}</h1>
        <p className="text-muted-foreground">{t('students.subtitle')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('students.enrolledStudents')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('students.table.name')}</TableHead>
                <TableHead>{t('students.table.level')}</TableHead>
                <TableHead>{t('students.table.gpa')}</TableHead>
                <TableHead>{t('students.table.courses')}</TableHead>
                <TableHead>{t('students.table.tags')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>{student.gpa}</TableCell>
                  <TableCell>{student.courses}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.tags.map((tag, index) => (
                        <Tag key={index} variant={index % 2 === 0 ? "primary" : "secondary"}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;

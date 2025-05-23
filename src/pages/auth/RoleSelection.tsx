
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, UserCog } from "lucide-react";
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

const RoleSelection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectRole = (role: 'admin' | 'student') => {
    // Navigate to the appropriate login page based on role
    if (role === 'admin') {
      navigate('/admin-login');
    } else {
      navigate('/student-login');
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="masari-theme">
      <div className="min-h-screen flex flex-col">
        <header className="border-b py-4 px-6 flex items-center justify-between">
          <div className="text-2xl font-bold flex items-center">
            <span>M</span>
            <span className="relative">
              <span>S</span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-0.5 masari-gradient rounded-md text-xs text-white font-medium">
                MASARI
              </div>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t('roleSelection.title')}</CardTitle>
                <CardDescription>{t('roleSelection.description')}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 justify-start items-center gap-4 px-6"
                  onClick={() => handleSelectRole('admin')}
                >
                  <UserCog className="h-8 w-8" />
                  <div className="text-left">
                    <div className="font-medium">{t('roleSelection.admin')}</div>
                    <div className="text-sm text-muted-foreground">{t('roleSelection.adminDescription')}</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-24 justify-start items-center gap-4 px-6"
                  onClick={() => handleSelectRole('student')}
                >
                  <GraduationCap className="h-8 w-8" />
                  <div className="text-left">
                    <div className="font-medium">{t('roleSelection.student')}</div>
                    <div className="text-sm text-muted-foreground">{t('roleSelection.studentDescription')}</div>
                  </div>
                </Button>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" onClick={() => navigate('/')}>
                  {t('common.backToHome')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <footer className="border-t py-4 px-6">
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MASARI - College of Computing and Information Technology (FCITR)
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default RoleSelection;

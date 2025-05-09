
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import Logo from './logo';
import { SidebarNav } from './sidebar-nav';
import { Menu, ChevronLeft, LogOut, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LanguageSwitcher } from '../language-switcher';

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const userRole = 'admin';
  const { t, i18n } = useTranslation();

  // Ensure proper RTL/LTR direction when component mounts and language changes
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="masari-theme">
      <div className="flex min-h-screen">
        <aside 
          className={`fixed ${i18n.language === 'ar' ? 'right-0' : 'left-0'} top-0 z-20 flex h-full flex-col border-r bg-sidebar transition-all duration-300 ${
            collapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="flex h-14 items-center border-b px-3">
            {!collapsed && (
              <div className="flex-1">
                <Logo />
              </div>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              <ChevronLeft 
                className={`h-4 w-4 transition-transform ${
                  collapsed ? 'rotate-180' : ''
                } ${i18n.language === 'ar' ? 'rotate-180' : ''}`} 
              />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-3">
            <SidebarNav collapsed={collapsed} userRole={userRole} />
          </div>
        </aside>

        <div 
          className={`flex w-full flex-col transition-all duration-300 ${
            collapsed 
              ? i18n.language === 'ar' ? 'pr-16' : 'pl-16' 
              : i18n.language === 'ar' ? 'pr-64' : 'pl-64'
          }`}
        >
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
            <div className="flex flex-1 items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold">MASARI Academic Operations Platform</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <LanguageSwitcher />
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-8 w-8"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t('common.myAccount')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t('common.profile')}</DropdownMenuItem>
                  <DropdownMenuItem>{t('settings.title')}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('common.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          
          <footer className="border-t py-4 px-6">
            <div className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} MASARI - College of Computing and Information Technology (FCITR)
            </div>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import { BookOpen, Calendar, BarChart, Users } from 'lucide-react';
import { LanguageSwitcher } from '@/components/language-switcher';

const Home = () => {
  const { t } = useTranslation();

  return (
    <ThemeProvider defaultTheme="light" storageKey="masari-theme">
      <div className="min-h-screen flex flex-col">
        <header className="border-b py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold flex items-center">
              <span>M</span>
              <span className="relative">
                <span>S</span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-2 py-0.5 masari-gradient rounded-md text-xs text-white font-medium">
                  MASARI
                </div>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium hover:text-primary">{t('common.features')}</a>
              <a href="#about" className="text-sm font-medium hover:text-primary">{t('common.about')}</a>
              <a href="#contact" className="text-sm font-medium hover:text-primary">{t('common.contact')}</a>
            </nav>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild>
              <Link to="/role-selection">{t('common.login')}</Link>
            </Button>
          </div>
        </header>

        <section className="py-20 px-6 flex-1">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="masari-gradient">
                <Link to="/role-selection">{t('common.getStarted')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#features">{t('common.learnMore')}</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">{t('home.features.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 masari-gradient rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t('home.features.courseRegistration.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.features.courseRegistration.description')}
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 masari-gradient rounded-full flex items-center justify-center mb-6">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t('home.features.sectionPrediction.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.features.sectionPrediction.description')}
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 masari-gradient rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t('home.features.examScheduling.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.features.examScheduling.description')}
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 masari-gradient rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {t('home.features.userRoleManagement.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('home.features.userRoleManagement.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">{t('home.about.title')}</h2>
            <p className="text-lg text-center mb-10">
              {t('home.about.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-bold mb-2">{t('home.about.mission.title')}</h3>
                <p className="text-muted-foreground">{t('home.about.mission.description')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('home.about.vision.title')}</h3>
                <p className="text-muted-foreground">{t('home.about.vision.description')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('home.about.values.title')}</h3>
                <p className="text-muted-foreground">{t('home.about.values.description')}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">{t('home.contact.title')}</h2>
            <p className="text-lg mb-10">
              {t('home.contact.description')}
            </p>
            <Button className="masari-gradient">{t('home.contact.button')}</Button>
          </div>
        </section>

        <footer className="border-t py-8 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MASARI - College of Computing and Information Technology (FCITR). All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Home;

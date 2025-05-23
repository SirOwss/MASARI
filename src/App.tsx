
import '@/i18n/config';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { StudentLayout } from "@/components/layout/student-layout";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Courses from "./pages/dashboard/Courses";
import Schedule from "./pages/dashboard/Schedule";
import Exams from "./pages/dashboard/Exams";
import Students from "./pages/dashboard/Students";
import Predictions from "./pages/dashboard/Predictions";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/dashboard/NotFound";
import RoleSelection from "./pages/auth/RoleSelection";
import CourseRequests from "./pages/dashboard/CourseRequests";
import AdminLogin from "./pages/auth/AdminLogin";
import StudentLogin from "./pages/auth/StudentLogin";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExams from "./pages/student/StudentExams";
import StudentCourses from "./pages/student/StudentCourses";
import CourseRequest from "./pages/student/CourseRequest";
import CourseRegistration from "./pages/student/CourseRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="masari-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/student-login" element={<StudentLogin />} />
              
              {/* Admin Dashboard routes */}
              <Route path="/dashboard" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<Courses />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="exams" element={<Exams />} />
                <Route path="students" element={<Students />} />
                <Route path="predictions" element={<Predictions />} />
                <Route path="settings" element={<Settings />} />
                <Route path="course-requests" element={<CourseRequests />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Student Dashboard routes */}
              <Route path="/student" element={<StudentLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="exams" element={<StudentExams />} />
                <Route path="course-request" element={<CourseRequest />} />
                <Route path="course-registration" element={<CourseRegistration />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

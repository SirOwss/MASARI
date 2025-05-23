
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { UserCog } from "lucide-react";
import { authenticateAdmin } from '@/lib/auth-service';
import { toast } from 'sonner';

const formSchema = z.object({
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const AdminLogin: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const session = await authenticateAdmin(values.employeeId, values.password);
    if (session) {
      toast.success("Login Successful", {
        description: "You have been logged in successfully."
      });
      navigate('/dashboard');
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
                <div className="flex justify-center mb-2">
                  <UserCog className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Administrator Login</CardTitle>
                <CardDescription>Enter your Employee ID and password to access the admin portal</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="employeeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your employee ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="text-sm text-center text-muted-foreground">
                  <p>Demo Account:</p>
                  <p>Employee ID: 0011</p>
                  <p>Password: 123456</p>
                </div>
                <Button variant="link" size="sm" onClick={() => navigate('/role-selection')}>
                  Back to Role Selection
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

export default AdminLogin;

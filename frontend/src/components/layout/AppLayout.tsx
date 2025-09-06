import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
// import { supabase } from "../../supabaseClient";
import {supabase} from "@/supabaseClient";
interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {

   
      const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: "", 
        phone: ""
      });
      const navigate = useNavigate();
      const { toast } = useToast();
    
      useEffect(() => {
        const fetchProfile  = async() => {
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          if (sessionError || !sessionData.session) {
            console.error("No active session found:", sessionError);
            return navigate("/login", { replace: true });
          }
    
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, name, email, number, role")
            .eq("id", sessionData.session.user.id)
            .single();
    
          if (userError) return navigate("/login", { replace: true });
    
          setProfile(userData);
        };
    
        fetchProfile();
      }, [navigate]);
    




  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <div className="text-sm text-muted-foreground">
                OpenPit Mine Site Alpha-7
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-status-danger text-white text-xs">
                  3
                </Badge>
              </Button>
              
              <div className="flex items-center gap-2 pl-2 border-l border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block text-sm">
                  <div className="font-medium text-foreground">{profile.name}</div>
                  <div className="text-xs text-muted-foreground">{profile.role}</div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
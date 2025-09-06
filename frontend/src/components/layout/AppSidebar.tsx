import { NavLink, useLocation } from "react-router-dom";
import {
  Shield,
  Map,
  AlertTriangle,
  TrendingUp,
  Settings,
  Home,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { title } from "process";

const items = [
  { title: "Dashboard", url: "/Dashboard", icon: Home },
  { title: "Predict Live", url: "/predict-live", icon: TrendingUp },

  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Data Trends", url: "/trends", icon: TrendingUp },
  { title: "QnA", url: "/qna", icon: Map },
  { title: "Settings", url: "/settings", icon: Settings },
  
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium shadow-sm"
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="bg-slate-800 !text-white border-b border-border p-4 ">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-sm">RockSafe AI</h2>
              <p className="text-xs text-muted-foreground">
                Mining Safety System
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-800 !text-white">
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-md ${
                          isActive
                            ? "bg-slate-700 text-white font-medium"
                            : "hover:bg-slate-700 text-slate-300 hover:text-white"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* ✅ Logout button */}
        <div className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-500 text-blue-100 hover:text-white transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Footer */}
          <div className="mt-auto p-4 border-t border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400 group-data-[collapsible=icon]:hidden">
                System Online
              </span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

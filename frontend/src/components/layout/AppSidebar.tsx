import { NavLink, useLocation } from "react-router-dom";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Home,
  Activity
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

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Risk Maps", url: "/risk-maps", icon: MapPin },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Data Trends", url: "/trends", icon: TrendingUp },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-sm">RockSafe AI</h2>
              <p className="text-xs text-muted-foreground">Mining Safety System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium px-3 mb-2">
            {!isCollapsed && "MONITORING"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium text-sm">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-3 w-3 text-status-safe" />
              <span>System Online</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last sync: 2 min ago
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
// components/layout/AppLayout.tsx
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  TrendingUp,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  PanelLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ────────────────────── Auth Helpers ────────────────────── */
interface Auth {
  email: string;
  role: "talent" | "brand" | "admin";
}
const getAuth = (): Auth | null => {
  const stored = localStorage.getItem("auth");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Auth;
  } catch {
    return null;
  }
};
const clearAuth = () => localStorage.removeItem("auth");

/* ────────────────────── AppLayout ────────────────────── */
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  /* ────── Nav items per role ────── */
  const getNavItems = () => {
    if (!auth) return [];

    switch (auth.role) {
      case "talent":
        return [
          { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
          { path: "/deals", label: "My Deals", icon: FileText },
          { path: "/earnings", label: "Earnings", icon: DollarSign },
        ];
      case "brand":
        return [
          { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
          { path: "/discover", label: "Discover Talent", icon: Users },
          { path: "/campaigns", label: "Campaigns", icon: FileText },
        ];
      case "admin":
        return [
          { path: "/admin", label: "Admin Dashboard", icon: TrendingUp },
          { path: "/discover", label: "All Talent", icon: Users },
          { path: "/roster", label: "My Roster", icon: Users },
          { path: "/analytics", label: "Analytics", icon: TrendingUp },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const userName = auth?.email.split("@")[0] || "User";
  const userRole = auth?.role
    ? auth.role.charAt(0).toUpperCase() + auth.role.slice(1)
    : "";

  /* ────── Home redirect for logo ────── */
  const homePath = auth
    ? auth.role === "talent"
      ? "/dashboard"
      : auth.role === "brand"
      ? "/discover"
      : "/admin"
    : "/";

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background text-foreground">

        {/* ────── SIDEBAR ────── */}
        <Sidebar className="border-r-0 bg-sidebar/80 backdrop-blur-xl">
          {/* Header – Logo */}
          <SidebarHeader className="p-5 border-b border-sidebar-border/50">
            <Link to={homePath} className="flex items-center space-x-2.5">
              <img src="/agency_logo.png" alt="Logo" className="h-9 w-auto" />
              <span className="text-xl font-bold tracking-tight">PorTe</span>
            </Link>
          </SidebarHeader>

          {/* Menu */}
          <SidebarContent className="p-2">
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        "group flex items-center w-full rounded-xl transition-all duration-200",
                        active
                          ? "bg-primary/10 text-primary font-medium shadow-sm"
                          : "text-sidebar-foreground hover:bg-accent/80 hover:text-accent-foreground"
                      )}
                    >
                      <Link to={item.path} className="flex w-full items-center gap-3 px-3 py-2.5">
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {active && (
                          <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          {/* Footer – optional extra links */}
          <SidebarFooter className="p-3 border-t border-sidebar-border/50">
            <p className="text-xs text-center text-sidebar-foreground/60">
              © 2025 PorTe Management
            </p>
          </SidebarFooter>
        </Sidebar>

        {/* ────── MAIN AREA ────── */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Top bar – Trigger + User dropdown */}
          <header className="flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger className="lg:hidden" />
            <div className="flex items-center gap-3 ml-auto">

              {/* USER DROPDOWN (right side) */}
              {auth && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2.5 p-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:flex flex-col items-start overflow-hidden">
                        <span className="text-sm font-medium truncate max-w-[120px]">
                          {userName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {userRole}
                        </span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={undefined} />
                        <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">{userRole}</p>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="flex items-center text-destructive cursor-pointer"
                      onSelect={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
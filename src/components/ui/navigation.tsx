import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  TrendingUp,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  Badge
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import talentAvatar1 from "@/assets/talent-avatar-1.jpg";
// ────────────────────────────── AUTH HELPERS ──────────────────────────────
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

const clearAuth = () => {
  localStorage.removeItem("auth");
};

// ────────────────────────────── NAVIGATION ──────────────────────────────
export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

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
          { path: "/admin", label: "Admin", icon: TrendingUp },
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
  const userRoleLabel = auth?.role
    ? auth.role.charAt(0).toUpperCase() + auth.role.slice(1)
    : "";

  const roleColor = {
    talent: "bg-emerald-100 text-emerald-700",
    brand: "bg-indigo-100 text-indigo-700",
    admin: "bg-rose-100 text-rose-700",
  }[auth?.role || "talent"];

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-white/30 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ───── LEFT: LOGO + DESKTOP LINKS ───── */}
          <div className="flex items-center">
            <Link
              to={auth ? (auth.role === "talent" ? "/dashboard" : auth.role === "brand" ? "/discover" : "/admin") : "/"}
              className="flex items-center space-x-2"
            >
              <img src="/agency_logo.png" alt="Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Nav */}
            {navItems.length > 0 && (
              <div className="hidden md:flex ml-10 space-x-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        relative inline-flex items-center px-1 pt-1 text-sm font-medium
                        transition-all duration-200 group
                        ${isActive(item.path)
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 mr-1.5" />
                      {item.label}
                      {isActive(item.path) && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* ───── RIGHT: MOBILE MENU + USER DROPDOWN ───── */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* User Dropdown */}
            {auth ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-transparent hover:ring-indigo-300 transition-all"
                  >
                    <Avatar className="h-10 w-10">
                   <AvatarImage src={talentAvatar1}/>
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold">
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-64 p-0 overflow-hidden rounded-xl shadow-2xl border border-white/20 bg-white/90 backdrop-blur-md"
                  align="end"
                  sideOffset={8}
                >
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-pink-50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 ring-2 ring-white">
                        <AvatarImage src={talentAvatar1}/>
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white text-lg font-bold">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">Marcus</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                       marcus.thompson@duke.edu
                        </p>
                      </div>
                    </div>
                    {/* <Badge className={`mt-2 text-xs font-medium ${roleColor}`}>
                      {userRoleLabel}
                    </Badge> */}
                  </div>

                  <DropdownMenuSeparator className="m-0" />

                  {/* Menu Items */}
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2.5 text-sm hover:bg-primary cursor-pointer"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="m-0" />

                  <DropdownMenuItem
                    onSelect={handleLogout}
                    className="flex items-center px-4 py-2.5 text-sm text-destructive hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Not logged in */
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ───── MOBILE MENU ───── */}
        {mobileOpen && auth && (
          <div className="md:hidden border-t border-white/30 bg-white/70 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive(item.path)
                        ? "bg-gradient-to-r from-indigo-100 to-pink-100 text-foreground"
                        : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
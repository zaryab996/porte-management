import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import TalentProfile from "./pages/TalentProfile";
import Deals from "./pages/Deals";
import Campaigns from "./pages/Campaigns";
import Earnings from "./pages/Earnings";
import Roster from "./pages/Roster";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* ────────────────────── Auth helpers ────────────────────── */
interface Auth {
  email: string;
  role: "talent" | "brand" | "admin";
}

const getAuth = (): Auth | null => {
  const raw = localStorage.getItem("auth");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Auth;
  } catch {
    return null;
  }
};

const setAuth = (auth: Auth) => localStorage.setItem("auth", JSON.stringify(auth));
const clearAuth = () => localStorage.removeItem("auth");

/* ────────────────────── ProtectedRoute ────────────────────── */
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Auth["role"][];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Not logged in ─────────────────────────────────────
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ── Wrong role ───────────────────────────────────────
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    navigate(-1);               // just go back
    return null;
  }

  // ── All good ────────────────────────────────────────
  return <>{children}</>;
};

/* ────────────────────── PublicOnlyRoute ────────────────────── */
interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

/** Shows the page **only** when the user is NOT logged in.
 *  If he is logged in → redirect to his role-specific home. */
const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const auth = getAuth();
  const navigate = useNavigate();

  if (auth) {
    const home: Record<Auth["role"], string> = {
      talent: "/dashboard",
      brand: "/discover",
      admin: "/admin",
    };
    // `replace` avoids adding the public page to history
    return <Navigate to={home[auth.role]} replace />;
  }

  return <>{children}</>;
};

/* ────────────────────── LoginRedirect Hook ────────────────────── */
export const useLoginRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = (auth: Auth) => {
    setAuth(auth);

    const defaultHome: Record<Auth["role"], string> = {
      talent: "/dashboard",
      brand: "/discover",
      admin: "/admin",
    };

    const goTo =
      from === "/login" || from === "/signup" ? defaultHome[auth.role] : from;

    navigate(goTo, { replace: true });
  };

  return { handleLogin };
};

/* ────────────────────── Main App ────────────────────── */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* ---------- PUBLIC ONLY (login / signup / index) ---------- */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            }
          />
          {/* <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <Index />
              </PublicOnlyRoute>
            }
          /> */}
            <Route
    path="/"
    element={<Navigate to="/login" replace />}
  />

          {/* --------------------- PROTECTED ROUTES --------------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["talent"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discover"
            element={
              <ProtectedRoute allowedRoles={["brand"]}>
                <Discover />
              </ProtectedRoute>
            }
          />
          <Route
            path="/talent/:id"
            element={
              <ProtectedRoute allowedRoles={["talent", "brand"]}>
                <TalentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deals"
            element={
              <ProtectedRoute allowedRoles={["talent", "brand"]}>
                <Deals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute allowedRoles={["talent", "brand"]}>
                <Campaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/earnings"
            element={
              <ProtectedRoute allowedRoles={["talent", "brand"]}>
                <Earnings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roster"
            element={
              <ProtectedRoute allowedRoles={["talent", "brand"]}>
                <Roster />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={["talent", "brand"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["talent", "brand", "admin"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* -------------------------- 404 -------------------------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
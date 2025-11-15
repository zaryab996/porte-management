import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  DollarSign,
  TrendingUp,
  Eye,
  Star,
  FileText,
  Users,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { mockDealsData } from "@/data/mockData";
import talentAvatar1 from "@/assets/talent-avatar-1.jpg";

interface User {
  name: string;
  avatar?: string;
  id: string;
  role: "talent";
}

// Helper – get user from localStorage (you can store it on login)
const getUserFromStorage = (): User | null => {
  const raw = localStorage.getItem("appUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const Dashboard = () => {
  // -----------------------------------------------------------------
  // 1. USER STATE (from localStorage → mock fallback)
  // -----------------------------------------------------------------
  const [user, setUser] = useState<User>({
    name: "Marcus Thompson",
    avatar: talentAvatar1,
    id: "1",
    role: "talent",
  });

  useEffect(() => {
    const stored = getUserFromStorage();
    if (stored) setUser(stored);
  }, []);

  // -----------------------------------------------------------------
  // 2. DERIVED DATA
  // -----------------------------------------------------------------
  const userDeals = mockDealsData.filter((d) => d.talentId === user.id);
  const totalEarnings = userDeals.reduce(
    (s, d) => s + (d.value * (100 - d.commissionRate)) / 100,
    0
  );
  const activeDeals = userDeals.filter(
    (d) => d.status === "approved" || d.status === "pending"
  ).length;

  const recentDeals = userDeals.slice(0, 6); // show up to 6

  // -----------------------------------------------------------------
  // 3. STATS (animated on mount)
  // -----------------------------------------------------------------
  const stats = [
    {
      title: "Total Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
      gradient: "from-primary to-primary-hover",
    },
    {
      title: "Active Deals",
      value: activeDeals.toString(),
      change: "+2",
      icon: FileText,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "Profile Views",
      value: "2.4K",
      change: "+18%",
      icon: Eye,
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "NIL Rating",
      value: "4.8",
      change: "+0.3",
      icon: Star,
      gradient: "from-amber-400 to-orange-600",
    },
  ];

  // -----------------------------------------------------------------
  // 4. STATUS BADGE COLOR
  // -----------------------------------------------------------------
  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      approved: "bg-emerald-100 text-emerald-800",
      pending: "bg-amber-100 text-amber-800",
      completed: "bg-indigo-100 text-indigo-800",
      rejected: "bg-red-100 text-red-800",
    };
    return map[status] ?? "bg-gray-100 text-gray-800";
  };

  // -----------------------------------------------------------------
  // 5. PROFILE STRENGTH (85 % – radial + checklist)
  // -----------------------------------------------------------------
  const profileCompletion = 85;
  const circumference = 2 * Math.PI * 45; // r = 45
  const strokeDashoffset =
    circumference - (profileCompletion / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ----- Greeting ----- */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-primary to-pink-600">
            Hey {user.name.split(" ")[0]}!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Here’s a snapshot of your NIL activity.
          </p>
        </header>

        {/* ----- Stats Grid (Glassmorphic) ----- */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {s.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {s.value}
                    </p>
                    <p className="flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {s.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full bg-gradient-to-br ${s.gradient} text-white`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ----- Recent Deals (6 cards, scrollable on small screens) ----- */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Recent Deals
                </CardTitle>
                <Link to="/deals">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-1">
                  {recentDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all border border-slate-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold">
                          {deal.brandName[0]}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {deal.brandName}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {deal.dealType}
                          </p>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="font-semibold text-foreground">
                          ${deal.value.toLocaleString()}
                        </p>
                        <Badge className={getStatusBadge(deal.status)}>
                          {deal.status.charAt(0).toUpperCase() +
                            deal.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {recentDeals.length === 0 && (
                    <p className="col-span-2 text-center text-muted-foreground py-8">
                      No deals yet – start pitching!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ----- Profile Strength (Radial + Checklist) ----- */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Profile Strength
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Radial Progress */}
                <div className="relative flex justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="45"
                      stroke="rgb(241 245 249)"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="45"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="primary" />
                        <stop offset="100%" stopColor="#2E5A88" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">
                      {profileCompletion}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Complete
                    </span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-2 text-sm">
                  {[
                    { label: "Photos uploaded", done: true },
                    { label: "Bio completed", done: true },
                    { label: "Add portfolio items", done: false },
                    { label: "Link social accounts", done: false },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 mr-2 text-amber-500" />
                      )}
                      <span
                        className={
                          item.done
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/profile" className="block">
                  <Button className="w-full bg-primary  text-white">
                    Complete Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

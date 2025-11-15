import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  Wallet,
  PiggyBank,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,               // <-- NEW
  CheckCircle,         // <-- NEW
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockDealsData } from "@/data/mockData";
import talentAvatar1 from "@/assets/talent-avatar-1.jpg";
import { PaymentMethodCard } from '@/components/ui/PaymentCard';

interface User {
  name: string;
  avatar?: string;
  id: string;
  role: "talent";
}

const getUserFromStorage = (): User | null => {
  const raw = localStorage.getItem("appUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const Earnings = () => {
  const [user, setUser] = useState<User>({
    name: "Marcus Thompson",
    avatar: talentAvatar1,
    id: "1",
    role: "talent",
  });

  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    const stored = getUserFromStorage();
    if (stored) setUser(stored);
  }, []);

  const userDeals = mockDealsData.filter((d) => d.talentId === user.id);
  const completedDeals = userDeals.filter((d) => d.status === "completed");

  const totalEarnings = completedDeals.reduce(
    (s, d) => s + (d.value * (100 - d.commissionRate)) / 100,
    0
  );

  const totalCommissions = completedDeals.reduce(
    (s, d) => s + (d.value * d.commissionRate) / 100,
    0
  );

  const pendingEarnings = userDeals
    .filter((d) => d.status === "approved")
    .reduce((s, d) => s + (d.value * (100 - d.commissionRate)) / 100, 0);

  // Monthly data for chart
  const monthlyData = [
    { month: "Jan", earnings: 5200, deals: 2 },
    { month: "Feb", earnings: 8100, deals: 3 },
    { month: "Mar", earnings: 12400, deals: 4 },
    { month: "Apr", earnings: 9800, deals: 3 },
    { month: "May", earnings: 15600, deals: 5 },
    { month: "Jun", earnings: 11200, deals: 3 },
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const growthRate = ((currentMonth.earnings - previousMonth.earnings) / previousMonth.earnings * 100).toFixed(1);

  const payoutSchedule = [
    { brand: "Nike", amount: 12750, date: "2024-02-15", status: "pending" },
    { brand: "Lululemon", amount: 21250, date: "2024-02-28", status: "scheduled" },
  ];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getPayoutStatusConfig = (status: string) => {
    const map: Record<string, { badge: string; icon: React.ReactNode }> = {
      pending: { badge: "bg-amber-100 text-amber-800", icon: <Clock className="w-3 h-3" /> },
      scheduled: { badge: "bg-indigo-100 text-indigo-800", icon: <Calendar className="w-3 h-3" /> },
      completed: { badge: "bg-emerald-100 text-emerald-800", icon: <CheckCircle className="w-3 h-3" /> },
    };
    return map[status] ?? { badge: "bg-gray-100 text-gray-800", icon: null };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold bg-clip-text  bg-primary">
              My Earnings
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Track your income, payouts, and financial growth
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-48 bg-white/70 backdrop-blur border border-white/30">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Total Earnings",
              value: `$${totalEarnings.toLocaleString()}`,
              change: `+${growthRate}%`,
              icon: DollarSign,
              gradient: "from-primary to-primary",
              color: "text-primary",
            },
            {
              title: "Pending Earnings",
              value: `$${pendingEarnings.toLocaleString()}`,
              change: "Approved deals",
              icon: Wallet,
              gradient: "from-amber-400 to-orange-600",
              color: "text-amber-600",
            },
            {
              title: "Total Commissions",
              value: `$${totalCommissions.toLocaleString()}`,
              change: "15% to PMA",
              icon: PiggyBank,
              gradient: "from-indigo-500 to-purple-600",
              color: "text-indigo-600",
            },
            {
              title: "Completed Deals",
              value: completedDeals.length.toString(),
              change: "This year",
              icon: BarChart3,
              gradient: "from-pink-500 to-rose-600",
              color: "text-pink-600",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="flex items-center text-sm text-green-600">
                      {stat.change.includes("%") ? (
                        <>
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          {stat.change}
                        </>
                      ) : (
                        <span className="text-muted-foreground">{stat.change}</span>
                      )}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-br ${stat.gradient} text-white`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Chart + Recent Payouts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Performance Chart */}
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                  Earnings Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="primary" />
                    <XAxis dataKey="month" tick={{ fill: "primary" }} />
                    <YAxis tick={{ fill: "primary" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "primary",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="earnings" fill="url(#gradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="primary" />
                        <stop offset="100%" stopColor="#2E5A88" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Payouts */}
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Recent Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedDeals.slice(0, 3).map((deal) => {
                    const earnings = deal.value * (100 - deal.commissionRate) / 100;
                    return (
                      <div
                        key={deal.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all border border-slate-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium">{deal.brandName}</p>
                            <p className="text-xs text-muted-foreground">{deal.dealType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-600">+${earnings.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(deal.date)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Payouts */}
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                  Upcoming Payouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payoutSchedule.map((payout, i) => {
                    const { badge, icon } = getPayoutStatusConfig(payout.status);
                    return (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-xs">
                          {i + 1}
                        </div>
                        <div className="ml-2 p-3 bg-white/50 rounded-lg border border-white/30">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium">{payout.brand}</span>
                            <Badge className={`${badge} text-xs flex items-center gap-1`}>
                              {icon}
                              <span>{payout.status}</span>
                            </Badge>
                          </div>
                          <p className="text-lg font-semibold text-emerald-600">${payout.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(payout.date)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
           <PaymentMethodCard />

            {/* Tax Information */}
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Tax Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-emerald-800">YTD Earnings</p>
                    <p className="text-xl font-bold text-emerald-700">${totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm font-medium text-amber-800">Estimated Tax</p>
                    <p className="text-xl font-bold text-amber-700">${(totalEarnings * 0.25).toLocaleString()}</p>
                    <p className="text-xs text-amber-600">25% estimated rate</p>
                  </div>
                
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
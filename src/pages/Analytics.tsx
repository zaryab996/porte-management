import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, DollarSign, TrendingUp } from "lucide-react";
import { mockAnalyticsData } from "@/data/mockData";

const Analytics = () => {
  const [user] = useState({
    name: "Admin",
    role: "admin" as const,
    avatar: undefined
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} userName={user.name} userAvatar={user.avatar} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Platform performance insights</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Talent</p>
                  <p className="text-3xl font-bold">{mockAnalyticsData.totalTalent}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                  <p className="text-3xl font-bold">{mockAnalyticsData.activeDeals}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold">${(mockAnalyticsData.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Deal Value</p>
                  <p className="text-3xl font-bold">${(mockAnalyticsData.avgDealValue / 1000).toFixed(0)}K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalyticsData.topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">{performer.deals} deals</p>
                  </div>
                  <p className="font-semibold text-success">${performer.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
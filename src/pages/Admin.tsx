import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, TrendingUp, Settings } from "lucide-react";
import { mockAnalyticsData, mockTalentData, mockDealsData } from "@/data/mockData";

const Admin = () => {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform management and oversight</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{mockTalentData.length + 50}</p>
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
                  <p className="text-3xl font-bold">{mockDealsData.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Platform Revenue</p>
                  <p className="text-3xl font-bold">${(mockAnalyticsData.totalRevenue * 0.15 / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">System Status</p>
                  <Badge className="bg-success text-success-foreground">Online</Badge>
                </div>
                <Settings className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg">
                <p className="font-medium">New talent registration: Sofia Rodriguez</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <p className="font-medium">Deal approved: Nike x Marcus Thompson</p>
                <p className="text-sm text-muted-foreground">4 hours ago</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <p className="font-medium">Brand verification: Lululemon</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
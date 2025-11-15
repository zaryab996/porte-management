import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, Users, DollarSign, TrendingUp, Eye, 
  Plus, Search, Target, BarChart3, Clock 
} from "lucide-react";
import { mockCampaignsData } from "@/data/mockData";

const Campaigns = () => {
  const [user] = useState({
    name: "Brand Manager",
    role: "brand" as const,
    avatar: undefined
  });

  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCampaigns = mockCampaignsData.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.round((elapsed / total) * 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalBudget = filteredCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const activeCampaigns = filteredCampaigns.filter(c => c.status === 'active').length;
  const totalReach = filteredCampaigns.reduce((sum, campaign) => sum + campaign.reach, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} userName={user.name} userAvatar={user.avatar} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Campaigns</h1>
            <p className="text-muted-foreground">Manage your talent marketing campaigns</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                  <p className="text-2xl font-bold text-success">{activeCampaigns}</p>
                </div>
                <Target className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                  <p className="text-2xl font-bold">{(totalReach / 1000000).toFixed(1)}M</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Engagement</p>
                  <p className="text-2xl font-bold">8.5%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Target className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{campaign.name}</CardTitle>
                      <p className="text-muted-foreground">{campaign.brandName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="text-xl font-semibold">${campaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reach</p>
                    <p className="text-xl font-semibold">{(campaign.reach / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="text-xl font-semibold">{(campaign.engagement / 1000).toFixed(1)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Talent</p>
                    <p className="text-xl font-semibold">{campaign.talent.length}</p>
                  </div>
                </div>

                {campaign.status === 'active' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Campaign Progress</span>
                      <span>{calculateProgress(campaign.startDate, campaign.endDate)}%</span>
                    </div>
                    <Progress value={calculateProgress(campaign.startDate, campaign.endDate)} className="h-2" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{campaign.name}</DialogTitle>
                          <DialogDescription>
                            Campaign details and performance metrics
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Budget</p>
                              <p className="text-2xl font-semibold">${campaign.budget.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Status</p>
                              <Badge className={getStatusColor(campaign.status)}>
                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-3">Performance Metrics</p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 border border-border rounded-lg">
                                <p className="text-2xl font-semibold text-primary">{(campaign.reach / 1000).toFixed(0)}K</p>
                                <p className="text-sm text-muted-foreground">Total Reach</p>
                              </div>
                              <div className="p-4 border border-border rounded-lg">
                                <p className="text-2xl font-semibold text-success">{(campaign.engagement / 1000).toFixed(1)}K</p>
                                <p className="text-sm text-muted-foreground">Engagement</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-3">Talent Roster</p>
                            <div className="space-y-2">
                              {campaign.talent.map((talentName, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                      {talentName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{talentName}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Start: {formatDate(campaign.startDate)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              End: {formatDate(campaign.endDate)}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-4">Create your first campaign to start working with talent.</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
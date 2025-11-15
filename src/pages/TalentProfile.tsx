import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  MapPin, Users, TrendingUp, Star, Clock, Instagram, Twitter, 
  MessageCircle, Send, Award, Target, Briefcase, CheckCircle 
} from "lucide-react";
import { mockTalentData } from "@/data/mockData";

const TalentProfile = () => {
  const { id } = useParams();
  const talent = mockTalentData.find(t => t.id === id);
  const [user] = useState({
    name: "Brand Manager",
    role: "brand" as const,
    avatar: undefined
  });

  const [dealForm, setDealForm] = useState({
    dealType: "",
    budget: "",
    description: "",
    timeline: ""
  });

  if (!talent) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation userRole={user.role} userName={user.name} userAvatar={user.avatar} />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Talent Not Found</h2>
            <p className="text-muted-foreground mb-4">The talent profile you're looking for doesn't exist.</p>
            <Link to="/discover">
              <Button>Back to Discovery</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const socialStats = [
    { platform: "Instagram", count: talent.followers.instagram, icon: Instagram, color: "text-pink-500" },
    { platform: "TikTok", count: talent.followers.tiktok, icon: Users, color: "text-gray-800" },
    { platform: "Twitter", count: talent.followers.twitter, icon: Twitter, color: "text-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} userName={user.name} userAvatar={user.avatar} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="h-48 bg-gradient-hero rounded-lg"></div>
          <div className="absolute -bottom-16 left-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={talent.avatar} alt={talent.name} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-3xl">
                {talent.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          {talent.verified && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-accent text-accent-foreground px-3 py-1">
                <Star className="h-4 w-4 mr-1" />
                Verified Talent
              </Badge>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{talent.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {talent.position} • {talent.sport} • {talent.university}
              </p>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                {talent.location}
              </div>
              <p className="text-foreground leading-relaxed">{talent.bio}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="achievements">Awards</TabsTrigger>
                <TabsTrigger value="rights">Rights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Social Media Reach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {socialStats.map((social) => (
                        <div key={social.platform} className="text-center p-4 border border-border rounded-lg">
                          <social.icon className={`h-8 w-8 mx-auto mb-2 ${social.color}`} />
                          <p className="font-semibold text-lg">{formatFollowers(social.count)}</p>
                          <p className="text-sm text-muted-foreground">{social.platform}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
                      <p className="text-center">
                        <span className="text-2xl font-bold text-primary">
                          {formatFollowers(
                            talent.followers.instagram + talent.followers.tiktok + talent.followers.twitter
                          )}
                        </span>
                        <span className="text-muted-foreground ml-2">Total Followers</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Interests & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {talent.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio">
                <Card className="shadow-card">
                  <CardContent className="p-8 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Portfolio Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Portfolio items and past collaborations will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Achievements & Recognition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {talent.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center p-3 border border-border rounded-lg">
                          <CheckCircle className="h-5 w-5 text-success mr-3" />
                          <span className="font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rights">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Available Rights & Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {talent.availableRights.map((right, index) => (
                        <div key={index} className="flex items-center p-3 border border-border rounded-lg">
                          <CheckCircle className="h-4 w-4 text-primary mr-3" />
                          <span>{right}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NIL Value</span>
                  <span className="font-semibold text-success">${talent.nilValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Endorsement Rate</span>
                  <span className="font-semibold">${talent.endorsementRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {talent.responseTime}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Connect with {talent.name.split(' ')[0]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Deal Proposal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send Deal Proposal</DialogTitle>
                      <DialogDescription>
                        Reach out to {talent.name.split(' ')[0]} with your collaboration proposal.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dealType">Deal Type</Label>
                        <Input
                          id="dealType"
                          placeholder="e.g., Social Media Campaign"
                          value={dealForm.dealType}
                          onChange={(e) => setDealForm(prev => ({ ...prev, dealType: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Input
                          id="budget"
                          placeholder="e.g., $5,000 - $10,000"
                          value={dealForm.budget}
                          onChange={(e) => setDealForm(prev => ({ ...prev, budget: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your collaboration idea..."
                          value={dealForm.description}
                          onChange={(e) => setDealForm(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <Button className="w-full">Send Proposal</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* University Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Academic Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">University:</span> {talent.university}</p>
                  <p><span className="text-muted-foreground">Year:</span> {talent.year}</p>
                  <p><span className="text-muted-foreground">Position:</span> {talent.position}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
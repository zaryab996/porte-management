import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Users, Star, DollarSign, TrendingUp } from "lucide-react";
import { mockTalentData } from "@/data/mockData";

const Roster = () => {
  const [user] = useState({
    name: "Manager",
    role: "manager" as const,
    avatar: undefined
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} userName={user.name} userAvatar={user.avatar} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Talent Roster</h1>
          <p className="text-muted-foreground">Manage your talent portfolio</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTalentData.map((talent) => (
            <Card key={talent.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={talent.avatar} alt={talent.name} />
                    <AvatarFallback>{talent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{talent.name}</h3>
                    <p className="text-muted-foreground">{talent.sport}</p>
                    {talent.verified && (
                      <Badge className="bg-accent text-accent-foreground mt-1">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NIL Value</span>
                    <span className="font-semibold text-success">${talent.nilValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Followers</span>
                    <span className="font-semibold">
                      {((talent.followers.instagram + talent.followers.tiktok + talent.followers.twitter) / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>

                <Link to={`/talent/${talent.id}`}>
                  <Button className="w-full">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roster;
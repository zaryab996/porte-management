import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, Star, TrendingUp, Filter } from "lucide-react";
import { mockTalentData } from "@/data/mockData";

const Discover = () => {
  const [user] = useState({
    name: "Brand Manager",
    role: "brand" as const,
    avatar: undefined
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filteredTalent = mockTalentData.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === "all" || talent.sport.toLowerCase() === sportFilter.toLowerCase();
    const matchesLocation = locationFilter === "all" || talent.location.includes(locationFilter);
    
    return matchesSearch && matchesSport && matchesLocation;
  });

  const sports = [...new Set(mockTalentData.map(t => t.sport))];
  const locations = [...new Set(mockTalentData.map(t => t.location.split(", ")[1]))].filter(Boolean);

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={user.role} userName={user.name} userAvatar={user.avatar} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Discover Talent</h1>
          <p className="text-muted-foreground">Find the perfect talent for your next campaign</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card rounded-lg shadow-card">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, sport, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={sportFilter} onValueChange={setSportFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sport/Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                {sports.map(sport => (
                  <SelectItem key={sport} value={sport.toLowerCase()}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredTalent.length} talent{filteredTalent.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Talent Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalent.map((talent) => (
            <Card key={talent.id} className="shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="h-32 bg-gradient-primary"></div>
                <div className="absolute -bottom-8 left-6">
                  <Avatar className="h-16 w-16 border-4 border-background">
                    <AvatarImage src={talent.avatar} alt={talent.name} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {talent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {talent.verified && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="pt-12 pb-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">{talent.name}</h3>
                  <p className="text-muted-foreground text-sm">{talent.sport} • {talent.university}</p>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {talent.location}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Followers</span>
                    <span className="font-semibold">
                      {formatFollowers(
                        talent.followers.instagram + talent.followers.tiktok + talent.followers.twitter
                      )}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">NIL Value</span>
                    <span className="font-semibold text-success">
                      ${talent.nilValue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-semibold">
                      ${talent.endorsementRate.toLocaleString()}/post
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {talent.interests.slice(0, 2).map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                  {talent.interests.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{talent.interests.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link to={`/talent/${talent.id}`} className="flex-1">
                    <Button className="w-full">View Profile</Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTalent.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No talent found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
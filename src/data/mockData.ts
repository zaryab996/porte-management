import talentAvatar1 from "@/assets/talent-avatar-1.jpg";
import talentAvatar2 from "@/assets/talent-avatar-2.jpg";
import talentAvatar3 from "@/assets/talent-avatar-3.jpg";

export interface TalentProfile {
  id: string;
  name: string;
  avatar: string;
  sport: string;
  university: string;
  year: string;
  position: string;
  followers: {
    instagram: number;
    tiktok: number;
    twitter: number;
  };
  nilValue: number;
  location: string;
  bio: string;
  interests: string[];
  achievements: string[];
  availableRights: string[];
  endorsementRate: number;
  responseTime: string;
  verified: boolean;
}

export interface Deal {
  id: string;
  talentId: string;
  brandName: string;
  dealType: string;
  image: string;
  value: number;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  date: string;
  description: string;
  commissionRate: number;
}

export interface Campaign {
  id: string;
  name: string;
  brandName: string;
  budget: number;
  talent: string[];
  status: 'active' | 'completed' | 'draft';
  startDate: string;
  endDate: string;
  reach: number;
  engagement: number;
}

export const mockTalentData: TalentProfile[] = [
  {
    id: "1",
    name: "Marcus Thompson",
    avatar: talentAvatar1,
    sport: "Basketball",
    university: "Duke University",
    year: "Junior",
    position: "Point Guard",
    followers: {
      instagram: 125000,
      tiktok: 89000,
      twitter: 45000
    },
    nilValue: 50000,
    location: "Durham, NC",
    bio: "Rising star in college basketball with a passion for community engagement and youth mentorship.",
    interests: ["Gaming", "Music Production", "Community Service", "Fashion"],
    achievements: ["ACC Player of the Year 2023", "Academic All-American", "Team Captain"],
    availableRights: ["Social Media Posts", "Appearances", "Merchandise", "Gaming Content"],
    endorsementRate: 2500,
    responseTime: "2-4 hours",
    verified: true
  },
  {
    id: "2",
    name: "Sofia Rodriguez",
    avatar: talentAvatar2,
    sport: "Content Creator",
    university: "UCLA",
    year: "Senior",
    position: "Lifestyle Influencer",
    followers: {
      instagram: 200000,
      tiktok: 350000,
      twitter: 75000
    },
    nilValue: 75000,
    location: "Los Angeles, CA",
    bio: "Lifestyle content creator and student athlete specializing in wellness, fitness, and college life content.",
    interests: ["Fitness", "Wellness", "Travel", "Photography", "Sustainable Living"],
    achievements: ["Top 10 College Influencers 2023", "Wellness Ambassador", "Dean's List"],
    availableRights: ["Brand Partnerships", "Product Reviews", "Event Hosting", "Video Content"],
    endorsementRate: 3500,
    responseTime: "1-2 hours",
    verified: true
  },
  {
    id: "3",
    name: "Jake Mitchell",
    avatar: talentAvatar3,
    sport: "Music",
    university: "Berklee College of Music",
    year: "Sophomore",
    position: "Singer-Songwriter",
    followers: {
      instagram: 95000,
      tiktok: 180000,
      twitter: 32000
    },
    nilValue: 40000,
    location: "Boston, MA",
    bio: "Up-and-coming musician and content creator known for original music and covers that resonate with Gen Z.",
    interests: ["Music Production", "Songwriting", "Live Performance", "Collaboration"],
    achievements: ["Viral TikTok Creator", "Berklee Songwriting Award", "Local Music Festival Headliner"],
    availableRights: ["Music Collaborations", "Brand Jingles", "Live Performances", "Music Videos"],
    endorsementRate: 2000,
    responseTime: "3-5 hours",
    verified: false
  }
];

export const mockDealsData: Deal[] = [
  {
    id: "1",
    talentId: "1",
    brandName: "Nike",
    dealType: "Social Media Campaign",
    image:"/nike.png",
    value: 15000,
    status: "approved",
    date: "2025-12-17",
    description: "Instagram and TikTok posts featuring new basketball shoe line",
    commissionRate: 15
  },
  {
    id: "2",
    talentId: "1",
    brandName: "Lululemon",
    dealType: "Brand Partnership",
    image:"/lululemon.jpg",
    value: 25000,
    status: "pending",
    date: "2025-12-17",
    description: "6-month wellness content partnership with product placement",
    commissionRate: 15
  },
  {
    id: "3",
    talentId: "1",
    brandName: "Spotify",
    dealType: "Music Collaboration",
    image:"/spotify_new.png",
    value: 8000,
    status: "completed",
    date: "2025-12-17",
    description: "Custom playlist curation and promotional content",
    commissionRate: 15
  }
];

export const mockCampaignsData: Campaign[] = [
  {
    id: "1",
    name: "Spring Athletic Wear Launch",
    brandName: "Nike",
    budget: 100000,
    talent: ["Marcus Thompson", "Sofia Rodriguez"],
    status: "active",
    startDate: "2025-12-17",
    endDate: "2025-12-27",
    reach: 500000,
    engagement: 45000
  },
  {
    id: "2",
    name: "Wellness Wednesday Series",
    brandName: "Lululemon",
    budget: 75000,
    talent: ["Sofia Rodriguez"],
    status: "active",
    startDate: "2025-11-17",
    endDate: "2025-12-17",
    reach: 300000,
    engagement: 35000
  }
];

export const mockAnalyticsData = {
  totalTalent: 156,
  activeDeals: 24,
  totalRevenue: 890000,
  avgDealValue: 12500,
  topPerformers: [
    { name: "Sofia Rodriguez", deals: 8, revenue: 85000 },
    { name: "Marcus Thompson", deals: 6, revenue: 72000 },
    { name: "Jake Mitchell", deals: 4, revenue: 45000 }
  ],
  monthlyGrowth: [
    { month: "Jan", deals: 12, revenue: 150000 },
    { month: "Feb", deals: 18, revenue: 225000 },
    { month: "Mar", deals: 24, revenue: 300000 },
    { month: "Apr", deals: 19, revenue: 275000 },
    { month: "May", deals: 28, revenue: 350000 },
    { month: "Jun", deals: 32, revenue: 425000 }
  ]
};
import type React from "react";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Eye,
  Download,
  BarChart2,
  TrendingUp,
  Users,
  MessageCircle,
  Share2,
  ViewIcon,
  Info,
  Heart,
  Bookmark,
  FileImage,
  FileVideo,
  File,
  Target,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mockDealsData } from "@/data/mockData";

interface Deal {
  id: string;
  brandName: string;
  dealType: string;
  value: number;
  commissionRate: number;
  status: "pending" | "approved" | "completed" | "rejected";
  date: string;
  description: string;
  talentId: string;
  rejectReason?: string;
  creativeUrl?: string;
  collateral?: {
    name: string;
    url: string;
    type: "pdf" | "image" | "video" | "doc";
  }[];
  analytics: {
    engagement: {
      likes: number;
      shares: number;
      comments: number;
      views: number;
      saves: number;
    };
    reach: { impressions: number; uniqueUsers: number };
    conversions?: { clicks: number; sales: number };
    historicalData: Array<{
      date: string;
      views: number;
      engagementRate: number;
    }>;
    trendIndicator: "up" | "down" | "stable";
    benchmarkComparison: number;
  };
}

const fetchDealById = (id: string): Deal | null => {
  const extendedDeals = mockDealsData.map((deal) => ({
    ...deal,
    creativeUrl: deal.image,
    collateral: [
      {
        name: "Contract.pdf",
        url: "https://example.com/contract.pdf",
        type: "pdf" as const,
      },
      {
        name: "CampaignBrief.docx",
        url: "https://example.com/brief.docx",
        type: "doc" as const,
      },
      {
        name: "CampaignAssets.zip",
        url: "https://example.com/assets.zip",
        type: "image" as const,
      },
      {
        name: "PromoVideo.mp4",
        url: "https://example.com/video.mp4",
        type: "video" as const,
      },
    ],
    analytics: {
      engagement: {
        likes: 1200,
        shares: 450,
        comments: 300,
        views: 50000,
        saves: 820,
      },
      reach: { impressions: 100000, uniqueUsers: 75000 },
      conversions: { clicks: 2000, sales: 150 },
      historicalData: [
        { date: "2025-12-01", views: 10000, engagementRate: 5 },
        { date: "2025-12-02", views: 15000, engagementRate: 6 },
        { date: "2025-12-03", views: 20000, engagementRate: 7 },
        { date: "2025-12-04", views: 25000, engagementRate: 8 },
        { date: "2025-12-05", views: 30000, engagementRate: 9 },
      ],
      trendIndicator: "up" as const,
      benchmarkComparison: 15,
    },
  }));
  return extendedDeals.find((d) => d.id === id) || null;
};

const handleUpload = (fileType: string) => {
  toast({
    title: `${fileType} Uploaded`,
    description: "File received successfully.",
    duration: 2000,
  });
};

const handleDownload = (url: string, name: string) => {
  toast({
    title: `${name} Downloaded`,
    description: "File downloaded successfully.",
    duration: 2000,
  });
};

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [realTimeViews, setRealTimeViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{type: string, name: string}>>([]);
  
  // Accept/Reject modal states
  const [openAccept, setOpenAccept] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchedDeal = fetchDealById(id!);
    if (fetchedDeal) {
      setDeal(fetchedDeal);
      setRealTimeViews(fetchedDeal.analytics.engagement.views);
    } else {
      toast({
        title: "Deal Not Found",
        description: "Unable to load deal details.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (!deal) return;
    const interval = setInterval(() => {
      setRealTimeViews((prev) => prev + Math.floor(Math.random() * 100));
    }, 10000);
    return () => clearInterval(interval);
  }, [deal]);

  const handleFileUpload = (type: string, file: File) => {
    setUploadedFiles(prev => [...prev, { type, name: file.name }]);
    handleUpload(type);
  };

  const handleAcceptDeal = () => {
    if (deal) {
      setDeal({ ...deal, status: "approved" });
      setOpenAccept(false);
      toast({
        title: "Deal Accepted",
        description: `You've accepted the deal with ${deal.brandName}`,
        duration: 3000,
      });
    }
  };

  const handleRejectDeal = () => {
    if (!rejectReason.trim() || !deal) return;
    setDeal({ ...deal, status: "rejected", rejectReason: rejectReason.trim() });
    setOpenReject(false);
    setRejectReason("");
    toast({
      title: "Deal Rejected",
      description: `You've rejected the deal with ${deal.brandName}`,
      duration: 3000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <p className="text-lg text-red-600">Deal not found.</p>
      </div>
    );
  }

  const talentEarnings = (deal.value * (100 - deal.commissionRate)) / 100;
  const commission = (deal.value * deal.commissionRate) / 100;
  const { icon, badge, text } = getStatusConfig(deal.status);
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const engagementRate = (
    ((deal.analytics.engagement.likes +
      deal.analytics.engagement.comments +
      deal.analytics.engagement.shares +
      deal.analytics.engagement.saves) /
      deal.analytics.engagement.views) *
    100
  ).toFixed(2);

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    if (trend === "down")
      return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
    return <TrendingUp className="w-4 h-4 text-amber-600" />;
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "image":
        return <FileImage className="w-5 h-5 text-blue-500" />;
      case "video":
        return <FileVideo className="w-5 h-5 text-purple-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="font-medium">{label}</p>
          {payload.map((pld: any, idx: number) => (
            <p
              key={idx}
              style={{ color: pld.stroke }}
            >{`${pld.name}: ${pld.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
          <header className="transition-all duration-300 hover:shadow-md p-6 bg-white/80 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {deal.brandName} - {deal.dealType}
                  </h1>
                  <Badge
                    className={`${badge} text-xs px-3 py-1 flex items-center gap-1`}
                  >
                    {icon}
                    <span>{deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Deal ID: {deal.id} | Date: {formatDate(deal.date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() =>
                    handleDownload("report.pdf", "Negotiation_Report.pdf")
                  }
                  className="hover:shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" /> Export Report
                </Button>
                <Link to="/deals">
                  <Button
                    variant="outline"
                    className="hover:bg-gray-100 bg-transparent"
                  >
                    Back to Deals
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          <Card className="overflow-hidden border-2 border-emerald-100 bg-gradient-to-r from-emerald-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Performance Summary
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Engagement Rate</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {engagementRate}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Industry avg: 3.5%
                  </p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Total Reach</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {(deal.analytics.reach.uniqueUsers / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Unique users</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">vs Benchmark</p>
                  <p
                    className={`text-3xl font-bold ${
                      deal.analytics.benchmarkComparison >= 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {deal.analytics.benchmarkComparison >= 0 ? "+" : ""}
                    {deal.analytics.benchmarkComparison}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Above average</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Trend</p>
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(deal.analytics.trendIndicator)}
                    <p className="text-2xl font-bold text-gray-700 capitalize">
                      {deal.analytics.trendIndicator}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Performance direction
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Performance vs Industry Average
                  </span>
                  <span className="text-sm font-medium text-emerald-600">
                    +{deal.analytics.benchmarkComparison}% above
                  </span>
                </div>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gray-300"
                    style={{ width: "50%" }}
                  ></div>
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        50 + deal.analytics.benchmarkComparison,
                        100
                      )}%`,
                    }}
                  ></div>
                  <div
                    className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-600"
                    title="Industry Average"
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">0%</span>
                  <span className="text-xs text-gray-500">Industry Avg</span>
                  <span className="text-xs text-gray-400">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deal Actions Card - Only for Pending Deals */}
          {deal.status === "pending" && (
            <Card className="overflow-hidden border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-white">
              <CardHeader className="bg-amber-50/50">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  Action Required
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  This deal is pending your response. Review the details and decide.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Accept Dialog */}
                  <Dialog open={openAccept} onOpenChange={setOpenAccept}>
                    <DialogTrigger asChild>
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Accept Deal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Accept Deal</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to accept the deal with <strong>{deal.brandName}</strong>?
                          <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Deal Value:</span>
                                <span className="font-semibold">${deal.value.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Your Earnings:</span>
                                <span className="font-semibold text-emerald-600">${talentEarnings.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Commission:</span>
                                <span className="font-semibold">${commission.toLocaleString()} ({deal.commissionRate}%)</span>
                              </div>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-2 mt-4">
                        <Button variant="outline" onClick={() => setOpenAccept(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleAcceptDeal}>
                          Confirm Accept
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Reject Dialog */}
                  <Dialog open={openReject} onOpenChange={setOpenReject}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50 h-12">
                        <XCircle className="w-5 h-5 mr-2" />
                        Reject Deal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Deal</DialogTitle>
                        <DialogDescription>
                          Please provide a reason for rejecting the deal with <strong>{deal.brandName}</strong>.
                        </DialogDescription>
                      </DialogHeader>
                      <textarea
                        rows={4}
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Reason for rejection..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                      />
                      <DialogFooter className="gap-2 mt-3">
                        <Button variant="outline" onClick={() => setOpenReject(false)}>
                          Cancel
                        </Button>
                        <Button
                          className="bg-red-600 hover:bg-red-700"
                          disabled={!rejectReason.trim()}
                          onClick={handleRejectDeal}
                        >
                          Submit Rejection
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Campaign Creative
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {deal.creativeUrl ? (
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                  <img
                    src={deal.creativeUrl || "/placeholder.svg"}
                    alt="Campaign Creative"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 bg-gray-900/70 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                    <ViewIcon className="w-4 h-4" /> Live Preview
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    No creative uploaded. Add one to preview the campaign.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="bg-gray-50 flex flex-row justify-between items-center">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Performance Analytics
              </CardTitle>
              <Badge
                variant="secondary"
                className="text-sm px-3 py-1 flex items-center gap-1"
              >
                {getTrendIcon(deal.analytics.trendIndicator)} Trend:{" "}
                {deal.analytics.trendIndicator.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-indigo-600 font-medium">
                      Overall Engagement Rate
                    </p>
                    <p className="text-4xl font-bold text-indigo-700 mt-1">
                      {engagementRate}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      (Likes + Comments + Shares + Saves) / Views
                    </p>
                  </div>
                  <div className="text-right">
                    <Target className="w-12 h-12 text-indigo-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Industry avg: <span className="font-semibold">3.5%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <MetricCard
                  title="Views"
                  value={realTimeViews.toLocaleString()}
                  icon={Eye}
                  color="text-indigo-600"
                  realTime
                  tooltip="Total number of times your content was displayed (updates live every 10 seconds)"
                />
                <MetricCard
                  title="Likes"
                  value={deal.analytics.engagement.likes.toLocaleString()}
                  icon={Heart}
                  color="text-pink-600"
                  tooltip="Number of users who liked your content - shows positive reception"
                />
                <MetricCard
                  title="Shares"
                  value={deal.analytics.engagement.shares.toLocaleString()}
                  icon={Share2}
                  color="text-amber-600"
                  tooltip="Times your content was shared - indicates viral potential and organic reach"
                />
                <MetricCard
                  title="Comments"
                  value={deal.analytics.engagement.comments.toLocaleString()}
                  icon={MessageCircle}
                  color="text-teal-600"
                  tooltip="User comments and discussions - shows active engagement and interest"
                />
                <MetricCard
                  title="Saves"
                  value={deal.analytics.engagement.saves.toLocaleString()}
                  icon={Bookmark}
                  color="text-violet-600"
                  tooltip="Times users saved your content - indicates high-value content they want to revisit"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Impressions"
                  value={deal.analytics.reach.impressions.toLocaleString()}
                  icon={BarChart2}
                  color="text-purple-600"
                  tooltip="Total number of times the ad was shown (includes repeat views by same user)"
                />
                <MetricCard
                  title="Unique Reach"
                  value={deal.analytics.reach.uniqueUsers.toLocaleString()}
                  icon={Users}
                  color="text-green-600"
                  tooltip="Number of distinct people who saw your content (no duplicates counted)"
                />
                {deal.analytics.conversions && (
                  <>
                    <MetricCard
                      title="Link Clicks"
                      value={deal.analytics.conversions.clicks.toLocaleString()}
                      icon={BarChart2}
                      color="text-orange-600"
                      tooltip="Number of clicks on links in your content - shows intent to learn more or purchase"
                    />
                    <MetricCard
                      title="Conversions"
                      value={deal.analytics.conversions.sales.toLocaleString()}
                      icon={DollarSign}
                      color="text-emerald-600"
                      tooltip="Actual sales or sign-ups generated from your campaign"
                    />
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Historical Trends
                </h3>
                <ResponsiveContainer
                  width="100%"
                  height={350}
                  className="bg-white p-4 rounded-lg shadow-inner"
                >
                  <LineChart
                    data={deal.analytics.historicalData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" tickMargin={10} />
                    <YAxis stroke="#6b7280" tickMargin={10} />
                    <ChartTooltip content={customTooltip} />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#4f46e5"
                      name="Views"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagementRate"
                      stroke="#10b981"
                      name="Engagement Rate (%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Deal Collateral
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Download contracts, briefs, and campaign assets
              </p>
            </CardHeader>
            <CardContent className="p-6">
              {deal.collateral?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deal.collateral.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(item.type)}
                        <div>
                          <span className="font-medium text-gray-800">
                            {item.name}
                          </span>
                          <p className="text-xs text-gray-400 uppercase">
                            {item.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(item.url, "_blank")}
                          className="hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDownload(item.url, item.name)
                          }
                          className="hover:bg-gray-100"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-6 bg-white rounded-lg shadow-sm">
                  No collateral available for this deal.
                </p>
              )}
            </CardContent>
          </Card>

       <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl border-2 border-dashed border-gray-200">
  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-indigo-100 rounded-lg">
        <Upload className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Upload Your Content
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Share your campaign deliverables and proof of work
        </p>
      </div>
    </div>
  </CardHeader>

  <CardContent className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* ------------------- Campaign Images ------------------- */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer text-center group w-full">
            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <FileImage className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="font-semibold text-gray-700 group-hover:text-indigo-700">Campaign Images</p>
            <p className="text-xs text-gray-400 mt-2">Screenshots, posts, stories</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Campaign Images</DialogTitle>
            <DialogDescription>Add images from your campaign deliverables.</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <label className="block cursor-pointer">
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center hover:border-indigo-400 transition-colors">
                <FileImage className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop or click to browse</p>
                <div className="inline-block px-3 py-1 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200">Select Files</div>
              </div>
              <Input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload("Image", e.target.files[0]);
                }}
              />
            </label>
          </div>
        </DialogContent>
      </Dialog>

      {/* ------------------- Campaign Videos ------------------- */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50/50 transition-all cursor-pointer text-center group w-full">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <FileVideo className="w-8 h-8 text-purple-500" />
            </div>
            <p className="font-semibold text-gray-700 group-hover:text-purple-700">Campaign Videos</p>
            <p className="text-xs text-gray-400 mt-2">Reels, TikToks, YouTube</p>
            <p className="text-xs text-gray-400">MP4, MOV up to 100MB</p>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Campaign Videos</DialogTitle>
            <DialogDescription>Add videos from your campaign deliverables.</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <label className="block cursor-pointer">
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center hover:border-purple-400 transition-colors">
                <FileVideo className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop or click to browse</p>
                <div className="inline-block px-3 py-1 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200">Select Files</div>
              </div>
              <Input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload("Video", e.target.files[0]);
                }}
              />
            </label>
          </div>
        </DialogContent>
      </Dialog>

      {/* ------------------- Documents ------------------- */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative p-8 border-2 border-dashed border-gray-200 rounded-xl hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer text-center group w-full">
            <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
              <FileText className="w-8 h-8 text-amber-500" />
            </div>
            <p className="font-semibold text-gray-700 group-hover:text-amber-700">Documents</p>
            <p className="text-xs text-gray-400 mt-2">Analytics reports, invoices</p>
            <p className="text-xs text-gray-400">PDF, DOCX up to 5MB</p>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>Add relevant documents like screenshots or reports.</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <label className="block cursor-pointer">
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center hover:border-amber-400 transition-colors">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop or click to browse</p>
                <div className="inline-block px-3 py-1 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200">Select Files</div>
              </div>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload("Document", e.target.files[0]);
                }}
              />
            </label>
          </div>
        </DialogContent>
      </Dialog>

    </div>

    {/* Uploaded files preview section */}
    <div className="mt-6 pt-6 border-t border-gray-100">
      <p className="text-sm font-medium text-gray-600 mb-3">Your Uploaded Content</p>
      {uploadedFiles.length > 0 ? (
        <div className="space-y-2">
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              {file.type === "Image" && <FileImage className="w-5 h-5 text-blue-500" />}
              {file.type === "Video" && <FileVideo className="w-5 h-5 text-purple-500" />}
              {file.type === "Document" && <FileText className="w-5 h-5 text-amber-500" />}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-400">{file.type}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <Upload className="w-8 h-8 mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">No content uploaded yet</p>
          <p className="text-xs text-gray-400 mt-1">Upload your deliverables to track and share with brands</p>
        </div>
      )}
    </div>
  </CardContent>
</Card>


          <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-200">
            <CardHeader className="border-b border-emerald-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      Negotiation Insights
                    </CardTitle>
                    <p className="text-sm text-emerald-600 mt-1">
                      Data-backed recommendations for your next deal
                    </p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                  +{deal.analytics.benchmarkComparison}% Above Benchmark
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Key insight message */}
              <div className="p-4 bg-white rounded-xl shadow-sm border border-emerald-100">
                <p className="text-gray-700 leading-relaxed">
                  Your campaign delivered an engagement rate of{" "}
                  <span className="font-bold text-emerald-600">
                    {engagementRate}%
                  </span>
                  , which is{" "}
                  <span className="font-bold text-emerald-600">
                    {(
                      (Number.parseFloat(engagementRate) / 3.5) * 100 -
                      100
                    ).toFixed(0)}
                    % higher
                  </span>{" "}
                  than the industry average of 3.5%. This performance
                  positions you strongly for future negotiations.
                </p>
              </div>

              {/* Value comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="w-10 h-10 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <DollarSign className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Current Deal Value
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    ${deal.value.toLocaleString()}
                  </p>
                </div>

                <div className="p-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg text-center text-white">
                  <div className="w-10 h-10 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-emerald-100 uppercase tracking-wide mb-2">
                    Recommended Value
                  </p>
                  <p className="text-3xl font-bold">
                    $
                    {(
                      deal.value *
                      (1 + deal.analytics.benchmarkComparison / 100)
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-200 mt-1">
                    Based on your performance
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl shadow-sm border-2 border-emerald-200 text-center">
                  <div className="w-10 h-10 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    Potential Increase
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    +$
                    {(
                      (deal.value * deal.analytics.benchmarkComparison) /
                      100
                    ).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    +{deal.analytics.benchmarkComparison}% uplift
                  </p>
                </div>
              </div>

              {/* Action tip */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 mb-1">
                    Negotiation Tip
                  </p>
                  <p className="text-sm text-blue-700">
                    Use your{" "}
                    <span className="font-semibold">
                      {deal.analytics.reach.uniqueUsers.toLocaleString()}{" "}
                      unique reach
                    </span>{" "}
                    and
                    <span className="font-semibold">
                      {" "}
                      {deal.analytics.engagement.shares.toLocaleString()}{" "}
                      shares
                    </span>{" "}
                    as key talking points when discussing rates with brands.
                    These metrics demonstrate strong audience trust and
                    viral potential.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {deal.status === "rejected" && deal.rejectReason && (
            <Card className="overflow-hidden bg-red-50 border-red-200 transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="bg-red-100">
                <CardTitle className="text-xl font-semibold text-red-800">
                  Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-red-700">{deal.rejectReason}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

const MetricCard = ({
  title,
  value,
  icon: Icon,
  color,
  realTime = false,
  tooltip,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
  realTime?: boolean;
  tooltip: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-help border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          {realTime && (
            <Badge
              variant="outline"
              className="text-xs border-emerald-500 text-emerald-600 animate-pulse"
            >
              Live
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${color
              .replace("text-", "bg-")
              .replace("600", "100")}`}
          >
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <p className={`text-2xl font-bold text-gray-800`}>{value}</p>
        </div>
      </div>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs p-3">
      <p className="text-sm">{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

const getStatusConfig = (status: string) => {
  const map: Record<
    string,
    { icon: React.ReactNode; badge: string; text: string }
  > = {
    approved: {
      icon: <CheckCircle className="w-4 h-4" />,
      badge: "bg-emerald-100 text-emerald-800",
      text: "text-emerald-600",
    },
    pending: {
      icon: <Clock className="w-4 h-4" />,
      badge: "bg-amber-100 text-amber-800",
      text: "text-amber-600",
    },
    completed: {
      icon: <CheckCircle className="w-4 h-4" />,
      badge: "bg-indigo-100 text-indigo-800",
      text: "text-indigo-600",
    },
    rejected: {
      icon: <XCircle className="w-4 h-4" />,
      badge: "bg-red-100 text-red-800",
      text: "text-red-600",
    },
  };
  return (
    map[status] ?? {
      icon: <AlertCircle className="w-4 h-4" />,
      badge: "bg-gray-100 text-gray-800",
      text: "text-muted-foreground",
    }
  );
};

export default DealDetails;
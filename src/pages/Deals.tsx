import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Eye,
  Download,
  Search,
} from "lucide-react";
import { mockDealsData } from "@/data/mockData";
import talentAvatar1 from "@/assets/talent-avatar-1.jpg";

interface User {
  name: string;
  avatar?: string;
  id: string;
  role: "talent";
}

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
const handleUpload = () => {
    toast({
      title: "Content Uploaded",
      description: "Mock file received (image/video/PDF).",
      duration: 2000,
    });
  };

  // ───── MOCK: Download Contract ─────
  const handleDownload = () => {
    toast({
      title: "Contract Downloaded",
      description: "NIL_Contract_Template.pdf",
      duration: 2000,
    });
  };

const Deals = () => {
  const [user, setUser] = useState<User>({
    name: "Marcus Thompson",
    avatar: talentAvatar1,
    id: "1",
    role: "talent",
  });

  const [deals, setDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Load user & deals -------------------------------------------------
useEffect(() => {
  const stored = getUserFromStorage();
  if (stored) setUser(stored);

  // Clone mock data + add rejectReason if needed
  const initial = mockDealsData
    .filter((d) => d.talentId === (stored?.id ?? "1"))
    .map((d) => ({ 
      ...d, 
      rejectReason: (d as any).rejectReason ?? "" 
    }));
  setDeals(initial);
}, []);

  // --- Search & filter ---------------------------------------------------
  const filteredDeals = deals.filter(
    (d) =>
      d.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.dealType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dealsByStatus = {
    pending: filteredDeals.filter((d) => d.status === "pending"),
    approved: filteredDeals.filter((d) => d.status === "approved"),
    completed: filteredDeals.filter((d) => d.status === "completed"),
    rejected: filteredDeals.filter((d) => d.status === "rejected"),
  };

  const totalEarnings = deals
    .filter((d) => d.status === "completed")
    .reduce((s, d) => s + (d.value * (100 - d.commissionRate)) / 100, 0);

  // --- Helpers -----------------------------------------------------------
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

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
    return map[status] ?? { icon: <AlertCircle className="w-4 h-4" />, badge: "bg-gray-100 text-gray-800", text: "text-muted-foreground" };
  };

  // --- State update helpers -----------------------------------------------
  const updateDealStatus = (id: string, newStatus: Deal["status"], reason = "") => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: newStatus, rejectReason: reason } : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold bg-clip-text  bg-primary">
            My Deals
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Track, manage, and grow your brand partnerships
          </p>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Total Deals", value: deals.length, icon: FileText, gradient: "from-primary to-primary" },
            { title: "Pending", value: dealsByStatus.pending.length, icon: Clock, gradient: "from-amber-400 to-orange-600", color: "text-amber-600" },
            { title: "Completed", value: dealsByStatus.completed.length, icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", color: "text-emerald-600" },
            { title: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, icon: DollarSign, gradient: "from-pink-500 to-rose-600", color: "text-pink-600" },
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
                    <p className={`text-3xl font-bold ${stat.color ?? "text-foreground"}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-br ${stat.gradient} text-white`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Search */}
       <div className="relative max-w-md mb-8">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
  <Input
    placeholder="Search by brand or type..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  />
</div>
        {/* Tabs */}
   <Tabs defaultValue="all" className="w-full">
  {/* ───── TAB LIST – GLASS + BORDER + LIGHT BG ───── */}
  <TabsList className="grid h-13 w-full grid-cols-5 gap-1 p-1.5 bg-white/80 backdrop-blur-md border border-white/30 rounded-xl shadow-sm">
    {[
      { value: "all",      label: "All",      count: filteredDeals.length },
      { value: "pending",  label: "Pending",  count: dealsByStatus.pending.length },
      { value: "approved", label: "Approved", count: dealsByStatus.approved.length },
      { value: "completed",label: "Completed",count: dealsByStatus.completed.length },
      { value: "rejected", label: "Rejected", count: dealsByStatus.rejected.length },
    ].map((tab) => (
      <TabsTrigger
        key={tab.value}
        value={tab.value}
        className={`
          relative flex items-center justify-center gap-2 rounded-lg
          px-3 py-2.5 text-sm font-medium transition-all duration-200
          /* Inactive */
          data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground
          data-[state=inactive]:hover:bg-white/50 data-[state=inactive]:hover:text-foreground
          /* Active */
          data-[state=active]:bg-primary data-[state=active]:from-indigo-500
          data-[state=active]:to-pink-500 data-[state=active]:text-white
          data-[state=active]:shadow-md
        `}
      >
        <span>{tab.label}</span>

        {/* ───── COUNT BADGE – TINY, FLOATING, MODERN ───── */}
        {tab.count > 0 && (
          <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 border items-center justify-center rounded-full bg-white text-[10px] font-bold text-indigo-600 shadow-sm ring-2 ring-white">
            {tab.count}
          </div>
        )}
      </TabsTrigger>
    ))}
  </TabsList>

  {/* ───── TAB CONTENT ───── */}
  {["all", "pending", "approved", "completed", "rejected"].map((tab) => {
    const list =
      tab === "all" ? filteredDeals : dealsByStatus[tab as keyof typeof dealsByStatus];

    return (
      <TabsContent key={tab} value={tab} className="mt-6 space-y-5">
        {list.length === 0 ? (
          <EmptyState />
        ) : (
          list.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              formatDate={formatDate}
              getStatusConfig={getStatusConfig}
              updateDealStatus={updateDealStatus}
            />
          ))
        )}
      </TabsContent>
    );
  })}
</Tabs>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-16">
    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
    <h3 className="text-lg font-semibold mb-2">No deals found</h3>
    <p className="text-muted-foreground">Your deals will appear here once brands start reaching out.</p>
  </div>
);

/* ------------------------------------------------------------------ */
/*                         DEAL CARD + MODALS                         */
/* ------------------------------------------------------------------ */
const DealCard = ({
  deal,
  formatDate,
  getStatusConfig,
  updateDealStatus,
}: {
  deal: Deal;
  formatDate: (d: string) => string;
  getStatusConfig: (s: string) => any;
  updateDealStatus: (id: string, status: Deal["status"], reason?: string) => void;
}) => {
  const { icon, badge, text } = getStatusConfig(deal.status);
  const talentEarnings = deal.value * (100 - deal.commissionRate) / 100;
  const commission = deal.value * deal.commissionRate / 100;

  // ---- Accept / Reject modals state ------------------------------------
  const [openAccept, setOpenAccept] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // ---- Handlers --------------------------------------------------------
  const handleAccept = () => {
    updateDealStatus(deal.id, "approved");
    setOpenAccept(false);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    updateDealStatus(deal.id, "rejected", rejectReason.trim());
    setOpenReject(false);
    setRejectReason("");
  };

  return (
    <Card className="group relative overflow-hidden bg-white/70 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">

      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {deal.brandName[0]}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{deal.brandName}</CardTitle>
              <p className="text-sm text-muted-foreground">{deal.dealType}</p>
            </div>
          </div>
          <Badge className={`${badge} flex items-center gap-1`}>
            {icon}
            <span>{deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Value / Earnings / Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Deal Value</p>
            <p className="font-semibold text-foreground">${deal.value.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Your Earnings</p>
            <p className={`font-semibold ${text}`}>${talentEarnings.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date</p>
            <p className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(deal.date)}
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>

        {/* Commission + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            Commission: ${commission.toLocaleString()} ({deal.commissionRate}%)
          </div>

          <div className="flex gap-2">
            {/* ---------- DETAILS DIALOG ---------- */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" >
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-white/90 backdrop-blur">
                <DialogHeader>
                  <DialogTitle>{deal.brandName} — {deal.dealType}</DialogTitle>
                  <DialogDescription>Full deal breakdown</DialogDescription>
                </DialogHeader>
                <div className="space-y-5 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Total Value</p>
                      <p className="text-xl font-bold">${deal.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Your Share</p>
                      <p className={`text-xl font-bold ${text}`}>${talentEarnings.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Revenue Split</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Talent</span>
                        <span>${talentEarnings.toLocaleString()}</span>
                      </div>
                      <Progress value={100 - deal.commissionRate} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>PMA Commission</span>
                        <span>${commission.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground">{deal.description}</p>
                  </div>

                  {deal.status === "rejected" && deal.rejectReason && (
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Rejection Reason</p>
                      <p className="text-sm text-red-700">{deal.rejectReason}</p>
                    </div>
                  )}

                  {/* Approved → Upload / Contract */}
                  {deal.status === "approved" && (
                   <div className="flex gap-2">
      <Button size="sm" className="flex-1 bg-primary" onClick={handleUpload}>
        <Upload className="w-4 h-4 mr-2" />
        Upload Content
      </Button>

      <Button variant="outline" size="sm" onClick={handleDownload}>
        <Download className="w-4 h-4 mr-2" />
        Contract
      </Button>
    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* ---------- PENDING ACTIONS ---------- */}
            {deal.status === "pending" && (
              <>
                {/* Accept */}
                <Dialog open={openAccept} onOpenChange={setOpenAccept}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Accept
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Accept Deal</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to accept the deal with <strong>{deal.brandName}</strong>?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                      <Button variant="outline" onClick={() => setOpenAccept(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleAccept}>
                        Confirm Accept
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Reject */}
                <Dialog open={openReject} onOpenChange={setOpenReject}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Reject
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
                        onClick={handleReject}
                      >
                        Submit Rejection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Deals;
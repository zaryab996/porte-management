import { useState, useRef } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  BadgeCheck,
  CheckCircle,
  Upload,
  BarChart3,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import talentAvatar1 from "@/assets/talent-avatar-1.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({
    name: "Marcus Thompson",
    role: "talent" as const,
    avatar: talentAvatar1,
    verified: true,
    firstName: "Marcus",
    lastName: "Thompson",
    email: "marcus.thompson@duke.edu",
    phone: "+1 (555) 123-4567",
    location: "Durham, NC",
    bio: "Rising star in college basketball with a passion for community engagement and youth mentorship. Duke University guard with 18.5 PPG average. NIL advocate and public speaker.",
  });
  const [allowAILikeness, setAllowAILikeness] = useState(true);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatar
  );
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Handle Avatar Upload ---
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setUser((prev) => ({ ...prev, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  // --- Open File Picker ---
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // --- Save Changes ---
  const handleSave = () => {
    // Simulate save
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 500);
  };

  // --- Cancel → Dashboard ---
  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold bg-clip-text  bg-primary">
            Profile Settings
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Update your personal information and preferences
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ───── LEFT: AVATAR + STATS ───── */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <Card className="overflow-hidden bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block group">
                  <Avatar className="h-32 w-32 mx-auto ring-4 ring-white shadow-2xl">
                    <AvatarImage
                      src={avatarPreview || undefined}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-3xl font-semibold bg-gradient-to-br from-indigo-500 to-pink-500 text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Verified Badge */}
                  {user.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1.5 shadow-md ring-2 ring-white">
                      <BadgeCheck className="h-4 w-4" />
                    </div>
                  )}

                  {/* Upload Overlay */}
                  <div
                    onClick={openFilePicker}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-all duration-200"
                  >
                    <Camera className="h-7 w-7 text-white" />
                  </div>

                  <input
                    ref={fileInputRef}
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {user.name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize flex items-center justify-center gap-1 mt-1">
                  <User className="h-3.5 w-3.5" />
                  {user.role}
                </p>

                <Button
                  onClick={openFilePicker}
                  variant="outline"
                  className="mt-5 w-full hover:bg-primary hover:text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-indigo-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deals Completed</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Earnings</span>
                  <span className="font-medium text-emerald-600">$48,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ───── RIGHT: FORM ───── */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle>
                <CardDescription>
                  Make sure your details are up to date for contracts and
                  communication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name Fields */}

                <div>
                  <Label
                    htmlFor="firstName"
                    className="flex items-center gap-1"
                  >
                    <User className="h-3.5 w-3.5" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={user.location}
                    onChange={(e) =>
                      setUser({ ...user, location: e.target.value })
                    }
                    placeholder="City, State"
                    className="mt-1.5"
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    rows={4}
                    className="mt-1.5 resize-none"
                    placeholder="Tell brands about your story, achievements, and values..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="flex-1 bg-primary">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
            {/* ───── AI LIKENESS PREVIEW (MOCK) ───── */}
            <Card className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  AI Digital Likeness
                </CardTitle>
                <CardDescription>
                  Let brands use your AI-generated avatar in campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Toggle */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <Label
                    htmlFor="ai-toggle"
                    className="text-base font-medium cursor-pointer"
                  >
                    Enable AI Likeness for Brands
                  </Label>
                  <Switch
                    id="ai-toggle"
                    checked={allowAILikeness}
                    onCheckedChange={setAllowAILikeness}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>

                {/* AI Preview Images */}
                {allowAILikeness && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-indigo-700 flex items-center gap-1">
                      <ImageIcon className="h-4 w-4" />
                      Preview of Your AI Avatar
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="group relative overflow-hidden rounded-xl shadow-md">
                        <img
                          src="1.png"
                          alt="AI mock 1"
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-white text-xs font-medium">
                            Nike Campaign
                          </p>
                        </div>
                      </div>
                      <div className="group relative overflow-hidden rounded-xl shadow-md">
                        <img
                          src="/2.png"
                          alt="AI mock 2"
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-white text-xs font-medium">
                            Gatorade Ad
                          </p>
                        </div>
                      </div>
                      <div className="group relative overflow-hidden rounded-xl shadow-md">
                        <img
                          src="/3.png"
                          alt="AI mock 3"
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-white text-xs font-medium">
                            Adidas Digital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disabled State */}
                {!allowAILikeness && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Sparkles className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    <p>AI Likeness is currently disabled</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ───── SUCCESS MODAL ───── */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
              Profile Updated
            </DialogTitle>
            <DialogDescription>
              Your changes have been saved successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;

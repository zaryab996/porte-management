// src/pages/Signup.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Users, Building2, UserCog } from "lucide-react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "talent"
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const roles = [
    { value: "talent", label: "Talent", desc: "Athletes, creators, entertainers", icon: Users },
    { value: "brand", label: "Brand", desc: "Companies seeking talent", icon: Building2 },
    
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      {/* Floating Split Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="grid md:grid-cols-2">
          {/* LEFT: Hero Image */}
          <div className="relative h-64 md:h-full min-h-80">
            <img
              src="/signup.jpg"
              alt="PorTe Management"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Porte Management
              </h1>
              <p className="mt-1 text-sm md:text-base opacity-90">
                Build your future in talent & brand partnerships
              </p>
            </div>
          </div>

          {/* RIGHT: Signup Form */}
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <div className="max-w-md mx-auto w-full space-y-7">
              {/* Logo */}
              <div className="flex justify-center mb-2">
                <img src="/agency_logo.png" alt="Logo" className="h-10 w-auto" />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                <p className="mt-1 text-sm text-slate-600">Join the Porte Management Agency</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="h-11 rounded-xl border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="h-11 rounded-xl border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11 rounded-xl border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-11 rounded-xl border-slate-300 pr-12 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </Button>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">I am a...</Label>
                  <div className="space-y-2">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <label
                          key={role.value}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer
                            ${formData.role === role.value
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                            }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={formData.role === role.value}
                            onChange={() => handleRoleChange(role.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <Icon className={`h-5 w-5 ${formData.role === role.value ? "text-primary" : "text-slate-500"}`} />
                            <div>
                              <p className={`font-medium text-sm ${formData.role === role.value ? "text-primary" : "text-slate-900"}`}>
                                {role.label}
                              </p>
                              <p className="text-xs text-slate-500">{role.desc}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${formData.role === role.value ? "border-primary" : "border-slate-300"}
                          `}>
                            {formData.role === role.value && (
                              <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-sm"
                >
                  Create Account
                </Button>
              </form>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
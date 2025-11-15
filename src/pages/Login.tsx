// src/pages/Login.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

// Hardcoded users
const users = [
  { email: "talent@example.com", password: "1234", role: "talent" },
  { email: "brand@example.com", password: "1234", role: "brand" },
  { email: "admin@example.com", password: "1234", role: "admin" },
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find user
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === formData.email.toLowerCase() &&
        u.password === formData.password
    );

    if (user) {
      // Save auth info in localStorage
      localStorage.setItem("auth", JSON.stringify({ email: user.email, role: user.role }));

      // Redirect based on role
      switch (user.role) {
        case "talent":
          navigate("/dashboard");
          break;
        case "brand":
          navigate("/discover");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="grid md:grid-cols-2">
          {/* LEFT: Hero Image */}
          <div className="relative h-64 md:h-full min-h-80">
            <img
              src="/login.jpg"
              alt="PorTe Management"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Porte Management Agency
              </h1>
              <p className="mt-1 text-sm md:text-base opacity-90">
                Where diversity and inclusivity interlock
              </p>
            </div>
          </div>

          {/* RIGHT: Login Form */}
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <div className="max-w-sm mx-auto w-full space-y-7">
              {/* Logo */}
              <div className="flex justify-center mb-2">
                <img src="/agency_logo.png" alt="Logo" className="h-10 w-auto" />
              </div>

              <h2 className="text-center text-2xl font-bold text-slate-900">
                Sign In
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="••••••••"
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
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-11 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-sm"
                >
                  Sign In
                </Button>
              </form>

              <p className="text-center text-sm text-slate-600">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

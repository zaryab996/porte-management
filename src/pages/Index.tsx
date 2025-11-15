import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Users, TrendingUp, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Future of
            <span className="block bg-gradient-accent bg-clip-text text-transparent">
              Talent Management
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Revolutionizing NIL rights and digital likeness management for the next generation of talent, brands, and agencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                Discover Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Empowering the Creator Economy
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform connects talent, brands, and managers in a seamless ecosystem designed for the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Talent Discovery</h3>
              <p className="text-muted-foreground">Find and connect with verified talent across sports, entertainment, and social media.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Deal Management</h3>
              <p className="text-muted-foreground">Streamline negotiations, contracts, and payments with our automated deal flow system.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Likeness Protection</h3>
              <p className="text-muted-foreground">Advanced digital rights management and AI-powered likeness protection.</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
              <p className="text-muted-foreground">Real-time insights and performance tracking to maximize earning potential.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-secondary-foreground mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-secondary-foreground/80 mb-8">
            Join thousands of talent, brands, and managers already using our platform to build the future of entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="accent" size="lg" className="text-lg px-8 py-4">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">PMA</span>
                </div>
                <span className="text-xl font-bold text-secondary-foreground">PorTe Management</span>
              </div>
              <p className="text-secondary-foreground/80 max-w-md">
                The premier platform for talent management, NIL rights, and digital likeness protection in the creator economy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li><Link to="/discover" className="hover:text-accent transition-colors">Discover Talent</Link></li>
                <li><Link to="/signup" className="hover:text-accent transition-colors">Join as Talent</Link></li>
                <li><Link to="/signup" className="hover:text-accent transition-colors">Brand Partnership</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-secondary-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-secondary-foreground/80">
                <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-secondary-foreground/60">
            <p>&copy; 2024 PorTe Management Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
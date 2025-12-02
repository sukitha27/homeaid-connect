import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, HandHelping, Home, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium animate-fade-up">
            <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse-soft" />
            <span>Helping families rebuild after disaster</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground animate-fade-up stagger-1">
            Rebuild Homes.{" "}
            <span className="text-gradient">Restore Hope.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up stagger-2">
            HomeRelief Sri Lanka connects disaster-affected families with donors and skilled volunteers 
            to repair damaged homes and rebuild communities together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up stagger-3">
            <Link to="/victim-register">
              <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                <Home className="h-5 w-5" />
                I Need Help
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/donor">
              <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2">
                <Heart className="h-5 w-5" />
                I Want to Help
              </Button>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 animate-fade-up stagger-4">
            <Link to="/victim-register" className="group">
              <div className="p-6 rounded-xl border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <Home className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Report Damage</h3>
                    <p className="text-sm text-muted-foreground">Get help for your home</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/donor" className="group">
              <div className="p-6 rounded-xl border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Donate</h3>
                    <p className="text-sm text-muted-foreground">Support rebuilding efforts</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/volunteer" className="group">
              <div className="p-6 rounded-xl border bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <HandHelping className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Volunteer</h3>
                    <p className="text-sm text-muted-foreground">Offer your skills</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

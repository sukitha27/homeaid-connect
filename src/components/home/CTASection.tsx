import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, HandHelping, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Whether you can donate materials, contribute funds, or offer your skills — 
              every bit of help brings a family closer to having a safe home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donor">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto gap-2 bg-white text-primary hover:bg-white/90"
                >
                  <Heart className="h-5 w-5" />
                  Donate Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="w-full sm:w-auto gap-2 border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20"
                >
                  <HandHelping className="h-5 w-5" />
                  Become a Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

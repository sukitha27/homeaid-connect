import { FileText, Search, Users, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Request",
    description: "Affected families register their details and document the damage to their homes.",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: Search,
    title: "Verification",
    description: "Our team verifies the request and assesses the level of damage and urgency.",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Users,
    title: "Matching",
    description: "We connect victims with suitable donors and skilled volunteers in their area.",
    color: "bg-success text-success-foreground",
  },
  {
    icon: CheckCircle,
    title: "Rebuild",
    description: "Work begins to repair homes, with progress tracked until completion.",
    color: "bg-warning text-warning-foreground",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            A simple process to connect those in need with those who can help, 
            ensuring transparent and efficient support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 md:left-auto md:-top-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground border">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <step.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-8 -right-3 text-muted-foreground/30">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

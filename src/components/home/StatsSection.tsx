import { Users, Home, Heart, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Families Helped",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Home,
    value: "1,800+",
    label: "Homes Repaired",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Heart,
    value: "850+",
    label: "Active Donors",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: CheckCircle,
    value: "500+",
    label: "Volunteers",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-card border animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} mb-4`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

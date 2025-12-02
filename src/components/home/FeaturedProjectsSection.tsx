import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, ArrowRight, Calendar } from "lucide-react";

const projects = [
  {
    id: 1,
    family: "Perera Family",
    location: "Galle District",
    damage: "Severe",
    progress: 75,
    status: "In Progress",
    description: "Roof completely destroyed, walls cracked",
    volunteers: 3,
    startDate: "Nov 15, 2024",
  },
  {
    id: 2,
    family: "Silva Family",
    location: "Matara District",
    damage: "Partial",
    progress: 45,
    status: "In Progress",
    description: "Water damage to interior, roof repairs needed",
    volunteers: 2,
    startDate: "Nov 20, 2024",
  },
  {
    id: 3,
    family: "Fernando Family",
    location: "Kalutara District",
    damage: "Total Loss",
    progress: 20,
    status: "Assigned",
    description: "Complete rebuild required after flooding",
    volunteers: 5,
    startDate: "Nov 25, 2024",
  },
];

const damageColors: Record<string, "destructive" | "warning" | "pending"> = {
  "Total Loss": "destructive",
  "Severe": "destructive",
  "Partial": "warning",
  "Minor": "pending",
};

const FeaturedProjectsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Current Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              See the families we're currently helping
            </p>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              elevated 
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.family}</CardTitle>
                  <Badge variant={damageColors[project.damage]}>
                    {project.damage}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex justify-between text-sm pt-2 border-t">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.volunteers} volunteers</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.startDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;

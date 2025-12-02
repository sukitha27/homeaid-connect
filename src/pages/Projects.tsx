import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { MapPin, Users, Calendar, Search, Filter, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    family: "Perera Family",
    location: "Galle District",
    gnDivision: "Hikkaduwa South",
    damage: "Severe",
    progress: 75,
    status: "In Progress",
    description: "Roof completely destroyed by storm, walls show multiple cracks requiring immediate structural repair.",
    needs: ["Roof sheets", "Cement", "Labour"],
    volunteers: 3,
    donors: 2,
    startDate: "Nov 15, 2024",
    familySize: 5,
  },
  {
    id: 2,
    family: "Silva Family",
    location: "Matara District",
    gnDivision: "Weligama West",
    damage: "Partial",
    progress: 45,
    status: "In Progress",
    description: "Flooding caused extensive water damage to interior walls and flooring. Roof repairs also needed.",
    needs: ["Wood", "Paint", "Electrical"],
    volunteers: 2,
    donors: 1,
    startDate: "Nov 20, 2024",
    familySize: 4,
  },
  {
    id: 3,
    family: "Fernando Family",
    location: "Kalutara District",
    gnDivision: "Panadura North",
    damage: "Total Loss",
    progress: 20,
    status: "Assigned",
    description: "Complete rebuild required after landslide destroyed the entire structure. Family currently in temporary shelter.",
    needs: ["Full rebuild", "All materials", "Multiple trades"],
    volunteers: 5,
    donors: 3,
    startDate: "Nov 25, 2024",
    familySize: 6,
  },
  {
    id: 4,
    family: "Jayawardena Family",
    location: "Colombo District",
    gnDivision: "Moratuwa West",
    damage: "Minor",
    progress: 100,
    status: "Completed",
    description: "Minor roof damage repaired successfully. New roof sheets installed.",
    needs: ["Roof sheets"],
    volunteers: 1,
    donors: 1,
    startDate: "Nov 5, 2024",
    familySize: 3,
  },
  {
    id: 5,
    family: "Bandara Family",
    location: "Kandy District",
    gnDivision: "Peradeniya",
    damage: "Partial",
    progress: 0,
    status: "Pending",
    description: "Storm damage to roof and one wall. Awaiting volunteer assignment.",
    needs: ["Roof repair", "Masonry"],
    volunteers: 0,
    donors: 0,
    startDate: "Pending",
    familySize: 4,
  },
  {
    id: 6,
    family: "Wijesinghe Family",
    location: "Gampaha District",
    gnDivision: "Negombo South",
    damage: "Severe",
    progress: 60,
    status: "In Progress",
    description: "Major structural damage from flooding. Foundation reinforcement in progress.",
    needs: ["Cement", "Sand", "Labour"],
    volunteers: 4,
    donors: 2,
    startDate: "Nov 12, 2024",
    familySize: 5,
  },
];

const damageColors: Record<string, "destructive" | "warning" | "pending" | "success"> = {
  "Total Loss": "destructive",
  "Severe": "destructive",
  "Partial": "warning",
  "Minor": "pending",
};

const statusColors: Record<string, "default" | "success" | "warning" | "pending"> = {
  "Completed": "success",
  "In Progress": "default",
  "Assigned": "warning",
  "Pending": "pending",
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [damageFilter, setDamageFilter] = useState("all");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase().replace(" ", "-") === statusFilter;
    const matchesDamage = damageFilter === "all" || project.damage.toLowerCase().replace(" ", "-") === damageFilter;
    return matchesSearch && matchesStatus && matchesDamage;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Repair Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              Track ongoing and completed home repair projects across Sri Lanka
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by family name or location..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={damageFilter} onValueChange={setDamageFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Damage Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Damage Levels</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                    <SelectItem value="total-loss">Total Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                elevated 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-lg">{project.family}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge variant={damageColors[project.damage]}>
                        {project.damage}
                      </Badge>
                      <Badge variant={statusColors[project.status]}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.needs.slice(0, 3).map(need => (
                      <Badge key={need} variant="outline" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                    {project.needs.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.needs.length - 3} more
                      </Badge>
                    )}
                  </div>

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

                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects match your search criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;

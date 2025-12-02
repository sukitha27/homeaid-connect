import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, Home, Heart, CheckCircle, Clock, AlertTriangle, 
  TrendingUp, MapPin, Eye, UserCheck, UserX, Calendar
} from "lucide-react";

// Mock data
const stats = [
  { label: "Total Victims", value: "156", icon: Home, color: "text-destructive", bgColor: "bg-destructive/10", change: "+12 this week" },
  { label: "Active Donors", value: "89", icon: Heart, color: "text-primary", bgColor: "bg-primary/10", change: "+5 this week" },
  { label: "Volunteers", value: "124", icon: Users, color: "text-accent", bgColor: "bg-accent/10", change: "+8 this week" },
  { label: "Completed", value: "67", icon: CheckCircle, color: "text-success", bgColor: "bg-success/10", change: "43% success rate" },
];

const pendingVictims = [
  { id: 1, name: "Kumara Family", district: "Galle", damage: "Severe", submittedAt: "2 hours ago", familySize: 5 },
  { id: 2, name: "Rathnayake Family", district: "Matara", damage: "Partial", submittedAt: "5 hours ago", familySize: 4 },
  { id: 3, name: "Senanayake Family", district: "Hambantota", damage: "Total Loss", submittedAt: "1 day ago", familySize: 6 },
];

const pendingDonors = [
  { id: 1, name: "ABC Construction Ltd", type: "Materials", items: "Cement, Roof Sheets", district: "Colombo" },
  { id: 2, name: "John Perera", type: "Funds", amount: "LKR 50,000", district: "Any" },
  { id: 3, name: "Help Foundation", type: "Sponsorship", items: "Full family support", district: "Southern Province" },
];

const pendingVolunteers = [
  { id: 1, name: "Kamal Silva", skills: ["Carpentry", "Masonry"], district: "Galle", experience: "5+ years" },
  { id: 2, name: "Nimal Fernando", skills: ["Electrical", "Plumbing"], district: "Matara", experience: "3 years" },
  { id: 3, name: "Sunil Bandara", skills: ["General Helper"], district: "Kandy", experience: "1 year" },
];

const activeProjects = [
  { id: 1, family: "Perera Family", district: "Galle", progress: 75, status: "In Progress", volunteers: 3, donors: 2 },
  { id: 2, family: "Silva Family", district: "Matara", progress: 45, status: "In Progress", volunteers: 2, donors: 1 },
  { id: 3, family: "Fernando Family", district: "Kalutara", progress: 20, status: "Assigned", volunteers: 5, donors: 3 },
  { id: 4, family: "Wijesinghe Family", district: "Gampaha", progress: 60, status: "In Progress", volunteers: 4, donors: 2 },
];

const damageColors: Record<string, "destructive" | "warning" | "pending"> = {
  "Total Loss": "destructive",
  "Severe": "destructive",
  "Partial": "warning",
  "Minor": "pending",
};

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage victims, donors, volunteers, and track project progress</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Pending Approvals */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="victims" className="space-y-4">
                <TabsList className="h-12">
                  <TabsTrigger value="victims" className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Pending Victims ({pendingVictims.length})
                  </TabsTrigger>
                  <TabsTrigger value="donors" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Pending Donors ({pendingDonors.length})
                  </TabsTrigger>
                  <TabsTrigger value="volunteers" className="gap-2">
                    <Users className="h-4 w-4" />
                    Pending Volunteers ({pendingVolunteers.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="victims" className="space-y-4">
                  {pendingVictims.map(victim => (
                    <Card key={victim.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{victim.name}</h3>
                              <Badge variant={damageColors[victim.damage]}>{victim.damage}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />{victim.district}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />{victim.familySize} members
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />{victim.submittedAt}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button variant="success" size="sm">
                              <UserCheck className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="destructive" size="sm">
                              <UserX className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="donors" className="space-y-4">
                  {pendingDonors.map(donor => (
                    <Card key={donor.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{donor.name}</h3>
                              <Badge variant="secondary">{donor.type}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span>{donor.items || donor.amount}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />{donor.district}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button variant="success" size="sm">
                              <UserCheck className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="volunteers" className="space-y-4">
                  {pendingVolunteers.map(volunteer => (
                    <Card key={volunteer.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">{volunteer.name}</h3>
                              <Badge variant="outline">{volunteer.experience}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {volunteer.skills.map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />{volunteer.district}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button variant="success" size="sm">
                              <UserCheck className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Active Projects */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Active Projects
                  </CardTitle>
                  <CardDescription>Currently ongoing repairs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeProjects.map(project => (
                    <div key={project.id} className="p-4 rounded-lg border bg-muted/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-foreground">{project.family}</h4>
                          <p className="text-xs text-muted-foreground">{project.district}</p>
                        </div>
                        <Badge variant={project.status === "In Progress" ? "default" : "warning"}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>
                      <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                        <span>{project.volunteers} volunteers</span>
                        <span>{project.donors} donors</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Projects
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

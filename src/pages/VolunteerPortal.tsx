import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { HandHelping, Wrench, Calendar, MapPin, User, CheckCircle, Clock } from "lucide-react";

const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Ratnapura", "Kegalle"
];

const skills = [
  { id: "carpenter", label: "Carpentry", icon: "🪚" },
  { id: "mason", label: "Masonry", icon: "🧱" },
  { id: "electrician", label: "Electrical Work", icon: "⚡" },
  { id: "plumber", label: "Plumbing", icon: "🔧" },
  { id: "painter", label: "Painting", icon: "🎨" },
  { id: "roofing", label: "Roofing", icon: "🏠" },
  { id: "welding", label: "Welding", icon: "🔥" },
  { id: "helper", label: "General Helper", icon: "💪" },
];

const availabilityOptions = [
  { id: "weekdays", label: "Weekdays" },
  { id: "weekends", label: "Weekends" },
  { id: "fulltime", label: "Full-time availability" },
  { id: "emergency", label: "Emergency calls only" },
];

const VolunteerPortal = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleAvailabilityToggle = (availId: string) => {
    setSelectedAvailability(prev => 
      prev.includes(availId) 
        ? prev.filter(id => id !== availId)
        : [...prev, availId]
    );
  };

  const handleDistrictToggle = (district: string) => {
    setSelectedDistricts(prev => 
      prev.includes(district) 
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Thank you for volunteering!", {
      description: "We'll notify you when there's a matching project in your area."
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 mb-4">
              <HandHelping className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Volunteer Your Skills
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Use your skills to help rebuild homes for disaster-affected families. 
              Every hand makes a difference.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="Enter your full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+94 XX XXX XXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input id="age" type="number" min="18" placeholder="e.g., 30" required />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Your current address" />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Wrench className="h-5 w-5 text-primary" />
                  Your Skills
                </CardTitle>
                <CardDescription>Select all skills you can offer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {skills.map(skill => (
                    <div
                      key={skill.id}
                      onClick={() => handleSkillToggle(skill.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                        selectedSkills.includes(skill.id)
                          ? "border-primary bg-primary/5"
                          : "border-input hover:border-primary/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{skill.icon}</div>
                      <div className="text-sm font-medium">{skill.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="h-5 w-5 text-primary" />
                  Availability
                </CardTitle>
                <CardDescription>When can you volunteer?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availabilityOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option.id}
                        checked={selectedAvailability.includes(option.id)}
                        onCheckedChange={() => handleAvailabilityToggle(option.id)}
                      />
                      <Label htmlFor={option.id} className="text-sm font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Available From</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                    <Input id="hoursPerWeek" type="number" placeholder="e.g., 10" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferred Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  Preferred Working Areas
                </CardTitle>
                <CardDescription>Select districts you can travel to</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {districts.map(district => (
                    <div key={district} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`district-${district}`}
                        checked={selectedDistricts.includes(district)}
                        onCheckedChange={() => handleDistrictToggle(district)}
                      />
                      <Label htmlFor={`district-${district}`} className="text-sm font-normal cursor-pointer">
                        {district}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Clock className="h-5 w-5 text-primary" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="motivation">Why do you want to volunteer?</Label>
                  <Textarea 
                    id="motivation" 
                    placeholder="Tell us what motivates you to help..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasTransport" />
                  <Label htmlFor="hasTransport" className="font-normal">
                    I have my own transportation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="hasTools" />
                  <Label htmlFor="hasTools" className="font-normal">
                    I have my own tools
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Register as Volunteer
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VolunteerPortal;

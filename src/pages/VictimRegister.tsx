import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Home, Upload, MapPin, Users, Phone, FileText, CheckCircle } from "lucide-react";

const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle"
];

const damageTypes = [
  { value: "minor", label: "Minor - Small repairs needed" },
  { value: "partial", label: "Partial - Significant repairs needed" },
  { value: "severe", label: "Severe - Major structural damage" },
  { value: "total", label: "Total Loss - Complete rebuild required" },
];

const urgentNeeds = [
  { id: "roof", label: "Roof sheets" },
  { id: "cement", label: "Cement" },
  { id: "wood", label: "Wood/Timber" },
  { id: "bedding", label: "Bedding/Mattresses" },
  { id: "tools", label: "Construction tools" },
  { id: "labour", label: "Skilled labour" },
  { id: "electrical", label: "Electrical work" },
  { id: "plumbing", label: "Plumbing work" },
];

const VictimRegister = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const handleNeedToggle = (needId: string) => {
    setSelectedNeeds(prev => 
      prev.includes(needId) 
        ? prev.filter(id => id !== needId)
        : [...prev, needId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Request submitted successfully!", {
      description: "Our team will verify your request within 24-48 hours."
    });
    
    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-hero mb-4">
              <Home className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Request Home Repair Assistance
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Complete this form to register for disaster relief support. 
              Our team will verify and match you with donors and volunteers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic contact details</CardDescription>
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
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familySize">Number of Family Members *</Label>
                  <Input id="familySize" type="number" min="1" placeholder="e.g., 4" required />
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location Details
                </CardTitle>
                <CardDescription>Where is the damaged property located?</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map(district => (
                        <SelectItem key={district} value={district.toLowerCase()}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gnDivision">GN Division *</Label>
                  <Input id="gnDivision" placeholder="Enter GN division" required />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea id="address" placeholder="Enter your complete address" required />
                </div>
              </CardContent>
            </Card>

            {/* Damage Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5 text-primary" />
                  Damage Assessment
                </CardTitle>
                <CardDescription>Help us understand the extent of damage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="damageType">Type of Damage *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select damage level" />
                    </SelectTrigger>
                    <SelectContent>
                      {damageTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="damageDescription">Describe the Damage *</Label>
                  <Textarea 
                    id="damageDescription" 
                    placeholder="Please describe the damage to your home in detail..."
                    className="min-h-[120px]"
                    required 
                  />
                </div>

                <div className="space-y-3">
                  <Label>Urgent Needs (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {urgentNeeds.map(need => (
                      <div key={need.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={need.id}
                          checked={selectedNeeds.includes(need.id)}
                          onCheckedChange={() => handleNeedToggle(need.id)}
                        />
                        <Label htmlFor={need.id} className="text-sm font-normal cursor-pointer">
                          {need.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Upload className="h-5 w-5 text-primary" />
                  Documentation
                </CardTitle>
                <CardDescription>Upload photos/videos of the damage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-input rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, MP4 (max 10MB each)
                  </p>
                  <Input type="file" className="hidden" multiple accept="image/*,video/*" />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button type="button" variant="outline" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Submit Request
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

export default VictimRegister;

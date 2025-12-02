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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Heart, Package, DollarSign, Users, Building, CheckCircle, MapPin } from "lucide-react";

const districts = [
  "All Districts", "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Ratnapura", "Kegalle"
];

const materials = [
  { id: "roofsheets", label: "Roof Sheets" },
  { id: "cement", label: "Cement Bags" },
  { id: "bricks", label: "Bricks/Blocks" },
  { id: "wood", label: "Wood/Timber" },
  { id: "sand", label: "Sand" },
  { id: "gravel", label: "Gravel" },
  { id: "paint", label: "Paint" },
  { id: "electrical", label: "Electrical Supplies" },
  { id: "plumbing", label: "Plumbing Supplies" },
  { id: "tools", label: "Tools" },
];

const DonorPortal = () => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMaterialToggle = (materialId: string) => {
    setSelectedMaterials(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Thank you for your generous donation!", {
      description: "We'll contact you shortly with matched families."
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 mb-4">
              <Heart className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Become a Donor
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Your generosity can help rebuild homes and restore hope for 
              families affected by disaster.
            </p>
          </div>

          <Tabs defaultValue="materials" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 h-14">
              <TabsTrigger value="materials" className="gap-2 h-12">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Donate</span> Materials
              </TabsTrigger>
              <TabsTrigger value="money" className="gap-2 h-12">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Donate</span> Funds
              </TabsTrigger>
              <TabsTrigger value="sponsor" className="gap-2 h-12">
                <Building className="h-4 w-4" />
                Sponsor Family
              </TabsTrigger>
            </TabsList>

            {/* Materials Donation */}
            <TabsContent value="materials">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name / Organization *</Label>
                      <Input id="name" placeholder="Enter name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+94 XX XXX XXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">Preferred District</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any district" />
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      Materials to Donate
                    </CardTitle>
                    <CardDescription>Select materials you can provide</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {materials.map(material => (
                        <div key={material.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={material.id}
                            checked={selectedMaterials.includes(material.id)}
                            onCheckedChange={() => handleMaterialToggle(material.id)}
                          />
                          <Label htmlFor={material.id} className="text-sm font-normal cursor-pointer">
                            {material.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="materialDetails">Additional Details</Label>
                      <Textarea 
                        id="materialDetails" 
                        placeholder="Quantity, brand, delivery options, etc."
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Submit Donation Offer
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Money Donation */}
            <TabsContent value="money">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Financial Donation
                    </CardTitle>
                    <CardDescription>
                      100% of donations go directly to materials and labor for repairs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["5,000", "10,000", "25,000", "50,000"].map(amount => (
                        <Button key={amount} type="button" variant="outline" className="h-16 text-lg">
                          LKR {amount}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customAmount">Or enter custom amount (LKR)</Label>
                      <Input id="customAmount" type="number" placeholder="Enter amount" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="donorName">Your Name</Label>
                        <Input id="donorName" placeholder="Enter name (optional)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="donorEmail">Email</Label>
                        <Input id="donorEmail" type="email" placeholder="For receipt" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="anonymous" />
                      <Label htmlFor="anonymous" className="font-normal">
                        Make my donation anonymous
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : (
                      <>
                        <Heart className="h-5 w-5" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Sponsor a Family */}
            <TabsContent value="sponsor">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Full Family Sponsorship
                    </CardTitle>
                    <CardDescription>
                      Take complete responsibility for rebuilding a family's home
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sponsorName">Name / Organization *</Label>
                        <Input id="sponsorName" placeholder="Enter name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sponsorPhone">Phone *</Label>
                        <Input id="sponsorPhone" type="tel" placeholder="+94 XX XXX XXXX" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sponsorEmail">Email *</Label>
                        <Input id="sponsorEmail" type="email" placeholder="your@email.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sponsorDistrict">Preferred District</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Any district" />
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sponsorMessage">Message (Optional)</Label>
                      <Textarea 
                        id="sponsorMessage" 
                        placeholder="Any specific preferences or message for the family..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" variant="hero" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Register as Sponsor
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonorPortal;

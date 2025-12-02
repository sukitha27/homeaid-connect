import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Home } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Get Help", path: "/victim-register" },
    { label: "Donate", path: "/donor" },
    { label: "Volunteer", path: "/volunteer" },
    { label: "Projects", path: "/projects" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-foreground leading-tight">HomeRelief</span>
            <span className="text-xs text-muted-foreground leading-tight">Sri Lanka</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                size="sm"
                className="font-medium"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin">
            <Button variant="outline" size="sm">
              Admin
            </Button>
          </Link>
          <Link to="/donor">
            <Button variant="hero" size="sm" className="gap-2">
              <Heart className="h-4 w-4" />
              Donate Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t mt-2">
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Admin Portal</Button>
              </Link>
              <Link to="/donor" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full gap-2">
                  <Heart className="h-4 w-4" />
                  Donate Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

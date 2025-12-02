import { Link } from "react-router-dom";
import { Home, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-foreground leading-tight">HomeRelief</span>
                <span className="text-xs text-muted-foreground leading-tight">Sri Lanka</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting disaster-affected families with donors and volunteers to rebuild homes and restore hope.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/victim-register" className="hover:text-primary transition-colors">Report Damage</Link></li>
              <li><Link to="/donor" className="hover:text-primary transition-colors">Donate</Link></li>
              <li><Link to="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">View Projects</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/transparency" className="hover:text-primary transition-colors">Transparency</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+94 11 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>help@homerelief.lk</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 HomeRelief Sri Lanka. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

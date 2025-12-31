import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Training Calendar", href: "/calendar" },
  { name: "Corporate Training", href: "/corporate" },
  { name: "Contact", href: "/contact" },
];

const courseCategories = [
  "Finance & Accounting",
  "Digital Marketing",
  "Graphic Design",
  "Web Development",
  "Languages",
  "MS Office",
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">ELEGANT</span>
                <span className="text-xs font-medium text-background/60 -mt-1">TRAINING</span>
              </div>
            </div>
            <p className="text-background/70 mb-6">
              Elegant Training Center is a KHDA-approved and Autodesk Authorized Training Center
              offering professional courses in Dubai.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Course Categories</h3>
            <ul className="space-y-3">
              {courseCategories.map((category) => (
                <li key={category}>
                  <Link
                    to="/courses"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-background/70">
                  Office 1601, Burj Al Salam, Trade Centre, Dubai, UAE
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+971547495664" className="text-background/70 hover:text-primary transition-colors">
                  +971 54 749 5664
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@elegant-training.ae" className="text-background/70 hover:text-primary transition-colors">
                  info@elegant-training.ae
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">
                  Mon - Sat: 9:00 AM - 9:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-background/60">
          <p>&copy; {new Date().getFullYear()} Elegant Training Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
import { NAV_LINKS } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
];

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    text: "123 Education Street, Hyderabad, Telangana 500001",
    href: undefined,
  },
  { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
  {
    icon: Mail,
    text: "info@srisriinstitute.com",
    href: "mailto:info@srisriinstitute.com",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f2340 0%, #1e3a5f 60%, #1a3357 100%)",
      }}
    >
      {/* Gold top accent line */}
      <div className="h-1 w-full gold-gradient" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-lg text-white block">
                  Sri Sri Institute
                </span>
                <span className="text-xs text-white/60">
                  Government Exam Coaching
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              Shaping futures since 2014. Sri Sri Institute is Hyderabad's most
              trusted coaching centre for Banking, SSC, Railways, and Defence
              exams — with a 95% success rate and 5000+ qualified students.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-smooth"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(245,166,35,0.25)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(245,166,35,0.50)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.12)";
                  }}
                >
                  <Icon className="w-4 h-4 text-white/80" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                ...NAV_LINKS,
                { label: "Enquiry", href: "/enquiry" as const },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-gold text-sm transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      className="text-white/70 hover:text-white text-sm transition-smooth"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-white/70 text-sm">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.10)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <span>© {year} Sri Sri Institute. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-smooth"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

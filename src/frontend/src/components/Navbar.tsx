import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/types";
import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const prevPathRef = useRef(pathname);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  if (prevPathRef.current !== pathname) {
    prevPathRef.current = pathname;
    if (mobileOpen) setMobileOpen(false);
  }

  const navBase =
    isHomePage && !scrolled
      ? "bg-transparent text-white"
      : "bg-white/95 backdrop-blur-md shadow-glass text-foreground border-b border-border";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}
      data-ocid="navbar"
    >
      <nav className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="navbar-logo"
        >
          <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center shadow-md group-hover:scale-105 transition-smooth">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="font-display font-bold text-base block">
              Sri Sri
            </span>
            <span
              className={`text-xs font-medium block ${
                isHomePage && !scrolled
                  ? "text-white/70"
                  : "text-muted-foreground"
              }`}
            >
              Institute
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth relative ${
                    active
                      ? "text-gold font-semibold"
                      : isHomePage && !scrolled
                        ? "text-white/90 hover:text-white"
                        : "text-foreground hover:text-primary"
                  }`}
                  data-ocid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 gold-gradient rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden md:flex gold-gradient text-white font-semibold border-0 hover:opacity-90 shadow-md transition-smooth"
            data-ocid="navbar-enquire-cta"
          >
            <Link to="/enquiry">Enquire Now</Link>
          </Button>

          <button
            type="button"
            className={`md:hidden p-2 rounded-lg transition-smooth ${
              isHomePage && !scrolled
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-muted"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="navbar-mobile-toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(12px)",
            }}
            data-ocid="navbar-mobile-menu"
          >
            <ul className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                        active
                          ? "text-gold bg-accent/10 font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 pb-1">
                <Button
                  asChild
                  className="w-full gold-gradient text-white font-semibold border-0"
                  data-ocid="navbar-mobile-enquire-cta"
                >
                  <Link to="/enquiry">Enquire Now</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

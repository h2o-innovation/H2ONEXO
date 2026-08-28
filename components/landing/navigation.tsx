"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Problema", href: "#features" },
  { name: "Solución", href: "#how-it-works" },
  { name: "Beneficios", href: "#metrics" },
  { name: "Diferenciais", href: "#developers" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="group flex items-center">
            <span
              className="text-2xl font-semibold tracking-tight text-white transition-opacity duration-300 group-hover:opacity-90"
              style={{ fontFamily: "var(--font-geist-pixel-line), monospace" }}
            >
              Proteus
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary/50"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
              <a href="/admin">
                Panel administrador
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
              <a href="https://proteus-h2o.onrender.com" target="_blank" rel="noreferrer">
                Ingresar
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-foreground hover:bg-foreground/90 text-background"
            >
              <a href="https://proteus-h2o.onrender.com" target="_blank" rel="noreferrer">
                Experimentar ahora
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Alternar menú"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-125 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/50">
              <Button asChild variant="outline" className="justify-start border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                <a href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  Panel administrador
                </a>
              </Button>
              <Button asChild variant="ghost" className="justify-start text-muted-foreground">
                <a href="https://proteus-h2o.onrender.com" target="_blank" rel="noreferrer">
                  Ingresar
                </a>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="https://proteus-h2o.onrender.com" target="_blank" rel="noreferrer">
                  Experimentar ahora
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

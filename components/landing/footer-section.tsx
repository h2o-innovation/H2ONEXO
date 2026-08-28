"use client";

import { Github, Twitter } from "lucide-react";
import { Terminal } from "lucide-react";

const footerLinks = {
  Producto: [
    { name: "Solución", href: "#features" },
    { name: "Cómo funciona", href: "#how-it-works" },
    { name: "Beneficios", href: "#metrics" },
    { name: "Próximos pasos", href: "#" },
  ],
  Funcionalidades: [
    { name: "Plantillas", href: "#" },
    { name: "Respuestas", href: "#" },
    { name: "Personalización", href: "#developers" },
    { name: "Seguimiento", href: "#" },
  ],
  Procesos: [
    { name: "Registro de clientes", href: "#" },
    { name: "Pedido de venta", href: "#" },
    { name: "Solicitud de crédito", href: "#" },
    { name: "Solicitudes internas", href: "#" },
  ],
  Ecosistema: [
    { name: "CRM", href: "#" },
    { name: "ERP", href: "#" },
    { name: "Firma digital", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-primary" />
                </div>
                <span className="font-semibold text-lg tracking-tight">Proteus</span>
              </a>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Proteus — Crea, comparte y transforma respuestas en acciones.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Canal de novidades"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 Proteus. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Todos los procesos operativos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { AsciiTorus } from "./ascii-torus";

const securityFeatures = [
  {
    title: "Campos condicionales",
    description: "Próxima capa para adaptar el formulario a cada respuesta.",
    ascii: `  ╔═══╗
  ║ ◈ ║
  ╚═══╝`
  },
  {
    title: "Carga de documentos",
    description: "Próximo paso para complementar la información con archivos.",
    ascii: `  ┌───┐
  │ ✓ │
  └───┘`
  },
  {
    title: "Firma digital",
    description: "Próximo paso para formalizar procesos iniciados en el formulario.",
    ascii: `  ╭───╮
  │ ★ │
  ╰───╯`
  },
  {
    title: "Flujos de aprobación",
    description: "Próximo paso para derivar respuestas entre equipos.",
    ascii: `  [===]
  [===]`
  },
  {
    title: "Notificaciones automáticas",
    description: "Próximo paso para avisar a los equipos en el momento indicado.",
    ascii: `  ◉─◉─◉
  │ │ │`
  },
  {
    title: "Paneles e indicadores",
    description: "Próximo paso para transformar respuestas en visión operativa.",
    ascii: `  ▪ ▪ ▪
  ▪ ▪ ▪`
  },
];

const certifications = [
  { name: "Inteligencia artificial", status: "Próximos pasos" },
  { name: "ERP y CRM", status: "Próximos pasos" },
  { name: "Permisos", status: "Próximos pasos" },
  { name: "Múltiples etapas", status: "Próximos pasos" },
];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-muted/30 overflow-hidden">
      {/* ASCII Torus Background */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <AsciiTorus className="w-[500px] h-[450px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-mono text-primary mb-4">// PRÓXIMOS PASOS</p>
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
            Uma plataforma preparada para crescer.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            El núcleo configurable de Proteus puede evolucionar con nuevas capas según lo requiera cada proceso.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-card rounded-xl p-6 border border-border card-shadow transition-all duration-500 hover:border-primary/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* ASCII Icon */}
              <pre className="font-mono text-sm text-primary mb-4 leading-tight h-12 flex items-center">
                {feature.ascii}
              </pre>

              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications Bar */}
        <div
          className={`rounded-xl bg-card border border-border card-shadow p-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">De la recopilación de datos a la ejecución.</h3>
              <p className="text-sm text-muted-foreground">
                Configurable, reutilizable e integrable para diferentes necesidades, marcas y procesos.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center gap-2 px-6 py-4 rounded-lg bg-muted/50 border border-border"
                >
                  <span className="font-mono text-xs text-primary">{cert.name}</span>
                  <span className="text-xs text-muted-foreground">{cert.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div
          className={`mt-8 p-6 rounded-xl bg-foreground/5 border border-primary/20 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-start gap-4">
            <pre className="font-mono text-2xl text-primary mt-1">🔒</pre>
            <div>
              <h4 className="font-semibold mb-2">Funcionalidades futuras</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                En el MVP, las integraciones se representan con datos simulados y una capa de servicios preparada para una conexión futura.
                <a href="#" className="text-primary hover:underline ml-1">Conocer próximos pasos →</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

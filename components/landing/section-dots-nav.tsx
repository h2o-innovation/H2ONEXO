"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "features", label: "Problema" },
  { id: "how-it-works", label: "Solución" },
  { id: "infrastructure", label: "Arquitectura" },
  { id: "metrics", label: "Beneficios" },
  { id: "integrations", label: "Ecosistema" },
  { id: "security", label: "Próximos pasos" },
  { id: "developers", label: "Diferenciales" },
  { id: "ai-agui", label: "IA generativa" },
  { id: "web-application", label: "Aplicativo web" },
];

const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;

  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
};

const isIntroActive = () => document.documentElement.dataset.introActive === "true";

export function SectionDotsNav() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  const scrollToSection = (direction: "previous" | "next") => {
    const fallbackIndex = activeIndex >= 0 ? activeIndex : 0;
    const nextIndex = direction === "previous" ? fallbackIndex - 1 : fallbackIndex + 1;
    const nextSection = sections[nextIndex];

    if (!nextSection) return;

    document.getElementById(nextSection.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(nextSection.id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.35, 0.6] }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isTypingTarget(event.target) || isIntroActive()) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollToSection("previous");
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        scrollToSection("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <nav className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full border border-border/70 bg-background/55 p-2 backdrop-blur-xl lg:flex" aria-label="Navegación por secciones">
      <button
        type="button"
        className="grid h-7 w-7 place-items-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition hover:border-primary/50 hover:text-primary disabled:pointer-events-none disabled:opacity-35"
        onClick={() => scrollToSection("previous")}
        disabled={activeIndex <= 0}
        aria-label="Subir a la sección anterior"
        title="Subir"
      >
        <ChevronUp className="h-4 w-4" aria-hidden="true" />
      </button>
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group relative grid h-4 w-4 place-items-center"
            aria-label={`Ir a ${section.label}`}
            title={section.label}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive ? "h-3 w-3 bg-primary shadow-[0_0_18px_rgba(59,130,246,.75)]" : "h-2 w-2 bg-muted-foreground/45 group-hover:bg-primary/80"
              }`}
            />
            <span className="pointer-events-none absolute right-6 rounded-md border border-border bg-card px-2 py-1 font-mono text-[10px] text-muted-foreground opacity-0 shadow-xl transition group-hover:opacity-100">
              {String(index + 1).padStart(2, "0")} {section.label}
            </span>
          </a>
        );
      })}
      <button
        type="button"
        className="grid h-7 w-7 place-items-center rounded-full border border-border/70 bg-card/70 text-muted-foreground transition hover:border-primary/50 hover:text-primary disabled:pointer-events-none disabled:opacity-35"
        onClick={() => scrollToSection("next")}
        disabled={activeIndex === sections.length - 1}
        aria-label="Bajar a la sección siguiente"
        title="Bajar"
      >
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
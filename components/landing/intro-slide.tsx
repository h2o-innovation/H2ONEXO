"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const teamMembers = [
  {
    name: "Vicente Fleitas",
    role: "Presenta",
    photo: "/team-vicente-fleitas.jpg",
    initials: "VF",
  },
  {
    name: "Anahi Candia",
    role: "Presenta",
    photo: "/team-anahi-candia.jpg",
    initials: "AC",
  },
  {
    name: "Marcos Martinez",
    role: "Presenta",
    photo: "/team-marcos-martinez.jpg",
    initials: "MM",
  },
];

export function IntroSlide() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeSlide, setActiveSlide] = useState<"intro" | "team">("intro");
  const [hasStarted, setHasStarted] = useState(false);
  const [showPresenter, setShowPresenter] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [missingPhotos, setMissingPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (!hasStarted || activeSlide !== "intro") return;

    setShowPresenter(false);
    setShowBrand(false);

    const presenterTimer = window.setTimeout(() => setShowPresenter(true), 350);
    const brandTimer = window.setTimeout(() => setShowBrand(true), 2600);

    return () => {
      window.clearTimeout(presenterTimer);
      window.clearTimeout(brandTimer);
    };
  }, [activeSlide, hasStarted]);

  const startPresentation = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsMusicEnabled(true);
      return;
    }

    setActiveSlide("team");
  };

  const returnToIntro = () => {
    setActiveSlide("intro");
  };

  const resetIntro = () => {
    setHasStarted(false);
    setShowPresenter(false);
    setShowBrand(false);
    setIsMusicEnabled(false);
  };

  const finishPresentation = () => {
    setIsMusicEnabled(true);
    setIsLeaving(true);
    window.setTimeout(() => setIsVisible(false), 700);
  };

  const markPhotoMissing = (photo: string) => {
    setMissingPhotos((current) => current.includes(photo) ? current : [...current, photo]);
  };

  if (!isVisible) return null;

  return (
    <section
      className={`fixed inset-0 z-100 flex min-h-screen items-center justify-center overflow-hidden bg-background transition-all duration-700 ease-in-out ${
        isLeaving ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.22),transparent_42%)]" />
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/proteus-transparent.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-contain object-center mix-blend-screen"
        />
      </div>

      {isMusicEnabled && (
        <iframe
          title="Musica ambiente"
          src="https://www.youtube.com/embed/-8vf-QPi4RI?autoplay=1&loop=1&playlist=-8vf-QPi4RI&controls=0&rel=0&modestbranding=1&playsinline=1"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute -left-2 -top-2 h-px w-px opacity-0"
        />
      )}

      {hasStarted && (
        <button
          type="button"
          onClick={activeSlide === "team" ? returnToIntro : resetIntro}
          className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-primary backdrop-blur transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      )}

      {activeSlide === "intro" ? (
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <div className="mb-8 h-px w-40 bg-primary/70 shadow-[0_0_24px_rgba(59,130,246,0.7)] animate-pulse" />
          {showPresenter ? (
            <p className="mb-8 font-mono text-4xl uppercase tracking-[0.18em] text-primary animate-in fade-in slide-in-from-bottom-12 duration-1800 md:text-6xl lg:text-7xl">
              Kapi&apos;i Presenta:
            </p>
          ) : (
            <p className="mb-8 font-mono text-sm uppercase tracking-[0.35em] text-primary/55">
              Presiona para iniciar
            </p>
          )}
          {showBrand && (
            <h1
              className="text-6xl font-semibold tracking-tight text-foreground animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-2200 md:text-8xl lg:text-9xl"
              style={{ fontFamily: "var(--font-geist-pixel-line), monospace" }}
            >
              Proteus
            </h1>
          )}
          <button
            type="button"
            onClick={startPresentation}
            className="group mt-12 grid h-14 w-14 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary shadow-[0_0_32px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
            aria-label={hasStarted ? "Ver equipo" : "Iniciar presentación"}
          >
            <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-6xl px-6 text-center animate-in fade-in slide-in-from-right-12 duration-700">
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.35em] text-primary/80">
            Proteus
          </p>
          <h2
            className="mb-12 text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
            style={{ fontFamily: "var(--font-geist-pixel-line), monospace" }}
          >
            Equipo Presentador
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {teamMembers.map((member, index) => {
              const hasPhoto = !missingPhotos.includes(member.photo);

              return (
                <article
                  key={member.name}
                  className="group overflow-hidden rounded-2xl border border-primary/20 bg-card/70 text-left shadow-[0_0_40px_rgba(59,130,246,0.12)] backdrop-blur animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${index * 160}ms` }}
                >
                  <div className="relative aspect-3/4 overflow-hidden bg-primary/10">
                    {hasPhoto ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => markPhotoMissing(member.photo)}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.28),rgba(15,23,42,0.55))] font-mono text-5xl text-primary">
                        {member.initials}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-background/85 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/75">{member.role}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{member.name}</h3>
                  </div>
                </article>
              );
            })}
          </div>
          <button
            type="button"
            onClick={finishPresentation}
            className="group mx-auto mt-10 grid h-14 w-14 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary shadow-[0_0_32px_rgba(59,130,246,0.25)] transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground"
            aria-label="Ir a Proteus"
          >
            <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
}
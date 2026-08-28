"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AsciiWave } from "./ascii-wave";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* ASCII Wave full width and height */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <AsciiWave className="w-full h-full" />
      </div>

      <div className="absolute -inset-y-24 left-1/2 z-1 w-[145%] -translate-x-1/2 pointer-events-none overflow-hidden opacity-65 mix-blend-screen md:w-[105%] lg:w-[92%]">
        <Image
          src="/proteus-transparent.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-contain object-center"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
        {/* Product */}
        <div
          className={`flex flex-col items-center text-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className="text-6xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-geist-pixel-line), monospace" }}
          >
            Proteus
          </p>
          <p className="mt-3 max-w-2xl text-sm font-medium text-white md:text-base">
            Motor de procesos operativos y comerciales.
          </p>
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <h1 
            className={`text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95] mb-8 transition-all duration-700 delay-100 lg:text-7xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: 'var(--font-geist-pixel-line), monospace' }}
          >
            <span className="text-balance">Una plataforma.</span>
            <br />
            <span className="text-primary text-balance">Infinitas formas de operar.</span>
          </h1>
          
        </div>

        <p
          className={`mb-10 text-center font-mono text-sm text-primary/80 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Capturar → Validar → Aprobar → Ejecutar → Integrar
        </p>
        
        {/* CTAs */}
        <div 
     className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-0 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button 
            size="lg" 
            className="bg-foreground hover:bg-foreground/90 text-background px-6 h-11 text-sm font-medium group"
          >
            Ver transformación
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-11 px-6 text-sm font-medium border-border hover:bg-secondary/50 bg-transparent"
          >
            Motor white label
          </Button>
        </div>
        
      </div>
    </section>
  );
}

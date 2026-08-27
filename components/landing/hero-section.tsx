"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AsciiSphere } from "./ascii-sphere";
import { AsciiWave } from "./ascii-wave";
import { AsciiTorus } from "./ascii-torus"; // Added import for AsciiTorus

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
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
        {/* Evento */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Image
            src="/H2O_Day.png"
            alt="H2O Day"
            width={1086}
            height={434}
            priority
            className="w-48 md:w-56 h-auto"
          />
        </div>

        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <h1 
            className={`text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95] mb-8 transition-all duration-700 delay-100 lg:text-7xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: 'var(--font-geist-pixel-line), monospace' }}
          >
            <span className="text-balance">Transforma formularios en</span>
            <br />
            <span className="text-balance">procesos de</span>{" "}
            <span className="text-primary">negocio.</span>
          </h1>
          
          <p 
            className={`text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Crea, comparte y transforma respuestas en acciones. Crea formularios personalizados, compártelos mediante un enlace y centraliza las respuestas en una experiencia adaptada a la identidad de tu empresa.
            Los primeros casos de uso son el registro de clientes y el pedido de venta.
          </p>
        </div>
        
        {/* CTAs */}
        <div 
     className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-0 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button 
            size="lg" 
            className="bg-foreground hover:bg-foreground/90 text-background px-6 h-11 text-sm font-medium group"
          >
            Crear formulario
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-11 px-6 text-sm font-medium border-border hover:bg-secondary/50 bg-transparent"
          >
            Ver cómo funciona
          </Button>
        </div>
        
      </div>
    </section>
  );
}

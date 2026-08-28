"use client";

import { useEffect, useState } from "react";
import { AsciiWave } from "./ascii-wave";

const metrics = [
  { 
    label: "Creación rápida",
    sublabel: "Sin nuevo desarrollo"
  },
  { 
    label: "Datos completos",
    sublabel: "Información estandarizada"
  },
  { 
    label: "Respuestas centralizadas",
    sublabel: "Todo en un solo lugar"
  },
  { 
    label: "Mayor trazabilidad",
    sublabel: "Estado y seguimiento"
  },
];

export function MetricsSection() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="metrics" className="relative py-32 overflow-hidden">
      {/* ASCII Wave Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <AsciiWave className="w-full h-full object-cover" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-mono text-primary mb-3">// BENEFICIOS</p>
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-balance">
              Autonomía para crear.<br />Agilidad para ejecutar.
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Los equipos ganan autonomía para digitalizar procesos sin depender de nuevas herramientas</span>
            <span className="text-border">|</span>
            <span>{time}</span>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden card-shadow">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-card p-8 flex flex-col gap-4"
            >
              <div>
                <div className="text-foreground font-medium">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

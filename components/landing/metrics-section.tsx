"use client";

import { useEffect, useState, useRef } from "react";
import { AsciiWave } from "./ascii-wave";

function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="font-mono text-4xl lg:text-6xl font-semibold tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

const metrics = [
  { 
    value: 12, 
    suffix: "", 
    label: "Creación rápida",
    sublabel: "Sin nuevo desarrollo"
  },
  { 
    value: 16, 
    suffix: "+", 
    label: "Datos completos",
    sublabel: "Información estandarizada"
  },
  { 
    value: 100, 
    suffix: "%", 
    label: "Respuestas centralizadas",
    sublabel: "Todo en un solo lugar"
  },
  { 
    value: 24, 
    suffix: "/7", 
    label: "Mayor trazabilidad",
    sublabel: "Estado y seguimiento"
  },
];

export function MetricsSection() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
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
            <span>{time.toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden card-shadow">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-card p-8 flex flex-col gap-4"
            >
              <div className="text-primary">
                <AnimatedCounter 
                  end={typeof metric.value === 'number' ? metric.value : 0} 
                  suffix={metric.suffix} 
                />
              </div>
              <div>
                <div className="text-foreground font-medium">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Live Activity Feed */}
        <div className="mt-12 p-6 rounded-xl bg-card border border-border card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-sm text-muted-foreground">Seguimiento reciente</span>
          </div>
          <div className="font-mono text-xs space-y-2 text-muted-foreground overflow-hidden h-24">
            <ActivityLine time="ahora" event="POST /f/registro-clientes" region="admin" status="200" latency="23ms" />
            <ActivityLine time="1s" event="GET /respostas" region="workspace" status="200" latency="18ms" />
            <ActivityLine time="2s" event="POST /f/pedido-de-venta" region="cliente" status="200" latency="45ms" />
            <ActivityLine time="3s" event="PATCH /respostas/s1" region="seguimiento" status="202" latency="12ms" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityLine({ time, event, region, status, latency }: { 
  time: string; 
  event: string; 
  region: string; 
  status: string; 
  latency: string; 
}) {
  return (
    <div className="flex items-center gap-4 animate-in slide-in-from-bottom-2 duration-500">
      <span className="text-muted-foreground/50 w-8">{time}</span>
      <span className="text-foreground">{event}</span>
      <span className="text-muted-foreground/50">{region}</span>
      <span className={status.startsWith("2") ? "text-blue-400" : "text-blue-300"}>{status}</span>
      <span className="text-primary">{latency}</span>
    </div>
  );
}

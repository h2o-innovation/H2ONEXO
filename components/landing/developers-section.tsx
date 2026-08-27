"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AsciiDna } from "./ascii-dna";
import { Copy, Check } from "lucide-react";

const codeExamples = [
  {
    label: "Crear formulario",
    code: `import { H2ONexo } from '@h2o/nexo'

const nexo = new H2ONexo({
  workspace: 'acme'
})`,
  },
  {
    label: "Publicar",
  code: `const respuesta = await nexo.respuestas.listar({
  formulario: 'registro-clientes',
  status: 'Recibido'
})

console.log(respuesta)`,
  },
  {
    label: "Seguimiento",
  code: `const formulario = await nexo.formularios.publicar({
  slug: 'pedido-de-venta',
  compartir: true
})

console.log(formulario.link)`,
  },
];

const features = [
  { 
    title: "Personalización white label", 
    description: "Personaliza el nombre, los colores, las iniciales y los mensajes por empresa.",
  },
  { 
    title: "Formularios adaptables", 
    description: "Adapta campos y etiquetas para diferentes procesos.",
  },
  { 
    title: "Plantillas listas", 
    description: "Comienza con registro de clientes, pedido de venta o un formulario vacío.",
  },
  { 
    title: "Centralización de respuestas", 
    description: "Visualiza datos, estados y detalles en un único seguimiento.",
  },
];

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Content */}
          <div>
            <p className="text-sm font-mono text-primary mb-3">// DIFERENCIALES</p>
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-6 text-balance">
              Mucho más que un formulario.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Las herramientas comunes recopilan respuestas. H2O Nexo transforma respuestas en acciones.
            </p>
            
            {/* Features list */}
            <div className="grid gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-1 bg-primary/30 rounded-full shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* ASCII DNA decoration */}
            
          </div>
          
          {/* Right: Code block */}
          <div className="lg:sticky lg:top-32">
            <div className="rounded-xl overflow-hidden bg-card border border-border card-shadow">
              {/* Tabs */}
              <div className="flex items-center gap-1 p-2 border-b border-border bg-secondary/30">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                      activeTab === idx
                        ? "bg-card text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copiar código"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Code content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">
                  <code>
                    {codeExamples[activeTab].code.split('\n').map((line, i) => (
                      <span key={i} className="block leading-relaxed">
                        <span className="text-muted-foreground/40 select-none w-8 inline-block">{i + 1}</span>
                        {highlightSyntax(line)}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
              
              {/* Terminal output */}
              <div className="border-t border-border p-4 bg-secondary/20">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                  <span className="text-blue-400">$</span>
                  <span>npm install @h2o/nexo</span>
                </div>
                <div className="text-xs font-mono text-muted-foreground/60">
                  capa de servicio lista para una integración futura
                </div>
              </div>
            </div>
            
            {/* Docs link */}
            <div className="mt-6 flex items-center gap-4 text-sm">
              <a href="#" className="text-primary hover:underline font-mono">
                Ver documentación
              </a>
              <span className="text-border">|</span>
              <a href="#" className="text-muted-foreground hover:text-foreground font-mono">
                Conocer la arquitectura
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function highlightSyntax(line: string): ReactNode[] {
  const tokenPattern = /(\/\/.*$|'[^']*'|"[^"]*"|\b(?:import|from|const|await|for|process)\b|[{}()[\]])/g;
  const highlighted: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(tokenPattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) highlighted.push(line.slice(lastIndex, index));

    let className = "text-muted-foreground";
    if (token.startsWith("//")) className = "text-muted-foreground/50";
    else if (token.startsWith("'") || token.startsWith('"')) className = "text-blue-300";
    else if (/^(import|from|const|await|for|process)$/.test(token)) className = "text-primary";

    highlighted.push(
      <span key={`${index}-${token}`} className={className}>
        {token}
      </span>
    );
    lastIndex = index + token.length;
  }

  if (lastIndex < line.length) highlighted.push(line.slice(lastIndex));
  return highlighted;
}

import { Bot, Code2, MessageSquareText, Sparkles } from "lucide-react";

const capabilities = [
  {
    title: "Chatbot constructor",
    description: "El usuario describe lo que necesita y el asistente traduce esa intención en una interfaz inicial.",
    Icon: MessageSquareText,
  },
  {
    title: "Protocolo generative AGUI",
    description: "La conversación genera estructura, componentes y reglas de interacción reutilizables dentro del flujo de Proteus.",
    Icon: Code2,
  },
  {
    title: "LLM ChatGPT 5.5",
    description: "El modelo interpreta necesidades de negocio y propone pantallas, formularios y ajustes de experiencia.",
    Icon: Bot,
  },
];

export function AiAguiSection() {
  return (
    <section id="ai-agui" className="relative overflow-hidden border-y border-border/60 bg-muted/20 py-32">
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 font-mono text-sm text-primary">// IA GENERATIVA</p>
            <h2 className="text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
              Interfaces creadas desde una conversación. Desde un simple prompt.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Implementamos el modelo LLM ChatGPT 5.5 para usar el protocolo generative AGUI y ayudar a crear interfaces desde el chatbot.
            </p>
          </div>

          <div className="grid gap-4">
            {capabilities.map(({ title, description, Icon }) => (
              <article key={title} className="group rounded-xl border border-border bg-card p-6 card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary/30">
                <div className="mb-5 flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-primary/20 bg-card/70 p-6 card-shadow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                <Sparkles className="h-4 w-4" />
                Flujo asistido
              </div>
              <p className="text-sm text-muted-foreground">
                Describir necesidad → generar interfaz → ajustar campos → publicar experiencia.
              </p>
            </div>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-xs text-primary">
              Chatbot + AGUI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
const criteriaGroups = [
  {
    title: "Stack permitido",
    items: ["Frontend: React", "Backend: .NET / Python / JavaScript"],
  },
  {
    title: "Repositorio oficial",
    items: ["Código en repositorio H2O"],
  },
  {
    title: "Integraciones",
    items: ["Mocks o datos simulados permitidos", "Explicitar integración futura"],
  },
  {
    title: "Arquitectura",
    items: ["Vertical Slice + Clean Architecture", "Padrões e normas de H2O"],
  },
  {
    title: "Ejecución local",
    items: ["Deployment no obligatorio", "Debe correr localmente"],
  },
  {
    title: "Calidad mínima",
    items: ["README + instrucciones para levantar el proyecto", "Sin secreto, tokens o API Keys"],
  },
];

export function WebApplicationSection() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <p className="mb-3 font-mono text-sm text-primary">// APLICATIVO WEB</p>
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <h2 className="text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
              Aplicativo Web
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Criterios para o que é construído, de forma demonstrável e capaz de evoluir dentro do H2O.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {criteriaGroups.map((group) => (
              <div key={group.title} className="flex gap-4">
                <div className="w-1 shrink-0 rounded-full bg-primary/30" />
                <div>
                  <h3 className="mb-2 font-medium">{group.title}</h3>
                  <ul className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import { ArrowLeft, Building2 } from "lucide-react";

const companies = [
  { slug: "agrofertil", name: "Agrofertil", logo: "/logo-agrofertil-dark.png" },
  { slug: "tecnomyl", name: "Tecnomyl", logo: "/logo-tecnomyl-dark.png" },
  { slug: "amaru", name: "Amaru", logo: "/Amaru_Logotipo-Variantes.png" },
  { slug: "campos-nuevos", name: "Campos nuevos", logo: "/ACN Logotipo Letra blanca.png", compactLogo: true },
];

export function generateStaticParams() {
  return companies.map((company) => ({ company: company.slug }));
}

export default function CompanyPlaceholderPage({ params }: { params: { company: string } }) {
  const company = companies.find((item) => item.slug === params.company);
  const name = company?.name ?? "Empresa";

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground lg:px-8">
      <div className="mx-auto max-w-4xl">
        <a href="/admin" className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Volver al panel
        </a>

        <section className="rounded-xl border border-border bg-card p-8 card-shadow">
          {company?.logo ? (
            <div className="mb-8 flex h-16 w-44 items-center justify-center rounded-lg border border-primary/20 bg-black p-3">
              <Image src={company.logo} alt={name} width={180} height={56} className={`${company.compactLogo ? "h-9" : "h-auto"} w-full object-contain`} />
            </div>
          ) : (
            <div className="mb-8 grid h-12 w-12 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
          )}
          <p className="mb-3 font-mono text-sm text-primary">// EMPRESA</p>
          <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">{name}</h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Este destino queda preparado para redireccionar al lugar final cuando me pases la URL correspondiente.
          </p>
        </section>
      </div>
    </main>
  );
}
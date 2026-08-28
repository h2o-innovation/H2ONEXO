"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Building2, LayoutDashboard, Plus, Trash2, X } from "lucide-react";

type Company = {
  name: string;
  href: string;
  status: string;
  logo?: string;
  compactLogo?: boolean;
  description?: string;
};

const defaultCompanies: Company[] = [
  { name: "Agrofertil", href: "https://proteus-h2o.onrender.com/", status: "Destino configurado", logo: "/logo-agrofertil-dark.png" },
  { name: "Tecnomyl", href: "/admin/tecnomyl", status: "Destino pendiente", logo: "/logo-tecnomyl-dark.png" },
  { name: "Amaru", href: "/admin/amaru", status: "Destino pendiente", logo: "/Amaru_Logotipo-Variantes.png" },
  { name: "Campos nuevos", href: "/admin/campos-nuevos", status: "Destino pendiente", logo: "/ACN Logotipo Letra blanca.png", compactLogo: true },
];

const storageKey = "proteus-admin-companies";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPanelPage() {
  const [companies, setCompanies] = useState<Company[]>(defaultCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]") as Company[];
      if (Array.isArray(saved) && saved.length) setCompanies([...defaultCompanies, ...saved]);
    } catch {
      setCompanies(defaultCompanies);
    }
  }, []);

  const openCreateModal = () => setIsModalOpen(true);

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setName("");
    setLogo("");
    setDescription("");
  };

  const uploadLogo = (file: File | undefined) => {
    if (!file) {
      setLogo("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const createCompany = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newCompany: Company = {
      name: trimmedName,
      href: `#${slugify(trimmedName) || "empresa"}`,
      status: "Creada localmente",
      logo: logo.trim() || undefined,
      description: description.trim() || "Empresa creada desde el panel administrador.",
    };

    const savedCompanies = companies.filter(
      (company) => !defaultCompanies.some((defaultCompany) => defaultCompany.name === company.name)
    );
    const nextSavedCompanies = [...savedCompanies, newCompany];
    localStorage.setItem(storageKey, JSON.stringify(nextSavedCompanies));
    setCompanies([...defaultCompanies, ...nextSavedCompanies]);
    closeCreateModal();
  };

  const deleteCompany = (companyName: string) => {
    const savedCompanies = companies.filter(
      (company) => !defaultCompanies.some((defaultCompany) => defaultCompany.name === company.name)
    );
    const nextSavedCompanies = savedCompanies.filter((company) => company.name !== companyName);
    localStorage.setItem(storageKey, JSON.stringify(nextSavedCompanies));
    setCompanies([...defaultCompanies, ...nextSavedCompanies]);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[18rem_1fr]">
        <aside className="border-b border-border bg-card/80 p-6 lg:border-b-0 lg:border-r">
          <a href="/" className="mb-10 block text-2xl font-semibold tracking-tight text-white">
            Proteus
          </a>

          <nav className="space-y-2">
            <button type="button" onClick={openCreateModal} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground">
              <Plus className="h-4 w-4 text-primary" />
              Crear nueva empresa
            </button>
            <a href="#empresas" className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-3 text-sm font-medium text-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              Mis empresas
            </a>
            <a href="#dashboard" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground">
              <LayoutDashboard className="h-4 w-4 text-primary" />
              Dashboard
            </a>
          </nav>
        </aside>

        <section className="relative overflow-hidden p-6 sm:p-8 lg:p-12">
          <div className="absolute inset-0 grid-pattern opacity-35" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 font-mono text-sm text-primary">// PANEL ADMINISTRADOR</p>
                <h1 className="text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
                  Mis empresas
                </h1>
              </div>
              <button
                id="crear"
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Crear empresa
              </button>
            </div>

            <div id="empresas" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {companies.map((company) => {
                const canDelete = !defaultCompanies.some((defaultCompany) => defaultCompany.name === company.name);

                return (
                  <article
                    key={company.name}
                    className="group flex min-h-44 flex-col justify-between rounded-xl border border-border bg-card p-6 card-shadow transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary/30"
                  >
                    <div>
                      <div className="mb-8 flex items-start justify-between gap-4">
                        {company.logo ? (
                          <div className="flex h-14 w-36 items-center justify-center rounded-lg border border-primary/20 bg-black p-3">
                            <img src={company.logo} alt={company.name} className={`${company.compactLogo ? "h-8" : "h-auto"} w-full object-contain`} />
                          </div>
                        ) : (
                          <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                            <Building2 className="h-5 w-5" />
                          </div>
                        )}
                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => deleteCompany(company.name)}
                            className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Borrar ${company.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight">{company.name}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">{company.description ?? company.status}</p>
                    </div>
                    <a href={company.href} className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-primary">
                      Abrir empresa
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </article>
                );
              })}
            </div>

            <div id="dashboard" className="mt-8 rounded-xl border border-border bg-card/70 p-6 text-sm text-muted-foreground card-shadow">
              Seleccioná una empresa para entrar a su panel. Los destinos finales se pueden cambiar cuando me pases las URLs.
            </div>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 backdrop-blur-sm">
          <form onSubmit={createCompany} className="w-full max-w-lg rounded-xl border border-border bg-card p-6 card-shadow">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Nueva empresa</p>
                <h2 className="text-3xl font-semibold tracking-tight">Crear empresa</h2>
              </div>
              <button type="button" onClick={closeCreateModal} className="rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label="Cerrar modal">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-medium text-foreground">
                Nombre de empresa
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary"
                  placeholder="Ej: Nueva empresa"
                />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => uploadLogo(event.target.files?.[0])}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-muted-foreground outline-none transition file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90 focus:border-primary"
                />
              </label>

              {logo && (
                <div className="rounded-lg border border-border bg-black p-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Preview logo</p>
                  <img src={logo} alt="Preview del logo" className="max-h-28 w-full object-contain" />
                </div>
              )}

              <label className="block text-sm font-medium text-foreground">
                Descripción
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="mt-2 min-h-28 w-full resize-none rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
                  placeholder="Descripción breve de la empresa"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeCreateModal} className="inline-flex h-11 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                Cancelar
              </button>
              <button type="submit" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                Guardar empresa
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
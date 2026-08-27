"use client";

import { Download, ExternalLink, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type IntegrationMenuProps = {
  mobile?: boolean;
};

const steps = [
  {
    number: "01",
    title: "Instalar dependencias",
    detail: "Agregá react-native-webview y @gorhom/bottom-sheet al proyecto Expo.",
  },
  {
    number: "02",
    title: "Configurar providers",
    detail: "Envolvé la app con GestureHandlerRootView y BottomSheetModalProvider.",
  },
  {
    number: "03",
    title: "Crear el WebView",
    detail: "Mostrá el formulario dentro de la app con carga, reintento y navegación interna.",
  },
  {
    number: "04",
    title: "Abrir el Bottom Sheet",
    detail: "Usá snapPoints={[\"92%\"]} para abrir el formulario como una hoja móvil.",
  },
];

export function IntegrationMenu({ mobile = false }: IntegrationMenuProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size={mobile ? "default" : "sm"}
          className={mobile
            ? "justify-start text-muted-foreground hover:text-foreground"
            : "text-muted-foreground hover:text-foreground"}
        >
          <Smartphone className="mr-2 h-4 w-4" />
          WebView + BottomSheetModal
        </Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[92vh] border-primary/20 bg-background">
        <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden">
          <DrawerHeader className="px-6 pb-4 pt-6 text-left">
            <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              WebView + BottomSheetModal
            </div>
            <DrawerTitle className="text-2xl tracking-tight sm:text-3xl">
              Formulario web dentro de un Bottom Sheet
            </DrawerTitle>
            <DrawerDescription className="max-w-2xl text-sm leading-relaxed">
              Abrí un formulario dentro de tu app Expo sin redireccionar al navegador ni cambiar de pantalla.
            </DrawerDescription>
          </DrawerHeader>

          <div className="overflow-y-auto px-6 pb-2">
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((step) => (
                <div key={step.number} className="rounded-xl border border-border bg-secondary/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-primary">{step.number}</span>
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">URL del formulario</p>
              <code className="block overflow-x-auto rounded-lg bg-black/30 px-3 py-2 text-xs text-muted-foreground">
                EXPO_PUBLIC_FORM_URL=https://tu-sitio.com/formulario
              </code>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Si no configurás la variable, se carga un formulario de ejemplo. Después de cambiar el `.env`, ejecutá `npx expo start --clear`.
              </p>
            </div>
          </div>

          <DrawerFooter className="flex-row items-center justify-between gap-3 border-t border-border px-6 py-4">
            <a
              href="/integracion-formulario-mobile.md"
              download="integracion-formulario-mobile.md"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" />
              Descargar .md
            </a>
            <div className="flex items-center gap-2">
              <a
                href="/integracion-formulario-mobile.md"
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                Ver guía <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <DrawerClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

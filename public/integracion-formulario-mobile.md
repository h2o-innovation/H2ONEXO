# Integración de formulario web en Bottom Sheet

Esta integración abre un formulario web dentro de la aplicación usando un `BottomSheetModal`. No redirecciona al navegador ni cambia de pantalla.

## 1. Dependencias

```bash
npx expo install react-native-webview
npm install @gorhom/bottom-sheet
```

## 2. Providers requeridos

En `App.tsx`, envolver la aplicación con `GestureHandlerRootView` y `BottomSheetModalProvider`:

```tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Routes />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
```

## 3. Componente WebView

Crear `src/screens/WebForm/View.tsx`. El componente controla la carga, los errores, la navegación interna y el botón de volver:

```tsx
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowClockwise, ArrowLeft } from "phosphor-react-native";
import { WebView } from "react-native-webview";
import type {
  WebViewErrorEvent,
  WebViewNavigation,
} from "react-native-webview/lib/WebViewTypes";

const FORM_URL =
  process.env.EXPO_PUBLIC_FORM_URL?.trim() ||
  "https://www.w3schools.com/html/html_forms.asp";

type WebFormViewProps = {
  onClose: () => void;
};

export default function WebFormView({ onClose }: WebFormViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  const reload = () => {
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.reload();
  };

  const onNavigationStateChange = useCallback(
    (state: WebViewNavigation) => setCanGoBack(state.canGoBack),
    [],
  );

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#E5E7EB", flexDirection: "row", justifyContent: "space-between", minHeight: 56, paddingHorizontal: 16 }}>
        <Pressable onPress={() => (canGoBack ? webViewRef.current?.goBack() : onClose())} hitSlop={8}>
          <ArrowLeft size={22} color="#374151" weight="bold" />
        </Pressable>
        <Text style={{ color: "#374151", fontSize: 18, fontWeight: "600" }}>Formulario</Text>
        <Pressable onPress={reload} hitSlop={8}>
          <ArrowClockwise size={21} color="#374151" weight="bold" />
        </Pressable>
      </View>

      {hasError ? (
        <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
          <Text>No se pudo cargar el formulario.</Text>
          <Pressable onPress={reload} style={{ marginTop: 16 }}>
            <Text style={{ color: "#6BA43A", fontWeight: "600" }}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <WebView
            ref={webViewRef}
            source={{ uri: FORM_URL }}
            javaScriptEnabled
            domStorageEnabled
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            onLoadStart={() => { setHasError(false); setIsLoading(true); }}
            onLoadEnd={() => setIsLoading(false)}
            onError={(_event: WebViewErrorEvent) => { setIsLoading(false); setHasError(true); }}
            onNavigationStateChange={onNavigationStateChange}
          />

          {isLoading && (
            <View style={{ alignItems: "center", backgroundColor: "rgba(255,255,255,0.82)", bottom: 0, justifyContent: "center", left: 0, position: "absolute", right: 0, top: 0 }}>
              <ActivityIndicator size="large" color="#6BA43A" />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
```

## 4. Integrar en Home

Crear la referencia y las funciones:

```tsx
const webFormSheetRef = useRef<BottomSheetModal>(null);

const openWebForm = () => webFormSheetRef.current?.present();
const closeWebForm = () => webFormSheetRef.current?.dismiss();

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    pressBehavior="close"
  />
);
```

Agregar el botón:

```tsx
<Pressable onPress={openWebForm}>
  <Text>Completar formulario</Text>
</Pressable>
```

Agregar el Bottom Sheet dentro del JSX de Home:

```tsx
<BottomSheetModal
  ref={webFormSheetRef}
  index={0}
  snapPoints={["92%"]}
  enableDynamicSizing={false}
  enablePanDownToClose
  backdropComponent={renderBackdrop}
  backgroundStyle={{
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  }}
>
  <BottomSheetView style={{ flex: 1 }}>
    <WebFormView onClose={closeWebForm} />
  </BottomSheetView>
</BottomSheetModal>
```

> Importante: el snap point correcto es `"92%"`, no `"%92"`.

## 5. URL de ejemplo y URL real

Por defecto se usa:

```text
https://www.w3schools.com/html/html_forms.asp
```

Para usar el formulario real, agregar en `.env`:

```env
EXPO_PUBLIC_FORM_URL=https://tu-sitio.com/formulario
```

Después, reiniciar Expo limpiando la caché:

```bash
npx expo start --clear
```

## 6. Builds nativos

Como `react-native-webview` es un módulo nativo, puede ser necesario generar una development build:

```bash
npx expo run:ios
npx expo run:android
```

El formulario se mantiene dentro de la app y no se abre en Safari ni en Chrome.

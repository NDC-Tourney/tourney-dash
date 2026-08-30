import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconContext } from "@phosphor-icons/react";
import { ZodError } from "zod";
import { useEffect } from "react";
import { Screens } from "./Screens";
import {
  DashboardSettingsProvider,
  useSettings,
} from "./state/dashboard";
import { TosuProvider } from "./state/tosu";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
      staleTime: 0,
      retry: (_, error) => !(error instanceof ZodError),
    },
  },
});

function AppContent() {
  const [settings] = useSettings();

  useEffect(() => {
    const existingLinks = document.querySelectorAll(
      'link[data-version-style]'
    );
    existingLinks.forEach((link) => link.remove());

    const cssPath =
      settings.graphicsStyle === "NDC 2026"
        ? "./versions/ndc2026/static/style.css"
        : "./versions/ndc2025/static/style.css";

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssPath;
    link.dataset.versionStyle = settings.graphicsStyle;
    document.head.appendChild(link);
  }, [settings.graphicsStyle]);

  return (
    <div data-graphics-style={settings.graphicsStyle}>
      <IconContext.Provider
        value={{ height: "1em", width: "1em", weight: "bold" }}
      >
        <Screens />
      </IconContext.Provider>
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardSettingsProvider>
        <TosuProvider>
          <AppContent />
        </TosuProvider>
      </DashboardSettingsProvider>
    </QueryClientProvider>
  );
}

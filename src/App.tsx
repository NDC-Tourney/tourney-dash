import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconContext } from "@phosphor-icons/react";
import { ZodError } from "zod";
import { Screens } from "./Screens";
import {
  DashboardSettingsProvider,
  useSettings,
} from "./state/dashboard";
import { TosuProvider } from "./state/tosu";
import "./versions/ndc2025/static/style.css";
import "./versions/ndc2026/static/style.css";

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

import "./global.css";

import { Router } from "./routes/sections";

import { ThemeProvider } from "./theme/theme-provider";

import { useScrollToTop } from "./hooks/use-scroll-to-top";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

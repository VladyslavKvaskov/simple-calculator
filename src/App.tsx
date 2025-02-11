import { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { IconButton, type PaletteMode } from "@mui/material";

import "./App.css";
import Calculator from "./Calculator";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const savedMode = localStorage.getItem("mode");
  const [mode, setMode] = useState<PaletteMode>(
    savedMode ? (savedMode as PaletteMode) : prefersDarkMode ? "dark" : "light"
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);

      return newMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <IconButton
        onClick={toggleMode}
        sx={{ position: "fixed", top: 0, right: 0 }}
      >
        {mode === "light" ? <NightsStayIcon /> : <LightModeIcon />}
      </IconButton>
      <CssBaseline />
      <Calculator />
    </ThemeProvider>
  );
};

export default App;

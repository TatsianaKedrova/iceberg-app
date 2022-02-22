import React, { FunctionComponent } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

type RootThemeProps = {};

declare module "@mui/material/styles" {
  export interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

export const RootThemeProvider: FunctionComponent<RootThemeProps> = (props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2998E5",
        light: "#BBDEF7",
        contrastText: "#5CB1EB",
      },
      secondary: {
        main: "#12222E",
        light: "#86898B",
        contrastText: "#DBDCE0",
      },
      success: {
        main: "#84BC03",
        light: "#F1F2F6",
      },
      info: {
        main: "#3D539B",
      },
      warning: {
        main: "#FB6E0E",
        light: "#F9D000",
      },
      error: {
        main: "#CD1B3B",
      },
      neutral: {
        main: "#FFFFFF",
        light: "#5FC4D7",
      },
    },

    typography: {
      fontFamily: "Inter",
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

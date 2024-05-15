import {
  PaletteOptions,
  ZIndexOptions,
  ThemeOptions,
  Theme,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    colors?: {
      primary?: string;
      secondary?: string;
      error?: string;
      warning?: string;
      info?: string;
      success?: string;
      grey?: string;
      custom?: string;
    };
  }

  interface ZIndexOptions {
    zIndex?: Partial<ZIndex>;
  }

  interface ZIndex {
    backdrop?: number;
  }

  interface ThemeOptions {
    borders?: {
      grey?: {
        sm?: string;
      };
    };
  }

  interface Theme {
    borders?: {
      grey?: {
        sm?: string;
      };
    };
  }
}

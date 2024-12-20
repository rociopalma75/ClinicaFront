'use client';

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

export default function RootLayout({ children }) {

  const themeOptions = createTheme( {
    palette: {
      mode: 'light',
      primary: {
        main: '#00004d',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={themeOptions}>
        <SnackbarProvider maxSnack={3} autoHideDuration={500}>
          <CssBaseline/>
            {children}
        </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

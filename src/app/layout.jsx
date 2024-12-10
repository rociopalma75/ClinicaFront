'use client';

import localFont from "next/font/local";
import "./globals.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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
          <CssBaseline/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

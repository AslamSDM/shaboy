import type { Metadata } from "next";
import { ScaffoldStarkAppWithProviders } from "~~/components/ScaffoldStarkAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";

import "~~/styles/globals.css";
import "~~/styles/emulator.css";
import "~~/styles/askai.css"
import "~~/styles/createForm.css";
import "~~/styles/homepage.css";
import "~~/node_modules/sal.js/dist/sal.css"

export const metadata: Metadata = {
  title: "Shaboy",
  description: "play Retro games on the blockchain",
  icons: "/logo.ico",
  
};

const ScaffoldStarkApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldStarkAppWithProviders>

            {children}
          </ScaffoldStarkAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldStarkApp;

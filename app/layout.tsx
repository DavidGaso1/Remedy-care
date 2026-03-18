import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import { getSettings } from "@/lib/db";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Tubon's Care | Science-Backed Herbal Solutions",
  description: "Natural herbal solutions for ED, Prostate, Diabetes, Infections, Joint Pain & Blood Pressure. NAFDAC approved. Pay on delivery across Nigeria.",
  keywords: "natural remedy Nigeria, herbal medicine, ED treatment, prostate health, diabetes cure, NAFDAC approved",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-primary/10 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ConditionalLayout settings={settings}>{children}</ConditionalLayout>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

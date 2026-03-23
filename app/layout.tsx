import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Remedy Care | Science-Backed Herbal Solutions",
  description: "Natural herbal solutions for ED, Prostate, Diabetes, Infections, Joint Pain & Blood Pressure. NAFDAC approved. Pay on delivery across Nigeria.",
  keywords: "natural remedy Nigeria, herbal medicine, ED treatment, prostate health, diabetes cure, NAFDAC approved, Remedy Care",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-primary/10 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

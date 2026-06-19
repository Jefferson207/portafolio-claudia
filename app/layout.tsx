import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  metadataBase: new URL("https://claudiaperales.com"),
  title: "Claudia Perales | Arquitecta & Diseñadora",
  description: "Diseño arquitectónico, BIM y visualización 3D en Chiclayo, Perú.",
  keywords: ["arquitecta", "Chiclayo", "BIM", "Revit", "diseño arquitectónico", "renderizado 3D"],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  openGraph: { title: "Claudia Carolina Perales Chávez", description: "Arquitectura que equilibra función, materia y emoción.", type: "website", images: ["/images/claudia-profile.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" suppressHydrationWarning><body className={`${inter.variable} ${playfair.variable}`}><Providers>{children}</Providers></body></html>;
}

import type { Metadata } from "next";
import { Bricolage_Grotesque, Literata, IBM_Plex_Mono } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

// Display: variable width and optical size — technical without being cold.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Body: a genuine long-form reading face. Lessons run past 2,000 words.
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  display: "swap",
});

// Data: anything that came from the dataset or the machine.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Complex Data Insights — Turn complex data into clear, defensible insight",
    template: "%s — Complex Data Insights",
  },
  description:
    "Open guides, interactive lessons, and hands-on practicals in data science, bioinformatics, and clinical data — for scientists who need analysis that survives review.",
  // An unaffiliated redesign concept that names a real person and business.
  // It should be shareable by link, not discoverable by search.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Complex Data Insights",
    description: "Turn complex data into clear, defensible insight.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${bricolage.variable} ${literata.variable} ${plexMono.variable} h-full`}
    >
      <head>
        {/* Applies the stored theme before first paint, so a dark-theme
            visitor never sees a light flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-on-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

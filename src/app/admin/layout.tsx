import type { Metadata } from "next";
import "@/styles/globals.css";

/**
 * ADMIN ROOT LAYOUT (§28 · D-050): a second root layout — the console
 * lives outside the localized public tree (utilitarian, dark, EN UI;
 * lead content renders in its own language). Never indexed.
 */
export const metadata: Metadata = {
  title: "Smart Channels — Lead Console",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" data-motion-tier="static">
      <body className="bg-bg text-ink">
        <main className="admin-shell">{children}</main>
      </body>
    </html>
  );
}

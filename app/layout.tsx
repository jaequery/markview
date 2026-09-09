import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Morgan — Software engineer",
  description: "I build useful software and the systems behind it. Product engineering, reliable backends, and a preference for keeping things simple.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

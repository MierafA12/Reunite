import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Missing Finder - Reunite Families",
    description: "A community-driven platform to report missing people and reunite families.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}

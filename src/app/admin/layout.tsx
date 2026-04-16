import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Hub (demo) — Let's go baby®",
  description:
    "Backoffice de demonstração para gestão de reservas e lista de interesse.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

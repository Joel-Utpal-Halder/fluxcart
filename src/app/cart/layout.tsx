// Role: Provides metadata for cart page (Server Component)

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | FluxCart",
  description: "Review your items, update quantities, and proceed to checkout.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
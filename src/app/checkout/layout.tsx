// Role: Provides metadata for checkout page (Server Component)

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | FluxCart",
  description: "Complete your purchase securely. Enter shipping details and payment information.",
  robots: {
    index: false, // Prevent search engines from indexing checkout page
    follow: true,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
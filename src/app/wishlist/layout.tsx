// Role: Provides metadata for wishlist page (Server Component)

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | FluxCart",
  description: "View and manage your saved items. Add to cart or remove from wishlist.",
  robots: {
    index: false, // Prevent search engines from indexing wishlist page
    follow: true,
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
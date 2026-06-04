"use client";

import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">

          <Link
            href="/"
            className="text-xl font-bold"
          >
            FluxCart
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
          </nav>

        </div>
      </Container>
    </header>
  );
}
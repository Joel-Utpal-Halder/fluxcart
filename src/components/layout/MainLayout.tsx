// File: src/components/layout/MainLayout.tsx
// Role: Reusable page wrapper with Navbar, Footer, and Toast notifications

import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "./Container";
import { ToastContainer } from "@/components/ui/ToastContainer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
}
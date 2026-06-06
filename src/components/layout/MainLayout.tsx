// File: src/components/layout/MainLayout.tsx

import Navbar from "./Navbar";
import Footer from "./Footer";
import Container from "./Container";

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
    </div>
  );
}
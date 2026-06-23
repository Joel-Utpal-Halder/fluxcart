// Role: Reusable page wrapper with Navbar, Footer, Toast notifications, and page transitions

"use client";

import { motion } from "framer-motion";
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
          {/* Page transition animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}
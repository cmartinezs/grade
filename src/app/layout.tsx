import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Grade Question Bank - Web App",
  description: "Banco de preguntas para evaluaciones académicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="d-flex flex-column min-vh-100">
        <AuthProvider>
          <main className="flex-grow-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

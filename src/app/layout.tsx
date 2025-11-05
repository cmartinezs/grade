import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: "GRADE: Generación y Registro Automatizado De Evaluaciones - Web App",
  description: "Banco de preguntas para evaluaciones académicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <LoadingProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}

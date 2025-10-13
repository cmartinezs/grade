import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '@/contexts/AuthContext';

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
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

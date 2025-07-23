
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

import "../app/globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
      <AuthProvider>
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

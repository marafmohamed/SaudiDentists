import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./Context/index"; // import the AppProvider
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export const metadata: Metadata = {
  title: "saudi dentists",
  description: "your way to know all the dentists in saudi arabia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}

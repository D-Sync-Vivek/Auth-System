import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Auth System",
  description: "Practicing auth system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-animate">
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}

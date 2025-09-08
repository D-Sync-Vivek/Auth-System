import "./globals.css";

export const metadata = {
  title: "Auth System",
  description: "Practicing auth system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

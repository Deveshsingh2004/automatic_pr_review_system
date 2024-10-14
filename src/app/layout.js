// layout.js
import "./globals.css";
import ClientSessionProvider from "./Components/ClientSessionProvider";

export const metadata = {
  title: "Automatic PR Review",
  description: "Automatically review pull requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}

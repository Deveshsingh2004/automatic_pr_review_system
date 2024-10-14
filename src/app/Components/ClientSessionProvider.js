"use client"; // Ensure this runs on the client-side

import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

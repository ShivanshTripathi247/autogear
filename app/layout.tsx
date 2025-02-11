
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
  import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "sonner";

const dmSans = DM_Sans({  subsets: ["latin"],});



export const metadata: Metadata = {
  title: "AutoGear",
  description: "Automates your needs for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <html lang="en">
          <body className={dmSans.className}>
          
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider>
              {children}
              <Toaster/>
              </ModalProvider>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>

  );
}

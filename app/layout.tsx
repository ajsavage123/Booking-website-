import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediCare Clinic — Book Your Appointment",
  description:
    "Book appointments online with MediCare Clinic. Fast, easy scheduling for General Checkup, Consultation, Emergency, and more.",
  keywords: "clinic, appointment booking, healthcare, doctor, medical",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

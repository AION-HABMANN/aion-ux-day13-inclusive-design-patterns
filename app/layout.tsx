import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AION UX · Module 6 · Inclusive Design Patterns',
  description:
    'Learning playground for neurodiversity in UX: learn the eight categories, practise spotting barriers, and analyse four frozen assessment cases.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

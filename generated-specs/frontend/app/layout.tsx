import type { ReactNode } from 'react';

export const metadata = { title: "Orquestación de Pedidos Event-Driven en NestJS y Renderizado Next.js" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

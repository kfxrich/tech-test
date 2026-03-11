import './globals.css';

export const metadata = {
  title: 'Task Manager - Next.js',
  description: 'Task Manager built with Next.js 14 - Full-stack React framework',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}

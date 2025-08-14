import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lanky First Ideal Creativity - Graphic Design Class',
  description: 'Join our comprehensive graphic design class via Telegram',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
          {children}
        </div>
      </body>
    </html>
  );
}
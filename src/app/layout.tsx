import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: '설날 명절 선물 쇼핑몰 🧧',
  description: '마음을 전하는 설날 명절 선물, 특별한 분들께 정성을 담아 보내세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-cream">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {children}
        </main>
        <footer className="bg-primary-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold-300 text-lg mb-2">🧧 새해 복 많이 받으세요! 🧧</p>
            <p className="text-primary-200 text-sm">
              © 2025 설날 명절 선물 쇼핑몰. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

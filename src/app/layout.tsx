import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: '설날 선물 | Gift Mall',
  description: '마음을 전하는 설날 명절 선물, 특별한 분들께 정성을 담아 보내세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl min-h-[calc(100vh-200px)]">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-100 py-12 mt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🎁</span>
                </div>
                <div>
                  <span className="font-bold text-gray-900">설날 선물</span>
                  <span className="text-gray-400 ml-2">Gift Mall</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-rose-500 font-medium mb-1">새해 복 많이 받으세요!</p>
                <p className="text-gray-400 text-sm">
                  © 2026 설날 선물 쇼핑몰. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

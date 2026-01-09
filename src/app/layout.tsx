import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: '설날선물 | Curated Gift Collection',
  description: '2026 설날, 소중한 분들께 특별한 선물을 전하세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#FAFAF8]">
        <Header />
        <main>
          {children}
        </main>
        <footer className="bg-[#FAFAF8] py-16 mt-8">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase">
                © 2026 설날선물
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

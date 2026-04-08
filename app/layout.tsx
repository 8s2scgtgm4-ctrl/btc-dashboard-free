import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BTC 監視ダッシュボード（無料版）',
  description: 'Mempool.spaceを使ったBTCアドレス監視ツール',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}

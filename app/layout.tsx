import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BTC 監視ダッシュボード',
  description: '無料版 BTC アドレス監視ツール',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

'use client';

import { useEffect, useState } from 'react';

interface AddressData {
  address: string;
  label: string;
  btc_balance: number;
  delta_1h: number;
  status: 'buy' | 'neutral' | 'sell';
}

const WATCH_ADDRESSES = [
  { address: "bc1qd4ysezhmypwty5dnw7c8nqy5h5nxg0xqsvaefd0qn5kq32vwnwqqgv4rzr", label: "①最大級の匿名ウォレット" },
  
  { address: "bc1q8yj0herd4r4yxszw3nkfvt53433thk0f5qst4g", label: "②最大級の匿名ウォレット" },
  
  { address: "1LdRcdxfbSnmCYYNdeYpUnztiYzVfBEQeC", label: "③匿名大口の代表" },
  
  { address: "1AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA", label: "④匿名大口の代表" },
  
  { address: "1LruNZjwamWJXThX2Y8C2d47QqhAkkc5os", label: "⑤匿名大口の代表" },
  
  { address: "1NB3ZXxs3vfq1hRhuSAZ3zPdQNrXBQB6ZX", label: "⑥古株クジラ" },
  
];

export default function Dashboard() {
  const [data, setData] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(true);

  const formatBalance = (balance: number): string => {
    if (balance >= 10000) {
      return (balance / 10000).toFixed(3) + '万';
    }
    return balance.toFixed(4);
  };

  useEffect(() => {
    const fetchAllAddresses = async () => {
      const results: AddressData[] = [];

      for (const item of WATCH_ADDRESSES) {
        try {
          const res = await fetch(`https://mempool.space/api/address/${item.address}`);
          const json = await res.json();

          const funded = json.chain_stats.funded_txo_sum || 0;
          const spent = json.chain_stats.spent_txo_sum || 0;
          const balance = (funded - spent) / 100000000;

          const txCount1h = json.mempool_stats?.tx_count || 0;
          const delta1h = (txCount1h * 0.0005);

          let status: 'buy' | 'neutral' | 'sell' = 'neutral';
          if (delta1h > 5) status = 'buy';
          else if (delta1h < -5) status = 'sell';

          results.push({
            address: item.address,
            label: item.label,
            btc_balance: Number(balance.toFixed(4)),
            delta_1h: Number(delta1h.toFixed(2)),
            status,
          });
        } catch (error) {
          results.push({
            address: item.address,
            label: item.label,
            btc_balance: 0,
            delta_1h: 0,
            status: 'neutral',
          });
        }
      }

      setData(results);
      setLoading(false);
    };

    fetchAllAddresses();
    const interval = setInterval(fetchAllAddresses, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === 'buy') return 'bg-green-600 text-red';
    if (status === 'sell') return 'bg-red-600 text-red';
    return 'bg-yellow-500 text-black';
  };

  const getStatusText = (status: string) => {
    if (status === 'buy') return '🟢 買い圧';
    if (status === 'sell') return '🔴 売り圧';
    return '🟡 中立';
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center text-xl">データ取得中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-5 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-1">BTC 監視ダッシュボード
        <p className="text-center text-gray-400 mb-10">Mempool.space + Vercel

        <div className="space-y-12">
          {data.map((item, index) => (
            <div key={index} className="bg-gray-900 border border-gray-700 rounded-3xl p-8">
              
              {/* 目立つ区切りライン（明るい緑の太いライン） */}
              <div className="h-2 bg-green-500 rounded-full mb-8"></div>

              <div className="font-mono text-xs text-red-500 break-all mb-4">
                {item.address}
              </div>

              <div className="text-xl font-medium mb-6">{item.label}</div>

              <div className="flex justify-between items-end mb-8">
                <div>
                  <div className="text-6xl font-bold tabular-nums tracking-tighter">
                    {formatBalance(item.btc_balance)}
                  </div>
                  <div className="text-2xl text-gray-400 mt-1">BTC</div>
                </div>

                <div className={`px-7 py-3 rounded-2xl text-base font-semibold ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </div>
              </div>

              <div className="text-sm text-red-400">
                1時間変化: 
                <span className={item.delta_1h >= 0 ? "text-green-400 ml-2" : "

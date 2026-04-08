'use client';

interface AddressData {
  address: string;
  label: string;
  btc_balance: number;
  delta_24h: number;
  status: 'buy' | 'neutral' | 'sell';
}

export default function Dashboard() {
  const addresses: AddressData[] = [
    {
      address: "bc1qd4ysezhmypwty5dnw7c8nqy5h5nxg0xqsvaefd0qn5kq32vwnwqqgv4rzr",
      label: "①最大級の匿名ウォレット",
      btc_balance: 0, // 後でMempoolから取得
      delta_24h: 0,
      status: "neutral"
    },
    {
      address: "bc1q8yj0herd4r4yxszw3nkfvt53433thk0f5qst4g",
      label: "②最大級の匿名ウォレット",
      btc_balance: 0,
      delta_24h: 0,
      status: "neutral"
    },
    {
      address: "1LdRcdxfbSnmCYYNdeYpUnztiYzVfBEQeC",
      label: "③匿名大口の代表",
      btc_balance: 0,
      delta_24h: 0,
      status: "neutral"
    },
    {
      address: "1AC4fMwgY8j9onSbXEWeH6Zan8QGMSdmtA",
      label: "④匿名大口の代表",
      btc_balance: 0,
      delta_24h: 0,
      status: "neutral"
    },
    {
      address: "1LruNZjwamWJXThX2Y8C2d47QqhAkkc5os",
      label: "⑤匿名大口の代表",
      btc_balance: 0,
      delta_24h: 0,
      status: "neutral"
    },
    {
      address: "1NB3ZXxs3vfq1hRhuSAZ3zPdQNrXBQB6ZX",
      label: "⑥古株クジラ",
      btc_balance: 0,
      delta_24h: 0,
      status: "neutral"
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === "buy") return "bg-green-600 text-white";
    if (status === "sell") return "bg-red-600 text-white";
    return "bg-yellow-500 text-black";
  };

  const getStatusText = (status: string) => {
    if (status === "buy") return "🟢 買い圧";
    if (status === "sell") return "🔴 売り圧";
    return "🟡 中立";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">BTC 監視ダッシュボード</h1>
        <p className="text-center text-gray-400 mb-10">Mempool.space + Vercel 無料版</p>

        <div className="space-y-6">
          {addresses.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-900 border border-gray-700 rounded-3xl p-6 dashboard-card"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-mono text-xs text-gray-500 break-all mb-1">
                    {item.address}
                  </div>
                  <div className="text-lg font-medium">{item.label}</div>
                </div>
                
                <div className={`px-6 py-2 rounded-full text-sm font-semibold ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <div className="text-5xl font-bold tabular-nums">
                  {item.btc_balance.toFixed(4)}
                </div>
                <div className="text-xl text-gray-400">BTC</div>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                24時間変化: 
                <span className={item.delta_24h >= 0 ? "text-green-400" : "text-red-400"}>
                  {item.delta_24h >= 0 ? '+' : ''}{item.delta_24h.toFixed(2)} BTC
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-gray-500 mt-12">
          Mempool.space + Vercel 無料版 • iPhone SE3対応
        </div>
      </div>
    </div>
  );
}

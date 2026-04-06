'use client';

export default function Dashboard() {
  const addresses = [
    { address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", label: "サトシ・ジェネシス", btc_balance: 1.2345, delta_24h: 0.15, status: "buy" },
    { address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", label: "テストアドレス2", btc_balance: 0.8765, delta_24h: -0.23, status: "sell" },
    { address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", label: "テストアドレス3", btc_balance: 2.3456, delta_24h: 0.05, status: "neutral" },
    // ここにあなたの実際の6アドレスを後で追加できます
  ];

  const getStatusColor = (status: string) => {
    if (status === "buy") return "bg-green-600";
    if (status === "sell") return "bg-red-600";
    return "bg-yellow-500";
  };

  const getStatusText = (status: string) => {
    if (status === "buy") return "🟢 買い圧";
    if (status === "sell") return "🔴 売り圧";
    return "🟡 中立";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8">BTC 監視ダッシュボード</h1>
      
      <div className="space-y-4">
        {addresses.map((item, index) => (
          <div key={index} className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
            <div className="font-mono text-sm text-gray-400 mb-1 break-all">
              {item.address}
            </div>
            <div className="text-lg font-medium mb-3">{item.label}</div>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-4xl font-bold">{item.btc_balance.toFixed(4)}</div>
                <div className="text-sm text-gray-400">BTC</div>
              </div>
              
              <div className={`px-5 py-2 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                {getStatusText(item.status)}
              </div>
            </div>
            
            <div className="mt-4 text-sm">
              24時間変化: 
              <span className={item.delta_24h >= 0 ? "text-green-400" : "text-red-400"}>
                {item.delta_24h >= 0 ? "+" : ""}{item.delta_24h.toFixed(2)} BTC
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-12">
        Mempool.space + Vercel 無料版 • iPhone対応
      </p>
    </div>
  );
}

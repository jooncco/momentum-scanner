import React, { useEffect, useState } from "react";
import "./App.css";
import { formatFloat } from "./utils/formatter";

// Dummy data generator for tickers
type Ticker = {
  medal: string;
  ticker: string;
  price: string;
  pctChange: string;
  volPctChange: string;
  float: string;
};

const generateDummyTickers = (): Ticker[] => [
  {
    medal: "🥇",
    ticker: "BTCUSDT",
    price: (1000000 + Math.random() * 1000000).toFixed(2),
    pctChange: (Math.random() * 10 - 5).toFixed(2),
    volPctChange: (Math.random() * 20 - 10).toFixed(2),
    float: (Math.random() * 100000).toFixed(0),
  },
  {
    medal: "🥈",
    ticker: "ETHUSDT",
    price: (2000 + Math.random() * 100).toFixed(2),
    pctChange: (Math.random() * 10 - 5).toFixed(2),
    volPctChange: (Math.random() * 20 - 10).toFixed(2),
    float: (Math.random() * 100000).toFixed(0),
  },
  {
    medal: "🥉",
    ticker: "BNBUSDT",
    price: (300 + Math.random() * 20).toFixed(2),
    pctChange: (Math.random() * 10 - 5).toFixed(2),
    volPctChange: (Math.random() * 20 - 10).toFixed(2),
    float: (Math.random() * 100000).toFixed(0),
  },
  { medal: "🥉", ticker: "SOLUSDT", price: (100 + Math.random() * 10).toFixed(2), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "XRPUSDT", price: (0.5 + Math.random() * 0.2).toFixed(4), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "ADAUSDT", price: (0.3 + Math.random() * 0.1).toFixed(4), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "DOGEUSDT", price: (0.08 + Math.random() * 0.02).toFixed(4), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "MATICUSDT", price: (1 + Math.random() * 0.2).toFixed(4), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "DOTUSDT", price: (5 + Math.random() * 1).toFixed(2), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "LTCUSDT", price: (80 + Math.random() * 10).toFixed(2), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "TRXUSDT", price: (0.07 + Math.random() * 0.01).toFixed(4), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "AVAXUSDT", price: (15 + Math.random() * 2).toFixed(2), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "SHIBUSDT", price: (0.00001 + Math.random() * 0.000001).toFixed(8), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "UNIUSDT", price: (6 + Math.random() * 1).toFixed(2), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "LINKUSDT", price: (7 + Math.random() * 1).toFixed(2), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
  { medal: "🥉", ticker: "ATOMUSDT", price: (10 + Math.random() * 2).toFixed(2), pctChange: (Math.random() * 10 - 5).toFixed(2), volPctChange: (Math.random() * 20 - 10).toFixed(2), float: (Math.random() * 100000).toFixed(0) },
];

function TickerTable({ tickers, selectedTicker, onSelect }: { tickers: Ticker[], selectedTicker: string, onSelect: (ticker: string) => void }) {
  return (
    <table className="tickerTable">
      <thead>
        <tr>
          <th>Medal</th>
          <th>Ticker</th>
          <th>Price ($)</th>
          <th>Price Change</th>
          <th>Volume Change</th>
          <th>Float</th>
        </tr>
      </thead>
      <tbody>
        {tickers.map((t: Ticker, i: number) => {
          const pctChangeNum = parseFloat(t.pctChange);
          const volPctChangeNum = parseFloat(t.volPctChange);
          const isSelected = t.ticker === selectedTicker;
          return (
            <tr
              key={i}
              onClick={() => onSelect(t.ticker)}
              style={{
                cursor: 'pointer',
                background: isSelected ? '#1a1530' : undefined,
                fontWeight: isSelected ? 700 : undefined,
                outline: isSelected ? `2px solid #5a189a` : undefined,
              }}
            >
              <td>{t.medal}</td>
              <td>{t.ticker}</td>
              <td>{t.price}</td>
              <td style={{ color: pctChangeNum > 0 ? '#3fe47a' : pctChangeNum < 0 ? '#ff4b6e' : undefined }}>
                {t.pctChange}%
              </td>
              <td style={{ color: volPctChangeNum > 0 ? '#3fe47a' : volPctChangeNum < 0 ? '#ff4b6e' : undefined }}>
                {t.volPctChange}%
              </td>
              <td>{formatFloat(Number(t.float))}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ChartTiles({ ticker }: { ticker: string }) {
  const timeframes = ['1m', '5m', '1h', '1d'];
  return (
    <div className="cyberTileGrid">
      {timeframes.map((tf) => (
        <div key={tf} className="cyberTile">
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1em', marginBottom: 8 }}>{tf}</div>
            <div>Chart for {ticker} [{tf}]</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string>('BTCUSDT');

  useEffect(() => {
    // Generate initial tickers on mount
    const newTickers = generateDummyTickers();
    setTickers(newTickers);
    setSelectedTicker(newTickers[0]?.ticker || 'BTCUSDT');
  }, []);

  useEffect(() => {
    if (tickers.length === 0) return;
    const interval = setInterval(() => {
      const updatedTickers = generateDummyTickers();
      setTickers(updatedTickers);
      // If the selected ticker is not in the new list, reset to first
      if (!updatedTickers.some(t => t.ticker === selectedTicker)) {
        setSelectedTicker(updatedTickers[0]?.ticker || 'BTCUSDT');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedTicker, tickers.length]);

  useEffect(() => {
    // Add Orbitron font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="App">
      <div style={{ display: 'flex', flex: 1, gap: '4px', width: '100%', height: '100%' }}>
        <div style={{ flex: 1, overflow: "auto", background: "rgba(20,0,40,0.85)", borderRadius: "16px", boxShadow: "0 2px 12px #0004", padding: "16px", display: 'flex', flexDirection: 'column' }}>
          <h2>Tickers</h2>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="tickerTableWrapper">
              <TickerTable tickers={tickers} selectedTicker={selectedTicker} onSelect={setSelectedTicker} />
            </div>
          </div>
        </div>
        <div style={{ flex: 2, minWidth: 0, background: "rgba(20,0,40,0.85)", borderRadius: "16px", boxShadow: "0 2px 12px #0004", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2>Charts</h2>
          <ChartTiles ticker={selectedTicker} />
        </div>
      </div>
    </div>
  );
}

export default App;

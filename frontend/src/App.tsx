import React, { useEffect, useState } from "react";
import "./App.css";
import { TickerTable } from "./components/TickerTable";
import { ChartTiles } from "./components/ChartTiles";
import { generateDummyTickers } from "./utils/tickerData";
import type { Ticker } from "./components/TickerTable";

function App() {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string>("BTCUSDT");

  useEffect(() => {
    // Generate initial tickers on mount
    const newTickers = generateDummyTickers();
    setTickers(newTickers);
    setSelectedTicker(newTickers[0]?.ticker || "BTCUSDT");
  }, []);

  useEffect(() => {
    if (tickers.length === 0) return;
    const interval = setInterval(() => {
      const updatedTickers = generateDummyTickers();
      setTickers(updatedTickers);
      // If the selected ticker is not in the new list, reset to first
      if (!updatedTickers.some((t) => t.ticker === selectedTicker)) {
        setSelectedTicker(updatedTickers[0]?.ticker || "BTCUSDT");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedTicker, tickers.length]);

  useEffect(() => {
    // Add Orbitron font
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "4px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: "auto",
            background: "rgba(20,0,40,0.85)",
            borderRadius: "16px",
            boxShadow: "0 2px 12px #0004",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Tickers</h2>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="tickerTableWrapper">
              <TickerTable
                tickers={tickers}
                selectedTicker={selectedTicker}
                onSelect={setSelectedTicker}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 2,
            minWidth: 0,
            background: "rgba(20,0,40,0.85)",
            borderRadius: "16px",
            boxShadow: "0 2px 12px #0004",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2>Charts</h2>
          <ChartTiles ticker={selectedTicker} />
        </div>
      </div>
    </div>
  );
}

export default App;

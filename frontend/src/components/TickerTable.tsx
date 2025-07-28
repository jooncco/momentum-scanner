import React from "react";
import { formatFloat } from "../utils/formatter";

// Dummy data generator for tickers
export type Ticker = {
  medal: string;
  ticker: string;
  price: string;
  pctChange: string;
  volPctChange: string;
  float: string;
};

interface TickerTableProps {
  tickers: Ticker[];
  selectedTicker: string;
  onSelect: (ticker: string) => void;
}

export function TickerTable({
  tickers,
  selectedTicker,
  onSelect,
}: TickerTableProps) {
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
                cursor: "pointer",
                background: isSelected ? "#1a1530" : undefined,
                fontWeight: isSelected ? 700 : undefined,
                outline: isSelected ? `2px solid #5a189a` : undefined,
              }}
            >
              <td>{t.medal}</td>
              <td>{t.ticker}</td>
              <td>{t.price}</td>
              <td
                style={{
                  color:
                    pctChangeNum > 0
                      ? "#3fe47a"
                      : pctChangeNum < 0
                      ? "#ff4b6e"
                      : undefined,
                }}
              >
                {t.pctChange}%
              </td>
              <td
                style={{
                  color:
                    volPctChangeNum > 0
                      ? "#3fe47a"
                      : volPctChangeNum < 0
                      ? "#ff4b6e"
                      : undefined,
                }}
              >
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

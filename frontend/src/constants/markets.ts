export const MARKET_SYMBOLS: { [key: string]: string } = {
  Binance: "BINANCE",
  Bybit: "BYBIT",
  OKX: "OKX",
  Upbit: "UPBIT",
} as const;

export const DEFAULT_MARKET = "BYBIT";

export type MarketName = keyof typeof MARKET_SYMBOLS;

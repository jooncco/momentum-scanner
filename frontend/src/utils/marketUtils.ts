import { MARKET_SYMBOLS, DEFAULT_MARKET } from "../constants/markets";

/**
 * Maps market names to TradingView exchange symbols
 * @param marketName - The market name to map
 * @returns The corresponding TradingView exchange symbol
 */
export function getMarketSymbol(marketName: string): string {
  return MARKET_SYMBOLS[marketName] || DEFAULT_MARKET;
}

export function getTickerSymbol(marketSymbol: string, ticker: string): string {
  if (marketSymbol === MARKET_SYMBOLS.Upbit) {
    return ticker + "KRW";
  } else {
    return ticker + "USDT.P";
  }
}

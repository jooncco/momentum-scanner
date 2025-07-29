import { getMarketSymbol, getTickerSymbol } from "../utils/marketUtils";

interface ChartTilesProps {
  ticker: string;
  market: string;
}

export function ChartTiles({ ticker, market }: ChartTilesProps) {
  const timeframes = [
    { label: "1m", interval: "1" },
    { label: "5m", interval: "5" },
    { label: "1h", interval: "60" },
    { label: "1d", interval: "D" },
  ];

  const marketSymbol = getMarketSymbol(market);
  const tickerSymbol = getTickerSymbol(marketSymbol, ticker);

  return (
    <div className="cyberTileGrid">
      {timeframes.map((tf) => (
        <div key={tf.label} className="cyberTile">
          <iframe
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${ticker}_${tf.label}&symbol=${marketSymbol}:${tickerSymbol}&interval=${tf.interval}&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=Asia%2FSeoul&enable_publishing=0&withdateranges=1&hide_top_toolbar=0&hide_legend=0&show_popup_button=1&popup_width=1000&popup_height=650&referral_id=12345`}
            width="100%"
            height="100%"
            allowFullScreen
            title={`${ticker} ${tf.label} Chart - ${market}`}
            style={{ pointerEvents: "auto", border: "none" }}
          />
        </div>
      ))}
    </div>
  );
}

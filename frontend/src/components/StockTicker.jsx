import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StockTicker.css";

const STOCKS = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA"];
const API_KEY = "99362db3bb6147fb9b0bfe36fca0f751"; // replace this

const StockTicker = () => {
  const [stockData, setStockData] = useState([]);

  const fetchStockQuotes = async () => {
    const results = await Promise.all(
      STOCKS.map(async (symbol) => {
        try {
          const res = await axios.get(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
          );
          const { price, percent_change } = res.data;
          return {
            symbol,
            price,
            percent_change,
            isUp: parseFloat(percent_change) >= 0,
          };
        } catch (error) {
          console.error(`Error fetching ${symbol}`, error);
          return {
            symbol,
            price: "N/A",
            percent_change: "N/A",
            isUp: null,
          };
        }
      })
    );
    setStockData(results);
  };

  useEffect(() => {
    fetchStockQuotes();
    const interval = setInterval(fetchStockQuotes, 60000); // update every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stock-ticker">
      <div className="ticker-track">
        {stockData.map((stock) => (
          <div key={stock.symbol} className="ticker-item">
            <strong>{stock.symbol}</strong>: ${stock.price}{" "}
            <span
              style={{
                color: stock.isUp ? "lightgreen" : "salmon",
                marginLeft: "8px",
              }}
            >
              {stock.isUp ? "🔺" : "🔻"} {stock.percent_change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;

// StockPrices.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = ' M2X5NCVKZRCNVFQL'; // Replace with your Alpha Vantage API key
const STOCKS = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA']; // Add your desired stock symbols

const StockPrices = () => {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);

  const fetchStockPrices = async () => {
    try {
      const promises = STOCKS.map((stock) =>
        axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol: stock,
            interval: '1min',
            apikey: API_KEY,
          },
        })
      );

      const results = await Promise.all(promises);
      const stockPrices = {};

      results.forEach((result, index) => {
        const timeSeries = result.data['Time Series (1min)'];

        // Check if timeSeries is valid
        if (timeSeries && Object.keys(timeSeries).length > 0) {
          const latestTime = Object.keys(timeSeries)[0];
          stockPrices[STOCKS[index]] = timeSeries[latestTime]['1. open']; // Get the latest stock price
        } else {
          console.warn(`No data for stock: ${STOCKS[index]}`);
          stockPrices[STOCKS[index]] = 'N/A'; // Set price to N/A if no data
        }
      });

      setPrices(stockPrices);
    } catch (err) {
      setError('Error fetching stock prices');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 3600000); // Refresh every hour (3600000 ms)
    
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 shadow-lg rounded-lg flex justify-between items-center">
      {error && <p className="text-red-500">{error}</p>}
      {Object.entries(prices).length > 0 ? (
        <div className="flex space-x-4">
          {Object.entries(prices).map(([stock, price]) => (
            <div key={stock} className="flex flex-col items-center">
              <span className="font-bold">{stock}</span>
              <span className="text-lg">${price}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockPrices;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";

const INDICES = [
  { symbol: "^NSEI", name: "Nifty 50" },
  { symbol: "^BSESN", name: "Sensex" },
  { symbol: "^IXIC", name: "NASDAQ" },
  { symbol: "^GSPC", name: "S&P 500" },
  { symbol: "^DJI", name: "Dow Jones" },
];

const API_KEY = "YOUR_TWELVE_DATA_API_KEY"; // Replace with your actual key

const MarketIndexCards = () => {
  const [data, setData] = useState([]);

  const fetchIndices = async () => {
    const results = await Promise.all(
      INDICES.map(async ({ symbol, name }) => {
        try {
          const res = await axios.get(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
          );
          const { price, percent_change } = res.data;
          return {
            name,
            price,
            percent_change,
            isUp: parseFloat(percent_change) >= 0,
          };
        } catch (err) {
          console.error(`Error fetching ${name}`, err);
          return { name, price: "N/A", percent_change: "N/A", isUp: null };
        }
      })
    );
    setData(results);
  };

  useEffect(() => {
    fetchIndices();
    const interval = setInterval(fetchIndices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Row className="mb-3">
      {data.map((index, idx) => (
        <Col key={idx} sm={12} md={6} lg={4}>
          <Card
            bg={index.isUp ? "success" : "danger"}
            text="white"
            className="mb-3 shadow-sm"
          >
            <Card.Body>
              <Card.Title>{index.name}</Card.Title>
              <Card.Text>
                {index.price !== "N/A" ? (
                  <>
                    <strong>{index.price}</strong>
                    <br />
                    {index.isUp ? "🔺" : "🔻"} {index.percent_change}%
                  </>
                ) : (
                  <>Data unavailable</>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MarketIndexCards;


import React, { useState, useEffect } from "react";

const AlphaV = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=5min&month=2023-12&outputsize=full&apikey=RRPEO57UMEFG3CX3'); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array ensures the effect runs once after the initial render
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    return (
      <div>
        <button onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Data'}
        </button>
        {data && (
          <div>
            <h2>Trade Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  export default AlphaV;
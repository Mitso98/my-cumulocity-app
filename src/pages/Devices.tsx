import React, { useEffect, useState } from 'react';
import client from '../services/cumulocityClient';

const DeviceData: React.FC<{}> = ( ) => {
  const [dataPoints, setDataPoints] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDataPoints = async () => {
    try {
      // Fetch the last 10 measurements from the device
      const { data } = await client.measurement.list({
        source: { id: 8330427589 },
        pageSize: 10,
        // You can also filter by specific data point types if needed
      });
      setDataPoints(data);
    } catch (error) {
      setError('Error fetching data points');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchDataPoints, 5000); // Poll every 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Device Data for {8330427589}</h1>
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {dataPoints.map((point) => (
          <li key={point.id} className="p-2 border-b border-gray-200">
            Time: {point.timestamp}, Value: {point.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceData;

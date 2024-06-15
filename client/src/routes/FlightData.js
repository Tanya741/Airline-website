// src/FlightData.js
import React, { useState } from 'react';

const FlightData = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [adult, setAdult] = useState(1);
  const [type, setType] = useState('economy');
  const [currency, setCurrency] = useState('USD');

  const fetchFlights = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'deabe7c6b4msh36caa60313712c6p1c5e3bjsn084440484c16',
        'x-rapidapi-host': 'flight-fare-search.p.rapidapi.com'
      }
    };

    try {
      setLoading(true);
      const response = await fetch(`https://flight-fare-search.p.rapidapi.com/v2/flights/?from=${from}&to=${to}&date=${date}&adult=${adult}&type=${type}&currency=${currency}`, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setFlights(data.results); // Assuming the data has a `flights` array
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  return (
    <div>
      <h1>Flight Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From: </label>
          <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} required />
        </div>
        <div>
          <label>To: </label>
          <input type="text" value={to} onChange={(e) => setTo(e.target.value)} required />
        </div>
        <div>
          <label>Date: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Adults: </label>
          <input type="number" value={adult} onChange={(e) => setAdult(e.target.value)} min="1" required />
        </div>
        <div>
          <label>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div>
          <label>Currency: </label>
          <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
        </div>
        <button type="submit">Search Flights</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <p>Flight Name: {flight.flight_name}</p>
            <p>Departure:</p>
            <p>Arrival:</p>
            <p>Price: {flight.totals.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightData;

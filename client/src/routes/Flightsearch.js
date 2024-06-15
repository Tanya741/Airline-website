import React from 'react'
import Search from '../components/Search'
import { useLocation } from 'react-router-dom';
import './Flight.css'
const Flightsearch = () => {
    const location = useLocation();
    const { state } = location;
    
    // console.log(state);
  return (
    <>
    <div>
     <Search />
        </div>
        <section className='fd-main'>
    <div className='prices'>
        {/* Add content specific to .prices if needed */}
    </div>

    {state && state.length > 0 ? (
        <div>
            {state.map((flight, index) => (
                <div key={index} className='fds'>
                    <p>From: {flight.origin}</p>
                    <p>To: {flight.destination}</p>
                    <p>Airline: {flight.airline}</p>
                    <p>Departure Time: {new Date(flight.departure_time).toLocaleString()}</p>
                    <p>Arrival Time: {new Date(flight.arrival_time).toLocaleString()}</p>
                    <p>Status: {flight.status}</p>
                </div>
            ))}
        </div>
    ) : (
        <p className='no-data'>No flight data available.</p>
    )}
`</section>

    </>

  )
}

export default Flightsearch

import React, { useState } from 'react';
import Search from '../components/Search';
import { useLocation } from 'react-router-dom';
import './Flight.css';
import axios from 'axios';

const Flightsearch = () => {
    const location = useLocation();
    const { state } = location;
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleBooking = async (flight) => {
        const id = flight 
        const date = flight.departure_time;
        const airLine = flight.airline;
        const email = localStorage.getItem("email");
        
        console.log(email, date, airLine);

        try {
            setModalMessage("Flight booked successfully!");
            setShowModal(true);
            const res = await axios.post("http://localhost:8000/booking", { email, airLine, date });

        } catch (error) {
            console.error("Booking error:", error);
            setModalMessage("Failed to book flight. Please try again.");
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
    };

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
                    <div className='flight-container'>
                        {state.map((flight, index) => (
                            <div key={index} className='flight-card'>
                                <div className='flight-info'>
                                    <p><strong>From:</strong> {flight.origin}</p>
                                    <p><strong>To:</strong> {flight.destination}</p>
                                    <p><strong>Airline:</strong> {flight.airline}</p>
                                    <p><strong>Departure Time:</strong> {new Date(flight.departure_time).toLocaleString()}</p>
                                    <p><strong>Arrival Time:</strong> {new Date(flight.arrival_time).toLocaleString()}</p>
                                    <p><strong>Status:</strong> {flight.status}</p>
                                </div>
                                <button className='book-button' onClick={() => handleBooking(flight)}>
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='no-data'>No flight data available.</p>
                )}

                {showModal && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <span className='close' onClick={closeModal}>&times;</span>
                            <p>{modalMessage}</p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Flightsearch;

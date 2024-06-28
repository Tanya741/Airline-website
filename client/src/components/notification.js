import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './nav.css';

import './notification.css'; 




const NotificationModal = ({ show, onClose }) => {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);




  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        const email = localStorage.getItem("email");

        const response = await axios.post('http://localhost:8000/myFlights', { email });

        setData(response.data);

      } catch (err) {

        setError('Failed to fetch notifications');

      } finally {

        setLoading(false);

      }

    };




    if (show) {

      fetchNotifications();

    }

  }, [show]);




  return (

    <div className={`notification-modal ${show ? 'show' : ''}`}>

      <div className="notification-modal-content">

        <div className="notification-modal-header">

          <h2>Notifications</h2>

          <span className="close" onClick={onClose}>&times;</span>

        </div>

        <div className="notification-list">

          {loading && <p>Loading notifications...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && !error && data.length === 0 && <p>No notifications found.</p>}

          {!loading && !error && (

            <div className="notification-items">

              {data.map((notification, index) => (

                <div key={index} className="notification-item">

                  <p><strong>Booked At:</strong> {notification.bookedAt}</p>

                  <p><strong>Flight Date:</strong> {notification.flight_date}</p>

                  <p><strong>Airline:</strong> {notification.airLine}</p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};




export default NotificationModal;


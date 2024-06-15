import './search.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [tripType, setTripType] = useState('one-way');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [classType, setClassType] = useState('First Class');
    const [Error ,setError] =useState(false);
    const [loading, setload]=useState(false);
    const [data1 ,setDate]=useState([]);

    const handleSearch = async  () => {
        // console.log({ from, to, departureDate, returnDate, classType });
        setload(true);
        const postData = { from, to };

      
        const response =await axios.post('http://localhost:8000/find', {from, to} )
        setload(false);
        console.log(response.data);
        if( response.data == "ERROR"){
            setError(true);
        }else{
            // setDate(respo);
            console.log(response.data);
            const data2=response.data;
            // setDate(response.data);
            navigate('/FlightResult', {state : [...data2]});
        }
    };
    return (
        <>
        <div className="search-container">
            <div className="search-upper">
                <div className="search-options">
                    <button
                        className={tripType === 'one-way' ? 'active' : ''}
                        onClick={() => setTripType('one-way')}
                    >
                        One Way
                    </button>
                    <button
                        className={tripType === 'round-trip' ? 'active' : ''}
                        onClick={() => setTripType('round-trip')}
                    >
                        Round Trip
                    </button>
                </div>
                <div className="customer-support">
                    <p>24*7 customer support</p>
                </div>
            </div>
            <div className="search-lower">
                <div className="from">
                    <label>From</label>
                    <input
                        type="text"
                        placeholder="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div className="to">
                    <label>To</label>
                    <input
                        type="text"
                        placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <div className="departure-date">
                    <label>Departure</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </div>
                {tripType === 'round-trip' && (
                    <div className="return-date">
                        <label>Return</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>
                )}
                <div className="class-selection">
                    <label>Travellers and Class</label>
                    <select value={classType} onChange={(e) => setClassType(e.target.value)}>
                        <option>First Class</option>
                        <option>Business Class</option>
                        <option>Economy Class</option>
                    </select>
                </div>
                <div onClick={handleSearch} className="search-button">
                   
                        
                        <a >Search</a>
                 
                    {/* <a onClick={handleSearch} href='/FlightResult'></a> */}
                </div>
            </div>
            <div className="special-fares">
                <p>Special Fares</p>
                <button>Student</button>
                <button>Senior Citizen</button>
                <button>Military</button>
            </div>
        </div>
        {loading && <div>Loading...</div>}
        {Error && <div>Error: There is no flight you are looking for....</div>}
        </>
    );
}
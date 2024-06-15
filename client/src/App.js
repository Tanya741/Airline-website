import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search2 from './routes/search';
import Navbar from './components/Navbar';
import Flightsearch from './routes/Flightsearch';

function App() {
  return (
    <>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Search" element={<Search2 />} />
          <Route path="/FlightResult" element={<Flightsearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

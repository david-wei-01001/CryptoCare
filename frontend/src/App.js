import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Charities from './components/Charities/Charities';
import Wallet from './components/Wallet/Wallet';


import './App.css';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/charities" element={<Charities />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;

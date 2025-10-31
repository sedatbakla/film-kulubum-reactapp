import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ShowDetail from './components/ShowDetail';
import Footer from './components/Footer';
import './App.css'; // Stil dosyasını import edelim

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
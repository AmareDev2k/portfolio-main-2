import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SummitBlockDoc from './pages/SummitBlockDoc';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summit-block/doc" element={<SummitBlockDoc />} />
          <Route path="/summit-block" element={<Navigate to="/summit-block/doc" replace />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
    </div>
  );
}

export default App;
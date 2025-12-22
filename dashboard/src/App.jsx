import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import ThreatLogs from './pages/ThreatLogs';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/logs" element={<ThreatLogs />} />
        <Route path="/models" element={<Placeholder title="Model Registry" />} />
        <Route path="/access" element={<Placeholder title="Access Control" />} />
        <Route path="/settings" element={<Placeholder title="Settings" />} />
      </Routes>
    </Router>
  )
}

export default App

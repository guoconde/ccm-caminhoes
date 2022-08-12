import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Plans />} /> */}
          {/* <Route path='/checkout' element={<Checkout />} /> */}
          {/* <Route path='/success' element={<SuccessPage />} /> */}
          {/* <Route path='/unauthorized' element={<UnauthorizedPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/css/globalStyle';
import ClientForm from './pages/form';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<ClientForm />} />
          {/* <Route path='/checkout' element={<Checkout />} /> */}
          {/* <Route path='/success' element={<SuccessPage />} /> */}
          {/* <Route path='/unauthorized' element={<UnauthorizedPage />} /> */}
        </Routes>
      </Router>
    </>
  );
}

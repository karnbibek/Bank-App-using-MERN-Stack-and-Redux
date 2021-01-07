import React from 'react';

import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

const App = ({ children }) => {
  return (
    <div>
      <Navbar />
      <h1 style={{textAlign:"center"}}>React Development Bank</h1>
      {children}
      <Footer />
    </div>
  )
};

export default App;
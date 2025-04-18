import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/common/Navbar"; 
import Footer from "./components/common/Footer";
import Front from "./components/Front"; 
import About from "./components/About";
import Shop from "./components/shop"; 
import News from "./components/News"; 
import Contact from "./components/Contact"; 

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

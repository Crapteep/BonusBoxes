import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';
import About from './pages/About';
import MyNavbar from './components/Navbar';
import PostInfo from './pages/PostInfo/PostInfo';
import Footer from './components/Footer';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <MyNavbar />
    <div className='container'>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path='posts/:id' element={<PostInfo/>} />
          <Route path="*" element={<NoPage />} />
      </Routes>
      
      
    </div>

    <Footer />
    </>
  );
}

export default App;

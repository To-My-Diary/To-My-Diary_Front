import React from 'react';
import './App.css';
import mainPage from './pages/mainPage/main';
import LoginPage from './pages/loginPage/login';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<mainPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

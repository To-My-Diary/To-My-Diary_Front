import React from 'react';
import './App.css';
import MainPage from './pages/mainPage/main';
import LoginPage from './pages/loginPage/login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LoginPage />}></Route>
        <Route path='/main' element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

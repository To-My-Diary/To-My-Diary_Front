import React, { useEffect } from 'react';
import './App.css';
import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import 'swiper/css';
import SignUpPage from 'pages/SignupPage';

//vh 조절 함수
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}

window.addEventListener('resize', () => setScreenSize());

function App() {

  useEffect(() => {
    setScreenSize();
  }); //처음 마운트될때 값을 계산하도록 함수를 호출한다

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/main/*' element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

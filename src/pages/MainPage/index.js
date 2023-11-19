import React from 'react';
import './index.css';
import WorkSpace from './WorkSpace'
import Calender from './Calender';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { mode } from "lib/constants/constant_value";
import axios from 'axios';

//vh 조절 함수
function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
  }
  
  window.addEventListener('resize', () => setScreenSize());

// 문서의 본문
function Article() {
  let contents = null;
  const edit = useSelector(state=>state.workSpace.edit)
  const currentMode = useSelector((state)=>(state.workSpace.currentMode))
  // 현재 페이지 라우트 경로 정보 (ToMyGoal 경우, 편집모드일때도 ScheduleSpace가 사라지면 안되기 때문에 조건문에 사용!)

  // 편집모드일 경우 ScheduleSpace 제거 (목표페이지일 경우 제외)
  if(edit && currentMode !== mode.GOAL)
  {
    contents = <article>
      <WorkSpace/>
    </article>
  }
  else
  {
    contents = <article>
      <Calender/>
      <WorkSpace/>
    </article>
  }

  return (
    <>
      {contents}
    </>
  )
}

function MainPage() {
  const [response, setResponse] = useState('')

// useEffect(() => {
//   axios.get('/calendar/goal/2023/8') //http://172.16.101.2:8080
//     .then(res => {
//       console.log(res)
//       // console.log({response})
//       setResponse(res)
//       console.log('-------------')
//     })
//   .catch(error => console.log(error))
// }, []);

  return (
    <div className="mainPage">
      <Article/>
    </div>
  );
}

export default MainPage;

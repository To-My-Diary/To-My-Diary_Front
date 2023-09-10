import React from 'react';
import './MainPage.css';
import WorkSpace from '../../components/workSpace/WorkSpace'
import ScheduleSpace from '../../components/scheduleSpace/ScheduleSpace';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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

  // 편집모드일 경우 ScheduleSpace 제거
  if(edit)
  {
    contents = <article>
      <WorkSpace/>
    </article>
  }
  else
  {
    contents = <article>
      <ScheduleSpace/>
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

useEffect(() => {
  axios.get('/calendar/goal/2023/8') //http://172.16.101.2:8080
    .then(res => {
      console.log(res)
      // console.log({response})
      setResponse(res)
      console.log('-------------')
    })
  .catch(error => console.log(error))
}, []);

  return (
    <div className="mainPage">
      <Article/>
    </div>
  );
}

export default MainPage;

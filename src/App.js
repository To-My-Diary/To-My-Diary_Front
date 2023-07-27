import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import WorkSpace from './components/workSpace/WorkSpace';
import ScheduleSpace from './components/scheduleSpace/ScheduleSpace';

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

function App() {

  useEffect(() => {
    setScreenSize();
  }); //처음 마운트될때 값을 계산하도록 함수를 호출한다

  return (
    <div className="App">
      <Article/>
    </div>
  );
}

export default App;

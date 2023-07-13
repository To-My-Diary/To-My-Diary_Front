import React from 'react';
import './App.css';
import WorkSpace from './components/workSpace/WorkSpace';
import ScheduleSpace from './components/scheduleSpace/ScheduleSpace';
import { useSelector } from 'react-redux';

// 문서의 제목/도입부
function Header() {
  return (
    <header>
      <h1>To-Do-Diary</h1>
    </header>
  )
}

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
  return (
    <div className="App">
      <Header/>
      <Article/>
    </div>
  );
}

export default App;

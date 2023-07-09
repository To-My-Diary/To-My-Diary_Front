import React from 'react';
import './App.css';
import WorkSpace from './components/WorkSpace';
import ScheduleSpace from './components/ScheduleSpace';

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
  return (
    <article>
      <ScheduleSpace/>
      <WorkSpace/>
    </article>
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

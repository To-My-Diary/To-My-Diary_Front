import React from 'react';
import './main.css';
import WorkSpace from '../../components/workSpace/WorkSpace'
import ScheduleSpace from '../../components/scheduleSpace/ScheduleSpace';
import { useSelector } from 'react-redux';
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
  return (
    <div className="mainPage">
      <Article/>
    </div>
  );
}

export default MainPage;

import React from 'react';
import './MainPage.css';
import WorkSpace from '../../components/workSpace/WorkSpace'
import ScheduleSpace from '../../components/scheduleSpace/ScheduleSpace';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  axios.get('http://172.16.101.2:8080/calendar/goal/2023/8')
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

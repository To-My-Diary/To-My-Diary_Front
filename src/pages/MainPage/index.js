import React from 'react';
import './index.css';
import WorkSpace from './WorkSpace'
import Calender from './Calender';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mode } from "lib/constants/constant_value";
import { getCookie, removeCookie } from 'lib/api/cookie';
import { useNavigate } from 'react-router-dom';
import logoutImage from 'assets/icons/logout.png';


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
  if(edit && currentMode === mode.DIARY)
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
  const navigate = useNavigate()
  async function onLogout()
  {
      try {
          removeCookie('token')
          navigate("/"); // 로그인 완료 시, main페이지로 이동
        } catch (error) {
          console.error(error);
        }
  }

// TODO: 백엔드랑 통신테스트할때만 활성화
useEffect(() => {
      if (getCookie('token')== null) {
        navigate('/')
      }
    });

  return (
    <div className="mainPage">
          <img id="logout" src={logoutImage} alt="로그아웃" onClick={onLogout}></img>
      <Article/>
    </div>
  );
}

export default MainPage;

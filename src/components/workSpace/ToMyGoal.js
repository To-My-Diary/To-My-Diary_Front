import { useDispatch, useSelector } from "react-redux";
import './ToMyGoal.css'
import diaryLogo from '../../icons/일기 작성.png'
import Weather from "./Weather";
import { useState, useEffect } from "react";
import axios from 'axios';
import { changeEdit, addItem, deleteItem  } from './workSpaceSlice';

// (날짜 선택 시, 해당 날짜에) 설정한 목표 조회
function ToDoView()
{
    const date = useSelector((state)=>(state.workSpace.date));

    return(
        <div id='goalWrapper' style={{backgroundImage: `url(${process.env.PUBLIC_URL + 'images/paperBackground.png'})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',}}>
        <Weather/>
        <h3 className="workSpaceTitle">TO MY GOAL</h3>
        <h3>{date}</h3>
        {/* 여기서 설정 목표가 1. 없으면 다이어리 로고 2. 있으면 DB에서 꺼내와서 메인 목표 리스트 보여주기 */}
        {/* -? <GoalNull/> : <GoalExist/> */}
        </div>
    )
}
// 로고 클릭하면 첫 목표 추가 화면 _ 피그마 2번째 페이지
function GoalNull()
{
    return <img id="diaryImg" src={diaryLogo} alt="목표 작성"/>;
}

function GoalExist()
{
    return(
        <div>
        <h3>Goal</h3>
        <hr className="horizonLine"></hr>
        </div>
    )
}

// 목표 추가 (메인 및 상세 목표)
function ToDoEdit()
{

}

function ToMyGoal()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    return (
        <div className = "ToMyGoal"
        onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            // if(!edit){
            //     dispatch(changeEdit());
            // }
        }}>
            <ToDoView/>
        </div>
    )
}
export default ToMyGoal;
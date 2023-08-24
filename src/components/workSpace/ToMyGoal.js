import { useDispatch, useSelector } from "react-redux";
import './ToMyGoal.css'
import diaryLogo from '../../icons/일기 작성.png'
import Weather from "./Weather";
import { useState, useEffect } from "react";
import axios from 'axios';
import { changeEdit, addItem, deleteItem  } from './workSpaceSlice';

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
        <img id="diaryImg" src={diaryLogo} alt="목표 작성"/>
        </div>
    )
}

// function ToDoEdit()
// {
// }

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
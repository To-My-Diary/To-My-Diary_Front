import { useDispatch, useSelector } from "react-redux";
import './ToMyGoal.css'
import diaryLogo from '../../icons/일기 작성.png'
import trashImage from '../../icons/쓰레기통 1.png'
import plusImage from '../../icons/플러스2 1.png';
import buttonImage from '../../icons/체크1 2.png';
import { BsSquare, BsFillCircleFill } from 'react-icons/bs';
import Weather from "./Weather";
import { useState, useEffect } from "react";
import axios from 'axios';
import { changeEdit, addItem, deleteItem  } from './workSpaceSlice';

// (날짜 선택 시, 해당 날짜에) 설정한 목표 조회
function ToDoView()
{
    return(
        // <div id='goalWrapper' style={{backgroundImage: `url(${process.env.PUBLIC_URL + 'images/paperBackground.png'})`,
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',}}>
        // <Weather/>
        // <h3 className="workSpaceTitle">TO MY GOAL</h3>
        // <h3>{date}</h3>
        <div>
        {/* 여기서 설정 목표가 1. 없으면 다이어리 로고 2. 있으면 DB에서 꺼내와서 메인 목표 리스트 보여주기 */}
        {/* -? <GoalNull/> : <GoalExist/> */}
        {/* <GoalExist/> */}
        <GoalNull/>
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
        <div className="goalList">
        <>
        <BsSquare/>
        <h3>Goal</h3>
        <hr className="horizonLine"></hr>
        <br/>
        </>
        <h3>detailed goal</h3>
        <hr className="horizonLine"></hr>
        <br/>
        {/* for문 돌려서 id = 1 ~ 설정되어있는 목표까지 불러와서 출력 ! */}
        {/* for문 안 실행문 */}
        </div>
    )
}

// 목표 추가 (메인 및 상세 목표)
function ToDoEdit()
{
    const dispatch = useDispatch();
    const [dgoal, setDgoal] = useState('')
    const [inputs, setInputs] = useState({
        goal:"",
        detailGoal:[],
    });
    const [id, setId] = useState(1)
    // const {goal, detailGoal} = inputs;
    const onmainGoalHandler = (event) => {
        console.log(`target value ${event.target.value}`)
        setInputs((prevState) => {
            return { ...prevState, goal: event.target.value }
        }
        )
    };
    const ondetailGoalHandler = (event) => {
        console.log(`dgoal ${dgoal}`)
        setInputs((prevState) => {
            return {...prevState, detailGoal:[...prevState.detailGoal, dgoal]}
        })
    }
    

    return(
        <div className="goalList">
        <form onSubmit={(event)=>{
            event.preventDefault();
            dispatch(changeEdit());
        }}>
        {/* <BsSquare/> */} 
        {/* 조회 페이지에서만 필요한 아이콘 */}
        <p className="mainGoal">
            <text id='mainGoal'>Goal</text>
            <div>
            <input className='mainGoal-input' type='text' name='mainGoal-input' onChange={onmainGoalHandler} value={inputs.goal} />
            <hr id="mainHorizonLine"></hr>
            </div>
            <BsFillCircleFill className="colorCircle"/>
        </p> 
        <p className="detailGoal">
            <text id='detailGoal'>detailed goal</text>
            <div className="dgoalList">
            {/* <div> */}
            <text id='goalId'>{`${id}.`}</text>
            <div>
            <input className='detailGoal-input' type='text' name='detailGoal-input' onChange={ondetailGoalHandler} value={inputs.dgoal} />
            <hr id="detailHorizonLine"></hr>
            </div>
            <img className="trashImage" src={trashImage} alt="쓰레기통" onClick={()=>{}} />
            </div>
        </p>
        <img id="plusImage" src={plusImage} alt="플러스" onClick={()=>{
            }}/>
            {/* <label htmlFor="write">
                    <img id="buttonImg" src={buttonImage} alt="체크"/>
            </label> */}
        </form>
        {/* for문 돌려서 id = 1 ~ 설정되어있는 목표까지 불러와서 출력 ! */}
        {/* for문 안 실행문 */}
        </div>
    )
}

function ToMyGoal()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const date = useSelector((state)=>(state.workSpace.date));

    return (
        <div className = "ToMyGoal"
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/paperBackground.png'})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',}}
        onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            // if(!edit){
            //     dispatch(changeEdit());
            // }
        }}>
        <Weather/>
        <h3 className="workSpaceTitle">TO MY GOAL</h3>
        <h3>{date}</h3>
        <ToDoEdit/>
            {/* <ToDoView/> */}
        </div>
    )
}
export default ToMyGoal;
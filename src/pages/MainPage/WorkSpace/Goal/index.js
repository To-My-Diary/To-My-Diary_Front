import { useDispatch, useSelector } from "react-redux";
import './ToMyGoal.css'
import diaryLogo from '../../icons/일기 작성.png'
import trashImage from '../../icons/쓰레기통 1.png'
import plusImage from '../../icons/플러스2 1.png';
import buttonImage from '../../icons/체크1 2.png';
import { BsSquare, BsFillCircleFill } from 'react-icons/bs';
import { VscChromeMaximize, VscCircleLarge } from 'react-icons/vsc';
import Weather from "../../../../components/common/Weather";
import IconColorPicker from "../../../../components/goal/ColorButton";
import { useState, useEffect } from "react";
import axios from 'axios';
import { changeEdit } from '../../../../store/slices/workSpaceSlice';
import { saveGoalData } from "../../../../store/slices/dataSlice";
import { mode } from "../../../../lib/constants/constant_value"

// (날짜 선택 시, 해당 날짜에) 설정한 목표 조회
// 로컬(?)에 저장한 목표 리스트 조회 ( 체크아이콘 클릭시 이 페이지로 전환, 작성했던 목표 적혀있어야 함, 여기서는 수정 불가 _ 수정하려면 수정페이지로 모드 전환)
// 월별 메인골 보여주는 화면
function ToDoView(props)
{
    let list = [];
    let component = null;
    let key = 1;
    if(props.goalData != null && props.goalData.length > 0)
    {
        props.goalData.forEach(item=>{
            list.push(<ListMainGoal key={key++} content={item.content} color={item.color}/>)
         })
         component = <>
            {list}
         </>
    }
    else
    {
         component = <GoalNull />
    }

    return(
        <>
            {component}
      </>
        
    );
}

// 로고 클릭하면 첫 목표 추가 화면 _ 피그마 2번째 페이지
function GoalNull()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    return <img id="diaryImg" src={diaryLogo} alt="목표 작성" onClick={()=>{
        //보기 모드일 때만 div 터치 시 편집 전환
        if(!edit){
            dispatch(changeEdit());
        }
    }}/>;
}

function ListMainGoal(props)
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const [content, setContent] = useState(props.content||"");
    const [color, setColor] = useState(props.color||"");

    // goalData에서 메인 목표들을 가져와 처리합니다.
    // const mainGoals = goalData.map(item => item.content);

    // const goalList = goalData.map((goal, index) => {
    //     console.log(`Goal Content at index ${index}:`, goal.content);
        return (
            <div data-content={content} data->
                <div id="mainGoalRead">
                    <VscChromeMaximize id="checkbox"/>
                    <div id="goalText">{content}</div>
                    <VscCircleLarge id="colorbox" style={{backgroundColor: color}}/>
                </div>
                <hr id="mainGoalListHorizonLine"></hr>
                <img id="plusImage" src={plusImage} alt="플러스" onClick={() => {
                    // 보기 모드일 때만 div 터치 시 편집 전환
                    if (!edit) {
                        dispatch(changeEdit());
                    }
                }}/>
            </div>
        );
    // });
}

function ListGoal(props)
{
    const dispatch = useDispatch();
    const [msg, setMsg] = useState(props.msg||"");
    const [planDate, setPlanDate] = useState(""); // TODO: 캘린더 선택 날짜 (각 상세목표 마감기한) 적용하기
    const date = useSelector((state)=>(state.workSpace.date));
    
    return(
        <div id={"dgoalList"+props.id} className="dgoalList" style={{marginBottom:'-20px'}} data-msg={msg} data-time={date}>
        <h5 id='goalId'>{`${props.id}.`}</h5>
        <div>
        <input className='detailGoal-input' type='text' name='detailGoal-input' value={msg} onChange={(event)=>{
                    setMsg(event.target.value);}}/>
        <hr id="detailHorizonLine"></hr>
        </div>
        <img className="trashImage" src={trashImage} alt="쓰레기통" onClick={()=>{
                    let count = document.querySelectorAll(".dgoalList").length;
                    if(count > 1)
                    {
                        let item = document.querySelector("#dgoalList"+props.id);
                        item.remove();
                    }
                }} />
        </div>
    )
}

// 목표 추가 (메인 및 상세 목표)
function ToDoEdit(props)
{
    const dispatch = useDispatch();
    const [nextID, setNextID] = useState(2)
    const [list, setList] = useState([]);
    const [goal, setGoal] = useState(props.goal||"");
    const date = useSelector((state)=>(state.workSpace.date));
    const color = useSelector((state)=>(state.workSpace.color));
    useEffect(()=>{
        if (props.goalData && props.goalData.dgoalList)
        {
            setGoal(props.goalData.goal);
            let _list = []
            let key = 1;
            props.goalData.dgoalList.forEach(element => {
                if(element.msg.length > 0)
                {
                    _list.push(<ListGoal key={key} id={key} msg={element.msg}/>)
                    key++;
                }
            });
            setNextID(key);
            setList(_list);
        }
        else
        {
            setList([<ListGoal key="1" id="1"/>]);
        }
    },[props.goalData]);

    return(
        <div className="goalList">
        <form onSubmit={(event)=>{
            event.preventDefault();
            const detailData = [];
            const listGoals = document.querySelectorAll(".dgoalList");
            let id = 1;
            const mainGoalInput = event.target.elements['mainGoal-input'];
            if (mainGoalInput && mainGoalInput.value.length > 0) {
                listGoals.forEach(item => {
                    const _msg = item.getAttribute("data-msg");
                    const _planDate = item.getAttribute("data-time");
    
                    if(_msg.length > 0)
                    {
                        const detailGoals = {
                            content: _msg,
                            planDate: _planDate
                        }
                        detailData.push(detailGoals);
                    }
                })
                const data = {
                    content: goal,
                    planDate: date,
                    color: color,
                    userId: "topjoy22@naver.com",
                    detailGoal: [{detailData}]
                }
                dispatch(saveGoalData(data));
                dispatch(changeEdit());
            }
        }}>
        <div className="mainGoal">
            <h3 id='mainGoal'>Goal</h3>
            <div>
            <input className='mainGoal-input' type='text' name='mainGoal-input' value={goal} onChange={(event)=>{
                    setGoal(event.target.value);}}/>
            <hr id="mainHorizonLine"></hr>
            </div>
            <IconColorPicker/>
        </div> 
        <div className="detailGoal">
            <h3 id='detailGoal'>detailed goal</h3>
            {list}
        </div>
        <img id="plusImage" src={plusImage} alt="플러스" onClick={()=>{
                     let _list = [];
                     list.forEach(item=>{
                         _list.push(item);
                     })
                     _list.push(<ListGoal key={nextID} id={nextID}/>)
                     setList(_list);
     
                     setNextID(nextID+1);
                 }}/>
            <label htmlFor="write">
                    <img id="buttonGoalImg" src={buttonImage} alt="체크"/>
            </label>
            <input id="write" type="submit" hidden/>
        </form>
        </div>
    )
}

function ToMyGoal()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));
    const date = useSelector((state)=>(state.workSpace.date));
    const goalData = useSelector((state)=>(state.tempData.goalData));
    return (
        <div className = "ToMyGoal"
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/paperBackground.png'})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}>
        <Weather/>
        <h3 className="workSpaceTitle">TO MY GOAL</h3>
        <h3>{date}</h3>
        {edit && currentMode === mode.GOAL ? <ToDoEdit goalData={goalData}/>:<ToDoView goalData={goalData}/>}
        </div>
    )
}
export default ToMyGoal;
export {ListGoal};
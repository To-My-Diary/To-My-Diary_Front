import { useDispatch, useSelector } from "react-redux";
import { changeEdit } from './workSpaceSlice';
import { saveToDoData } from '../../tempData/dataSlice';
import './ToDoList.css';
import diaryLogo from '../../icons/일기 작성.png'
import Weather from "./Weather";
import Modal from "./Modal";
import buttonImage from '../../icons/체크1 2.png';
import plusImage from '../../icons/플러스2 1.png';
import clockImage from '../../icons/시계 2.png'
import trashImage from '../../icons/쓰레기통 1.png'
import { useState, useEffect } from "react";
import axios from 'axios';
import bootstrap from 'bootstrap';

// TO-DO 보기 화면
function ToDoView(props)
{
    const date = useSelector((state)=>(state.workSpace.date));
    let list = [];
    let content = null;
    let key = 1;


    if(props.toDoData.length === 0)
    {
        content = <>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DAY</h3>
            <h3>{date}</h3>
            <img id="diaryImg" src={diaryLogo} alt="일기 작성"/>
        </>
    }
    else
    {
         props.toDoData.forEach(item=>{
            list.push(<ListItem key={key++} msg={item.msg} achieve={item.achieve}/>)
         })
         content = <>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DAY</h3>
            <h3>{date}</h3>
            {list}
         </>
    }

    return(
        <form>
            {content}
        </form>
    )
}

function ListItem(props)
{
    const [msg, setMsg] = useState(props.msg||"");
    const [planDate, setPlanDate] = useState("");
    const [achieve, setAchieve] = useState(props.achieve||"");
    const edit = useSelector(state=>state.workSpace.edit);
    let leftSide = null;

    function checkboxClick(event)
    {
        event.stopPropagation();
        setAchieve(achieve===""?"달성":"");

        // need to post todo json
    }

    if(edit)
    {
        if(planDate!=="")
        {
            leftSide = planDate;
        }
        else
        {
            leftSide = <div style={{display:"inline-block"}}>
                <button type="button" id ={`timeButton${props.id}`} class="btn btn-primary" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal" hidden/>
                <label htmlFor={`timeButton${props.id}`}>
                    <img className="itemImage" src={clockImage} alt="시계"/>
                </label>
            </div>
        }
    }
    else
    {
        leftSide = achieve==="달성"?<input type="checkbox" checked onClick={(event)=>{checkboxClick(event);}}/>:
            <input type="checkbox" onClick={(event)=>{checkboxClick(event);}}/>
    }

    return(
        <div id={"listItem"+props.id} className="listItem" style={{marginTop:"8px", display:"flex", justifyContent:"center"}} 
        data-msg={msg} data-time={planDate} data-achieve={achieve}>
            {leftSide}
            <div style={{display:"inline-block"}}>
                <input type="text" value={msg} onChange={(event)=>{
                    setMsg(event.target.value);
                }}></input>
                <hr style={{marginTop:"3px", marginBottom:"0"}}/>
            </div>
            {
                edit?
                <img className="itemImage" src={trashImage} alt="쓰레기통" onClick={()=>{
                    let count = document.querySelectorAll(".listItem").length;
                    if(count > 1)
                    {
                        let item = document.querySelector("#listItem"+props.id);
                        item.remove();
                    }
                }}/>:null
            }
            <Modal/>
        </div>
    )
}

// TO-DO 작성 화면
function ToDoEdit(props)
{
    const [nextID, setNextID] = useState(2);
    const [list, setList] = useState([]);
    const date = useSelector((state)=>(state.workSpace.date));
    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.toDoData.length !== 0)
        {
            let _list = []
            let key = 1;
            props.toDoData.forEach(element => {
                _list.push(<ListItem key={key} id={key} msg={element.msg} achieve={element.achieve}/>)
                key++;
            });
            setNextID(key);
            setList(_list);
        }
        else
        {
            setList([<ListItem key="1" id="1"/>]);
        }
    },[])

    return (
        <form onSubmit={(event)=>{
            event.preventDefault();
            const toDoData = [];
            const listItems = document.querySelectorAll(".listItem");
            let id = 1;

            listItems.forEach(item => {
                const _msg = item.getAttribute("data-msg");
                const _planDate = item.getAttribute("data-planDate");
                const _achieve = item.getAttribute("data-achieve");

                if(_msg.length > 0)
                {
                    const schedule = {
                        scheduleId: id,
                        msg: _msg,
                        achieve: _achieve,
                        planDate: _planDate,
                        userId: "topjoy22@naver.com"
                    }
                    toDoData.push(schedule);
                }
            })
            dispatch(saveToDoData(toDoData));
            dispatch(changeEdit());
        }}>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DAY</h3>
            {list}
            <img id="plusImage" src={plusImage} alt="플러스" onClick={()=>{
                let _list = [];
                list.forEach(item=>{
                    _list.push(item);
                })
                _list.push(<ListItem key={nextID} id={nextID}/>)
                setList(_list);

                setNextID(nextID+1);
            }}/>
            <label htmlFor="write">
                    <img id="buttonImg" src={buttonImage} alt="체크"/>
            </label>
            <input id="write" type="submit" hidden/>
        </form>
    )
}


function ToDoList()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const toDoData = useSelector((state)=>(state.tempData.toDoData));

    return (
        <div className={`${edit?"toDoEdit":"toDoView"}`}
        onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            if(!edit){
                dispatch(changeEdit());
            }
        }}>
            {edit?<ToDoEdit toDoData={toDoData}/>:<ToDoView toDoData={toDoData}/>}
        </div>
    )
}

export default ToDoList;
export { ListItem };
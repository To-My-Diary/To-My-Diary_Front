import { useDispatch, useSelector } from "react-redux";
import { changeEdit, changeMode } from './workSpaceSlice';
import { saveToDoData } from '../../tempData/dataSlice';
import './ToDoList.css';
import diaryLogo from '../../icons/일기 작성.png'
import Weather from "./Weather";
import buttonImage from '../../icons/체크1 2.png';
import plusImage from '../../icons/플러스2 1.png';
import clockImage from '../../icons/시계 2.png'
import trashImage from '../../icons/쓰레기통 1.png'
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from 'axios';
import { mode } from "../../constant_value"

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
            list.push(<ListItem key={key} id={key} msg={item.msg} achieve={item.achieve} planDate={item.planDate}/>)
            key++;
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
    const [planDate, setPlanDate] = useState(props.planDate||"");
    const [achieve, setAchieve] = useState(props.achieve||"");
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const edit = useSelector(state=>state.workSpace.edit);
    let leftSide = null;
    const checkbox = <input type="checkbox" id={"checkbox"+props.id} onClick={(event)=>{checkboxClick(event);}}/>
    const checkboxDocObject = document.querySelector("#checkbox"+props.id);
    const clock = <div style={{display:"inline-block"}}>
        <img className="itemImage" src={clockImage} alt="시계" onClick={()=>setIsTimeModalOpen(true)}/>
    </div>

    useEffect(() => {
        // decide checked
        if(achieve === "달성") checkboxDocObject.checked = true;
    },[]);

    function checkboxClick(event)
    {
        event.stopPropagation();
        setAchieve(achieve===""?"달성":"");

        console.log("클릭");
        // need to post todo json
    }

    if(edit)
    {
        if(planDate!=="")
        {
            leftSide = <p style={{margin:"10px"}} onClick={()=>setIsTimeModalOpen(true)}>
                {planDate}</p>;
        }
        else
        {
            leftSide = clock;
        }
    }
    else
    {
        leftSide = checkbox;
    }

    return(
        <div id={"listItem"+props.id} className="listItem" style={{marginTop:"8px", display:"flex", justifyContent:"center"}} 
        data-msg={msg} data-plandate={planDate} data-achieve={achieve}>
            {leftSide}
            <div style={{display:"inline-block"}}>
                <input type="text" className="msgText" value={msg} onChange={(event)=>{
                    setMsg(event.target.value);
                }}></input>
                <hr id="todohorizon"/>
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
            <Modal
                isOpen={isTimeModalOpen}
                onRequestClose={() => setIsTimeModalOpen(false)} // 모달을 닫을 때 모달 상태를 변경합니다.
                contentLabel="시간 설정" // 모달에 대한 레이블
                ariaHideApp={false} // 스타일이 적용되어야 합니다.
                style={{
                    overlay: {
                        backgroundColor: " rgba(0, 0, 0, 0.4)",
                        width: "100%",
                        height: "100vh",
                        zIndex: "10",
                        position: "fixed",
                        top: "0",
                        left: "0",
                    },
                    content: {
                        width: "360px",
                        height: "180px",
                        zIndex: "150",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "10px",
                        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                        backgroundColor: "white",
                        justifyContent: "center",
                        overflow: "auto",
                        textAlign: "center"
                    },
                }}
            >
                <form onSubmit={(event)=>{
                    event.preventDefault();
                    event.stopPropagation();
                    
                    if(event.target.hour.value!==""&&event.target.minute.value!=="")
                    {
                        setPlanDate(event.target.hour.value +":"+event.target.minute.value);
                    }
                    setIsTimeModalOpen(false);
                }}>
                    <h4>시간 설정</h4>
                    <input type="number" name="hour" className="timeNum"/>:
                    <input type="number" name="minute" className="timeNum"/>
                    <p><input type="submit" value="확인"></input></p>
                </form>
            </Modal>
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
                _list.push(<ListItem key={key} id={key} msg={element.msg} 
                    achieve={element.achieve} planDate={element.planDate}/>)
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
                const _planDate = item.getAttribute("data-plandate");
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
            <img id="toDoPlusImage" src={plusImage} alt="플러스" onClick={()=>{
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
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));
    const toDoData = useSelector((state)=>(state.tempData.toDoData));
    return (
        <div className={`${edit?"toDoEdit":"toDoView"}`}
        onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            if(!edit){
                dispatch(changeEdit());
            }
        }}>
            {(edit && (currentMode === mode.TODO))?<ToDoEdit toDoData={toDoData}/>:<ToDoView toDoData={toDoData}/>}
        </div>
    )
}

export default ToDoList;
export { ListItem };
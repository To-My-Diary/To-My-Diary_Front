import { useDispatch, useSelector } from "react-redux";
import { changeEdit, addItem, deleteItem  } from './workSpaceSlice';
import './ToDoList.css';
import diaryLogo from '../../icons/일기 작성.png'
import Weather from "./Weather";
import buttonImage from '../../icons/체크1 2.png';
import plusImage from '../../icons/플러스2 1.png';
import clockImage from '../../icons/시계 2.png'
import trashImage from '../../icons/쓰레기통 1.png'
import { useState } from "react";

// TO-DO 보기 화면
function ToDoView()
{
    return(
        <>
        <Weather/>
        <h3 className="workSpaceTitle">TO MY DAY</h3>
        <img id="diaryImg" src={diaryLogo} alt="일기 작성"/>
        </>
    )
}

function ListItem(props)
{
    const dispatch = useDispatch();

    return(
        <div style={{marginTop:"8px"}}>
            <img className="itemImage" src={clockImage} alt="시계"/>
            <div style={{display:"inline-block"}}>
                <input type="text" ></input>
                <hr style={{marginTop:"3px"}}/>
            </div>
            <img className="itemImage" src={trashImage} alt="쓰레기통" onClick={()=>dispatch(deleteItem(props.id))}/>
        </div>
    )
}

// TO-DO 작성 화면
function ToDoEdit()
{
    const [itemID, setItemID] = useState(1);
    const listItems = useSelector((state)=>(state.workSpace.listItems));
    const dispatch = useDispatch();
    let list = [];
    for(let item of listItems)
    {
        list.push(item.content);
    }

    return (
        <form onSubmit={(event)=>{
            event.preventDefault();
            dispatch(changeEdit());
        }}>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DIARY</h3>
            {list}
            <img src={plusImage} alt="플러스" onClick={()=>{
                dispatch(addItem(itemID));
                setItemID(itemID+1);
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

    return (
        <div className={`${edit?"toDoEdit":"toDoView"}`}
        onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            if(!edit){
                dispatch(changeEdit());
            }
        }}>
            {edit?<ToDoEdit/>:<ToDoView/>}
        </div>
    )
}

export default ToDoList;
export { ListItem };
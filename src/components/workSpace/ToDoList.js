import { useDispatch, useSelector } from "react-redux";
import { changeEdit  } from './workSpaceSlice';
import './ToDoList.css';
import diaryLogo from '../../icons/일기 작성.png'
import Weather from "./Weather";
import buttonImage from '../../icons/체크1 2.png';
import { icons } from "react-icons";

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

function ListItem()
{
    return(
        <>
        <input type="checkbox"></input>
        <input type="text"></input>
        </>
    )
}

// TO-DO 작성 화면
function ToDoEdit()
{
    const dispatch = useDispatch();

    return (
        <form onSubmit={(event)=>{
            event.preventDefault();
            dispatch(changeEdit());
        }}>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DIARY</h3>
            <div style={{height:"60vh"}}>
                <ListItem/>
            </div>
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
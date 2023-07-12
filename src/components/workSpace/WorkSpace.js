/* 메인화면 아래 부분의 작업 공간 (일기, To-do 작성 등) */

import './WorkSpace.css';
import ToDoList from './ToDoList'
import Diary from './Diary';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode  } from './workSpaceSlice';

function WorkSpace() {
    const dispatch = useDispatch();
    // 작업 모드: toDoList, diary
    const mode = useSelector((state)=>{
        return state.workSpace.mode;
    });
    const buttonText = useSelector((state)=>{
        return state.workSpace.buttonText;
    })
    
    let contents = null; // 작업 공간에 표시될 컨텐츠

    if(mode === "toDoList")
    {
        contents = <ToDoList></ToDoList>
    }
    else if(mode === "diary")
    {
        contents = <Diary></Diary>
    }

    return(
        <div id="workWrapper">
            {contents}
            <button onClick={()=>{
                dispatch(changeMode());
            }}>{buttonText}</button>
        </div>
    );
}

export default WorkSpace;
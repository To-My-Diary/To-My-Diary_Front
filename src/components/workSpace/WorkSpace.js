/* 메인화면 아래 부분의 작업 공간 (일기, To-do 작성 등) */

import './WorkSpace.css';
import ToDoList from './ToDoList'
import Diary from './Diary';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode  } from './workSpaceSlice';

function WorkSpace() {
    const dispatch = useDispatch();
    // 작업 모드: toDoList, diary
    const mode = useSelector(state=>state.workSpace.mode);
    const buttonText = useSelector(state=>state.workSpace.buttonText);
    const edit = useSelector(state=>state.workSpace.edit);
    
    let contents = null; // 작업 공간에 표시될 컨텐츠
    let button = null;
    let style = null;

    if(mode === "toDoList")
    {
        contents = <ToDoList></ToDoList>
    }
    else if(mode === "diary")
    {
        contents = <Diary></Diary>
    }

    if(!edit)
    {
        button = <button onClick={()=>{
            dispatch(changeMode());
        }}>{buttonText}</button>
    }
    else
    {
        style = {height:"70vh"};
    }

    return(
        <div id="workWrapper" style={style}>
            {contents}
            {button}
        </div>
    );
}

export default WorkSpace;
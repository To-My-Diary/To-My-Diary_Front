import { useDispatch, useSelector } from "react-redux";
import { changeEdit } from 'store/slices/workSpaceSlice';
import './index.css';
import ToDoEdit from "./ToDoEdit";
import ToDoView from "./ToDoView";
import { mode } from "lib/constants/constant_value"

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
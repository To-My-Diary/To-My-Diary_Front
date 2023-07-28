import { useDispatch, useSelector } from "react-redux";
import { changeEdit  } from './workSpaceSlice';
import plusLogo from '../../icons/플러스2 1.png'

function ToDoList()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    let contents = <img src={plusLogo} alt="플러스 2 1" width="30" onClick={()=>{
        if(!edit){
            dispatch(changeEdit());
        }
    }}/>

    if(edit) //편집 모드일 경우의 레이아웃
    {
        contents = <form>
            <p>
                <input type="checkbox"></input>
                <input type="text"></input>
            </p>
            <button onClick={()=>{
                    dispatch(changeEdit());
                }}
            >cancel</button>
        </form>
    }

    return(
        <div style={{height:"75%"}}>
            <h3 className="workSpaceTitle">TO MY DAY</h3>
            {contents}
        </div>
    )
}

export default ToDoList;
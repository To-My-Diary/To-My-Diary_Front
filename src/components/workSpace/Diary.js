import { useDispatch, useSelector } from "react-redux";
import { changeEdit  } from './workSpaceSlice';
import './Diary.css';

function Diary()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    let contents;

    if(edit) //편집 모드일 경우의 레이아웃
    {
        contents = <form style={{height:"80%"}} onSubmit={(event)=>{
            event.preventDefault();
        }}>
            <p><input type="text" name="title" placeholder="title" id="title"/></p>
            <p id="textAreaP"><textarea name="body" placeholder="body"></textarea></p>
            <p>
                <input type="submit" name="write" value="write"/>
                <button onClick={()=>{
                    dispatch(changeEdit());
                }}
                >cancel</button>
            </p>
        </form>
    }
    else //보기 모드일 때의 레이아웃
    {
        contents = <div>write a diary!</div>
    }


    return (
        <div style={{height:"80%"}} onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            if(!edit){
                dispatch(changeEdit());
            }
        }}>
            <h2>Diary</h2>
            {contents}
        </div>
    )
}

export default Diary;
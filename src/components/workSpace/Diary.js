import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeEdit  } from './workSpaceSlice';
import './Diary.css';
import diaryLogo from '../../icons/일기 작성.png'
import imageLogo from '../../icons/사진4.png'

function Diary()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    let contents = <img src={diaryLogo} alt="일기 작성" width="50"/>
    let [diaryImage, setDiaryImage] = useState(null);

    if(edit) //편집 모드일 경우의 레이아웃
    {
        contents = <form style={{height:"80%"}} encType="multipart/form-data" onSubmit={(event)=>{
            event.preventDefault();
        }}>
            <div className="images">
                {diaryImage}
                <label for="chooseFile">
                    <img src={imageLogo} alt="사진4" width="40"/>
                </label>
            </div>
            <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={(event)=>{
                let file = event.target.files[0];	//선택된 파일 가져오기
                setDiaryImage(<img src={URL.createObjectURL(file)} width="50"></img>)
            }}></input>
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


    return (
        <div style={{height:"75%"}} onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            if(!edit){
                dispatch(changeEdit());
            }
        }}>
            <h3 className="workSpaceTitle">TO MY DIARY</h3>
            {contents}
        </div>
    )
}

export default Diary;
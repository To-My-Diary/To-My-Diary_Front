import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeEdit  } from './workSpaceSlice';
import Weather from "./Weather";
import './Diary.css';
import diaryLogo from '../../icons/일기 작성.png'
import imageLogo from '../../icons/사진4.png'
import buttonImage from '../../icons/완료3 2.png'

// 일기 보기 화면
function DiaryView()
{
    return (
        <>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DIARY</h3>
            <img src={diaryLogo} id="diaryImg" alt="일기 작성"/>
        </>
    )
}

//일기 작성 화면
function DiaryEdit()
{
    let [diaryImage, setDiaryImage] = useState(null);
    const dispatch = useDispatch();

    return(
        <form style={{height:"100%"}} encType="multipart/form-data" onSubmit={(event)=>{
            event.preventDefault();
            dispatch(changeEdit());
        }}>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DIARY</h3>
            <div className="images">
                {diaryImage}
                <label htmlFor="chooseFile">
                    <img src={imageLogo} alt="사진4" width="50px"/>
                </label>
            </div>
            <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={(event)=>{
                let file = event.target.files[0];	//선택된 파일 가져오기
                setDiaryImage(<img src={URL.createObjectURL(file)} width="50" alt=""></img>)
            }}></input>
            <textarea name="body" placeholder="body"></textarea>
            <p>
                <label htmlFor="write">
                    <img src={buttonImage} alt="" width="40px"/>
                </label>
                <input id="write" type="submit" name="write" value="write" hidden/>
            </p>
        </form>
    )
}


function Diary()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    return (
        <div className={`${edit?"diaryEdit":"diaryView"}`}
        onClick={()=>{
            // 보기 모드일 때만 div 터치 시 편집 전환
            if(!edit){
                dispatch(changeEdit());
            }
        }}>
            {edit?<DiaryEdit/>:<DiaryView/>}
        </div>
    )
}

export default Diary;
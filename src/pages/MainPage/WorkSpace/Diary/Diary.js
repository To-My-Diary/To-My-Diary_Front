import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeEdit } from 'store/slices/workSpaceSlice';
import DiaryView from "./DiaryView";
import DiaryEdit from "./DiaryEdit";
import './index.css';
import { mode } from "lib/constants/constant_value"
import { getDiary } from "lib/api/GetAPI";

function Diary()
{
    const edit = useSelector((state)=>(state.workSpace.edit));
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));
    const [diaryData, setDiaryData] = useState({})
    const dispatch = useDispatch();
    const [diaryStyle, setDiaryStyle] = useState(null);

    useEffect(()=>{
        getDiary(1).then(data=>setDiaryData(data));
    },[])

    return (
        <div className={`${edit?"diaryEdit":"diaryView"}` }
        style={diaryStyle}
        onClick={()=>{
            //보기 모드일 때만 이미지 터치 시 편집 전환
            if(!edit) {
                dispatch(changeEdit());
            }
        }}>
            {(edit && (currentMode === mode.DIARY))?<DiaryEdit setStyle={setDiaryStyle} diaryData={diaryData}/>:
            <DiaryView diaryData={diaryData}/>}
        </div>
    )
}

export default Diary;
import { useSelector } from "react-redux";
import { useState } from "react";
import DiaryView from "./DiaryView";
import DiaryEdit from "./DiaryEdit";
import './index.css';
import { mode } from "lib/constants/constant_value"

function Diary()
{
    const edit = useSelector((state)=>(state.workSpace.edit));
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));
    const diaryData = useSelector(state=>state.tempData.diaryData);
    const [diaryStyle, setDiaryStyle] = useState(null);
    return (
        <div className={`${edit?"diaryEdit":"diaryView"}`}
        style={diaryStyle}>
            {(edit && (currentMode === mode.DIARY))?<DiaryEdit setStyle={setDiaryStyle} diaryData={diaryData}/>:
            <DiaryView diaryData={diaryData}/>}
        </div>
    )
}

export default Diary;
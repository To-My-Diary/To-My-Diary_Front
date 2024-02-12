import './index.css';
import { useSelector, useDispatch } from "react-redux";
import { changeEdit } from 'store/slices/workSpaceSlice';
import Weather from 'components/common/Weather';
import diaryLogo from 'assets/icons/일기 작성.png'

// 일기 보기 화면
function DiaryView({diaryData})
{
    let content = null;
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    
    if(Object.keys(diaryData).length === 0) // when there is no data
    {
        content = <img src={diaryLogo} id="diaryDiaryImg" alt="일기 작성" onClick={()=>{
            //보기 모드일 때만 이미지 터치 시 편집 전환
            if(!edit) {
                dispatch(changeEdit());
            }
        }}/>;
    }
    else // when there is saved data
    {
        
        if(diaryData.img.length === 0) // when there is no image
        {
            content = <div>
                <textarea value={diaryData.content} readOnly/>
            </div>
        } 
        else 
        {
            content = <div>
                <div className="images">
                    {diaryData.img.map((data, index)=>{
                        <img src={data} key={index}></img>
                    })}
                </div>
                <textarea value={diaryData.content} readOnly/>
            </div>
        }
    }

    return (
        <>
        <Weather/>
        <h3 className="workSpaceTitle">TO MY DIARY</h3>
        {content}
        </>
    )
}

export default DiaryView;
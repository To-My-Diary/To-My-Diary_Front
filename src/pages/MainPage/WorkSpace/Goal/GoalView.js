import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import diaryLogo from 'assets/icons/일기 작성.png';
import { VscChromeMaximize, VscCircleLarge } from 'react-icons/vsc';
import { request } from 'lib/api/api_type';
import { changeEdit } from 'store/slices/workSpaceSlice';
import plusImage from 'assets/icons/플러스2 1.png';
import trashImage from 'assets/icons/쓰레기통 1.png';

function GoalView(props)
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const [showList, setShowList] = useState([]);
    let list = [];
    let component = null;
    let key = 1;
    const goalList = useSelector((state) => state.tempData.goalData);
    if(goalList != null && goalList.length > 0)
    {
        goalList.forEach(item=>{
            console.log(item)
                    list.push(<ListMainGoal key={key++} content={item.content} color={item.color} id={item.goalId}/>)
                 });
                //  setShowList(list)
                //  component = <>
                //     {showList}
                //     <img id="view-plusImage" src={plusImage} alt="플러스" onClick={() => {
                //     // 보기 모드일 때만 div 터치 시 편집 전환
                //     if (!edit) {
                //         dispatch(changeEdit());
                //     }
                // }}/>
                //  </>
    }
    else
    {
         component = <GoalNull />
    }

    return(
        <>
            {component}
      </>
        
    );
}

// 로고 클릭하면 첫 목표 추가 화면 _ 피그마 2번째 페이지
function GoalNull()
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));

    return <img id="diaryImg" src={diaryLogo} alt="목표 작성" onClick={()=>{
        //보기 모드일 때만 div 터치 시 편집 전환
        if(!edit){
            dispatch(changeEdit());
        }
    }}/>;
}

function ListMainGoal(props)
{
    const [content, setContent] = useState(props.content||"");
    const [color, setColor] = useState(props.color||"");
    const options = {
        method: 'POST',
      };
    async function onDeleteHandler(id)
    {
      {
        request(`/goal/delete/${id}`, options)
        .then((data) => {
	        console.log("data", data);
        })
        .catch ((error) => alert(error.message));
      }
    }
        return (
            <div data-content={content} data->
                <div id="mainGoalRead">
                    <VscChromeMaximize id="checkbox"/>
                    <div>{props.id}</div>
                    <div id="goalText">{content}</div>
                    <div id="colorbox-trash-container">
                    <VscCircleLarge id="colorbox" style={{backgroundColor: color}}/>
                    <img
          className="view-trashImage"
          src={trashImage}
          alt="쓰레기통"
          onClick={() => onDeleteHandler(props.id)}
        /></div>
                </div>
                <hr id="mainGoalListHorizonLine"></hr>
            </div>
        );
}
export default GoalView;
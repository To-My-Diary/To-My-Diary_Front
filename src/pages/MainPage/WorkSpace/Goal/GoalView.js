import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import diaryLogo from 'assets/icons/일기 작성.png';
import { VscChromeMaximize, VscCircleLarge } from 'react-icons/vsc';
import { request } from 'lib/api/api_type';
import { changeEdit } from 'store/slices/workSpaceSlice';
import plusImage from 'assets/icons/플러스2 1.png';
// import { request } from "lib/api/api_type";

function GoalView(props)
{
    let list = [];
    let component = null;
    let key = 1;
    const date = useSelector((state)=>(state.workSpace.date));
    const year = date.slice(0, 4); // "2023"
const month = date.slice(5, 7); // "12"
    // const options = {
    //     method: 'GET',
    //   };
    // async function onSubmitHandler()
    // {
    //     try {
    //         const data = await request(`/goal/${year}/${month}`, options); // 원하는 API 엔드포인트 경로를 전달
    //         console.log(data); // API 응답 데이터 출력 또는 다른 작업 수행

    //       dispatch(changeEdit);
    //       } catch (error) {
    //         console.error(error);
    //       }
    // }
    if(props.goalData != null && props.goalData.length > 0)
    {
        props.goalData.forEach(item=>{
            list.push(<ListMainGoal key={key++} content={item.content} color={item.color}/>)
         })
         component = <>
            {list}
         </>
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
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const [content, setContent] = useState(props.content||"");
    const [color, setColor] = useState(props.color||"");

    // goalData에서 메인 목표들을 가져와 처리합니다.
    // const mainGoals = goalData.map(item => item.content);

    // const goalList = goalData.map((goal, index) => {
    //     console.log(`Goal Content at index ${index}:`, goal.content);
        return (
            <div data-content={content} data->
                <div id="mainGoalRead">
                    <VscChromeMaximize id="checkbox"/>
                    <div id="goalText">{content}</div>
                    <VscCircleLarge id="colorbox" style={{backgroundColor: color}}/>
                </div>
                <hr id="mainGoalListHorizonLine"></hr>
                <img id="plusImage" src={plusImage} alt="플러스" onClick={() => {
                    // 보기 모드일 때만 div 터치 시 편집 전환
                    if (!edit) {
                        dispatch(changeEdit());
                    }
                }}/>
            </div>
        );
    // });
}
export default GoalView;
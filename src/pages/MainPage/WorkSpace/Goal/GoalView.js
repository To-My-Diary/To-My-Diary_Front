import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import diaryLogo from 'assets/icons/일기 작성.png';
import { VscChromeMaximize, VscCircleLarge } from 'react-icons/vsc';
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { request } from 'lib/api/api_type';
import { changeEdit } from 'store/slices/workSpaceSlice';
import plusImage from 'assets/icons/플러스2 1.png';
import trashImage from 'assets/icons/쓰레기통 1.png';
import { saveGoalData } from "store/slices/dataSlice";

function GoalView(props)
{
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const [showList, setShowList] = useState([]);
    const goalList = useSelector((state) => state.tempData.goalData);

    useEffect(() => {
        if (goalList != null && goalList.length > 0) {
          const newList = goalList.map(item => (
            <ListMainGoal key={item.goalId} content={item.content} color={item.color} id={item.goalId} />
          ));
      
          setShowList(newList);
        } else {
          setShowList([]);
        }
      }, [goalList, edit]);
      
      return (
        goalList != null && goalList.length > 0 ?
        <>
          {showList}
          <img
            id="view-plusImage"
            src={plusImage}
            alt="플러스"
            onClick={() => {
              if (!edit) {
                dispatch(changeEdit());
              }
            }}
          />
        </>
        : <GoalNull/>
      );

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
    const [isSelected, setIsSelected] = useState(false);
    const date = useSelector((state)=>(state.workSpace.date));
    const options_p = {
        method: 'POST',
      };
      const options_g = {
        method: 'GET',
      };
    async function onDeleteHandler(id)
    {
      {
        request(`/goal/delete/${id}`, options_p)
        .then((data) => {
          onMainGoalListView();
        })
        .catch ((error) => alert(error.message));
      }
    }
    async function onMainGoalListView()
    {
      const year = date.substring(0, 4)
      const month = date.substring(5, 7)
        const data = request(`/goal/${year}/${month}`, options_g)
        console.log(`data`, data)
        data.then((result) => {
          dispatch(saveGoalData(result))
        })
        .catch ((error) => alert(error.message));
    }
    function onCheckboxClickHandler() 
    {
      setIsSelected(!isSelected);
    }
        return (
            <div data-content={content} data->
                <div id="mainGoalRead">
                  <button className="checkboxButton" onClick={onCheckboxClickHandler}>
                  {isSelected ? <GrCheckboxSelected id="checkbox" style={{backgroundColor: "#FFEA61D2"}}/> : <GrCheckbox id="checkbox" />}
                    </button>
                    <div id="goalText" style={isSelected? {color: "dimgray", textDecorationLine: 'line-through', textDecorationThickness: "1px"}:{}}>{content}</div>
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
}
export default GoalView;
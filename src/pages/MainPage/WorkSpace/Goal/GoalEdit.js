import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import trashImage from 'assets/icons/쓰레기통 1.png';
import plusImage from 'assets/icons/플러스2 1.png';
import buttonImage from 'assets/icons/체크1 2.png';
import IconColorPicker from "components/goal/ColorButton";
import { request } from 'lib/api/api_type';
import { saveGoalData } from "store/slices/dataSlice";
import { changeEdit } from 'store/slices/workSpaceSlice';
import { getCookie } from "lib/api/cookie";

// 목표 추가 (메인 및 상세 목표)
function GoalEdit(props)
{
    const dispatch = useDispatch();
    const [nextID, setNextID] = useState(2)
    const [list, setList] = useState([]);
    const [goal, setGoal] = useState(props.goal||"");
    const date = useSelector((state)=>(state.workSpace.date));
    const color = useSelector((state)=>(state.workSpace.color));
    const edit = useSelector((state)=>(state.workSpace.edit));
    const options = {
        method: 'POST',
        body: JSON.stringify({ content: goal, planDate: date, color: color}), // TODO 상세목표도 같이 전달하기
        
      };
    async function onSubmitHandler()
    {
      {
        request("/save/goal", options)
        .then((data) => {
	        console.log("data", data);
          dispatch(changeEdit);
        })
        .catch ((error) => alert(error.message));
      }
    }
    useEffect(() => {
        if (props.goalData && props.goalData.dgoalList) {
          setGoal(props.goalData.goal);
      
          // goalData.dgoalList 배열을 기반으로 리스트 생성
          const newList = props.goalData.dgoalList.map((element, index) => (
            <ListGoal key={index + 1} id={index + 1} msg={element.msg} />
          ));
      
          // 새로운 리스트로 업데이트
          setList(newList);
        } else {
          setList([<ListGoal key="1" id="1" />]);
        }
      }, [props.goalData]);

    return(
        <div className="goalList">
        <form onSubmit={(event)=>{
            event.preventDefault();
            const detailData = [];
            const listGoals = document.querySelectorAll(".dgoalList");
            let id = 1;
            const mainGoalInput = event.target.elements['mainGoal-input'];
            if (mainGoalInput && mainGoalInput.value.length > 0) {
                listGoals.forEach(item => {
                    const _msg = item.getAttribute("data-msg");
                    const _planDate = item.getAttribute("data-time");
    
                    if(_msg.length > 0)
                    {
                        const detailGoals = {
                            content: _msg,
                            planDate: _planDate
                        }
                        detailData.push(detailGoals);
                    }
                })
                const data = {
                    content: goal,
                    planDate: date,
                    color: color,
                    userId: "topjoy22@naver.com",
                    detailGoal: [{detailData}]
                }
                // dispatch(saveGoalData(data));
                onSubmitHandler(data);
                dispatch(changeEdit());
            }
        }}>
        <div className="mainGoal">
            <h3 id='mainGoal'>Goal</h3>
            <div>
            <input className='mainGoal-input' type='text' name='mainGoal-input' value={goal} onChange={(event)=>{
                    setGoal(event.target.value);}}/>
            <hr id="mainHorizonLine"></hr>
            </div>
            <IconColorPicker/>
        </div> 
        <div className="detailGoal">
            <h3 id='detailGoal'>detailed goal</h3>
            {list}
        </div>
        <img id="edit-plusImage" src={plusImage} alt="플러스" onClick={()=>{
                     let _list = [];
                     list.forEach(item=>{
                         _list.push(item);
                     })
                     _list.push(<ListGoal key={nextID} id={nextID}/>)
                     setList(_list);
     
                     setNextID(nextID+1);
                 }}/>
            <label htmlFor="write">
                    <img id="buttonGoalImg" src={buttonImage} alt="체크"/>
            </label>
            <input id="write" type="submit" hidden/>
        </form>
        </div>
    )
}

function ListGoal(props) {
    const dispatch = useDispatch();
    const [msg, setMsg] = useState(props.msg || "");
    const [planDate, setPlanDate] = useState("");
    const date = useSelector((state) => state.workSpace.date);
  
    // FIXME: 삭제 시, 나머지 골 id 수정 필요
    const handleDelete = () => {
      let count = document.querySelectorAll(".dgoalList").length;
      if (count >= 1) {
        // 현재 요소 삭제
        let item = document.querySelector("#dgoalList" + props.id);
        if (item) {
          item.remove();
  
          // 삭제된 요소 다음에 있는 모든 요소의 id를 앞당겨서 조정
          for (let i = props.id + 1; i <= count; i++) {
            let nextItem = document.querySelector("#dgoalList" + i);
            if (nextItem) {
              nextItem.id = "dgoalList" + (i - 1);
            }
          }
        }
      }
    };
  
    return (
      <div
        id={"dgoalList" + props.id}
        className="dgoalList"
        style={{ marginBottom: "-20px" }}
        data-msg={msg}
        data-time={date}
      >
        <h5 id="goalId">{`${props.id}.`}</h5>
        <div>
          <input
            className="detailGoal-input"
            type="text"
            name="detailGoal-input"
            value={msg}
            onChange={(event) => {
              setMsg(event.target.value);
            }}
          />
          <hr id="detailHorizonLine"></hr>
        </div>
        <img
          className="edit-trashImage"
          src={trashImage}
          alt="쓰레기통"
          onClick={handleDelete}
        />
      </div>
    );
  }

export default GoalEdit;
export {ListGoal};
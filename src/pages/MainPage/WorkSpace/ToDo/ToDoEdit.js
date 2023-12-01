import { useDispatch, useSelector } from "react-redux";
import { changeEdit } from 'store/slices/workSpaceSlice';
import { saveToDoData } from 'store/slices/dataSlice';
import './index.css';
import Weather from "components/common/Weather";
import ListItem from "./ListItem";
import buttonImage from 'assets/icons/체크1 2.png';
import plusImage from 'assets/icons/플러스2 1.png';
import { useState, useEffect } from "react";

// TO-DO 작성 화면
function ToDoEdit(props)
{
    const [nextID, setNextID] = useState(2);
    const [list, setList] = useState([]);
    const date = useSelector((state)=>(state.workSpace.date));
    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.toDoData.length !== 0)
        {
            let _list = []
            let key = 1;
            props.toDoData.forEach(element => {
                _list.push(<ListItem key={key} id={key} msg={element.msg} 
                    achieve={element.achieve} planDate={element.planDate}/>)
                key++;
            });
            setNextID(key);
            setList(_list);
        }
        else
        {
            setList([<ListItem key="1" id="1"/>]);
        }
    },[])

    return (
        <form onSubmit={(event)=>{
            event.preventDefault();
            const toDoData = [];
            const listItems = document.querySelectorAll(".listItem");
            let id = 1;

            listItems.forEach(item => {
                const _msg = item.getAttribute("data-msg");
                const _planDate = item.getAttribute("data-plandate");
                const _achieve = item.getAttribute("data-achieve");

                if(_msg.length > 0)
                {
                    const schedule = {
                        scheduleId: id,
                        msg: _msg,
                        achieve: _achieve,
                        planDate: _planDate,
                        userId: "topjoy22@naver.com"
                    }
                    toDoData.push(schedule);
                }
            })
            dispatch(saveToDoData(toDoData));
            dispatch(changeEdit());
        }}>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DAY</h3>
            {list}
            <img id="toDoPlusImage" src={plusImage} alt="플러스" onClick={()=>{
                let _list = [];
                list.forEach(item=>{
                    _list.push(item);
                })
                _list.push(<ListItem key={nextID} id={nextID}/>)
                setList(_list);

                setNextID(nextID+1);
            }}/>
            <label htmlFor="write">
                    <img id="buttonImg" src={buttonImage} alt="체크"/>
            </label>
            <input id="write" type="submit" hidden/>
        </form>
    )
}

export default ToDoEdit;
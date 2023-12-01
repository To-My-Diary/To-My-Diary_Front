import { useSelector } from "react-redux";
import './index.css';
import ListItem from "./ListItem";
import diaryLogo from 'assets/icons/일기 작성.png'
import Weather from "components/common/Weather";

// TO-DO 보기 화면
function ToDoView(props)
{
    const date = useSelector((state)=>(state.workSpace.date));
    let list = [];
    let content = null;
    let key = 1;


    if(props.toDoData.length === 0)
    {
        content = <>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DAY</h3>
            <h3>{date}</h3>
            <img id="diaryImg" src={diaryLogo} alt="일기 작성"/>
        </>
    }
    else
    {
         props.toDoData.forEach(item=>{
            list.push(<ListItem key={key} id={key} msg={item.msg} achieve={item.achieve} planDate={item.planDate}/>)
            key++;
        })
         content = <>
            <Weather/>
            <h3 className="workSpaceTitle">TO MY DAY</h3>
            <h3>{date}</h3>
            {list}
         </>
    }

    return(
        <form>
            {content}
        </form>
    )
}

export default ToDoView;
import { useSelector } from "react-redux";
import './index.css';
import GoalEdit from "./GoalEdit";
import GoalView from "./GoalView";
import Weather from "components/common/Weather";
import { mode } from "lib/constants/constant_value";

function ToMyGoal()
{
    const edit = useSelector((state)=>(state.workSpace.edit));
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));
    const date = useSelector((state)=>(state.workSpace.date));
    const goalData = useSelector((state)=>(state.tempData.goalData));
    return (
        <div className = "ToMyGoal"
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/paperBackground.png'})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}>
        <Weather/>
        <h3 className="workSpaceTitle">TO MY GOAL</h3>
        <h3>{date}</h3>
        {edit && currentMode === mode.GOAL ? <GoalEdit goalData={goalData}/>:<GoalView goalData={goalData}/>}
        </div>
    )
}
export default ToMyGoal;
import { useDispatch, useSelector } from "react-redux";
import './index.css';
import GoalEdit from "./GoalEdit";
import GoalView from "./GoalView";
import { BsSquare, BsFillCircleFill } from 'react-icons/bs';
import Weather from "components/common/Weather";
import { mode } from "lib/constants/constant_value";
import { removeCookie } from "lib/api/\bcookie";
import { useNavigate } from "react-router-dom";

function ToMyGoal()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));
    const date = useSelector((state)=>(state.workSpace.date));
    const goalData = useSelector((state)=>(state.tempData.goalData));

    async function onLogout()
    {
        try {
            removeCookie('token')
            navigate("/"); // 로그인 완료 시, main페이지로 이동
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <div className = "ToMyGoal"
        style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/images/paperBackground.png'})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}>
        <Weather/>
        <button className='Logout' type='button' onClick={onLogout}>
            Logout
            </button>
        <h3 className="workSpaceTitle">TO MY GOAL</h3>
        <h3>{date}</h3>
        {edit && currentMode === mode.GOAL ? <GoalEdit goalData={goalData}/>:<GoalView goalData={goalData}/>}
        </div>
    )
}
export default ToMyGoal;
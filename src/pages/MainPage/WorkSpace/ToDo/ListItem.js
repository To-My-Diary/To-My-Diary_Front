import { useSelector } from "react-redux";
import './index.css';
import clockImage from 'assets/icons/시계 2.png'
import trashImage from 'assets/icons/쓰레기통 1.png'
import { useState, useEffect } from "react";
import TimeModal from "./TimeModal";

function ListItem(props)
{
    const [msg, setMsg] = useState(props.msg||"");
    const [planDate, setPlanDate] = useState(props.planDate||"");
    const [achieve, setAchieve] = useState(props.achieve||"");
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const edit = useSelector(state=>state.workSpace.edit);
    let leftSide = null;
    const checkbox = <input type="checkbox" id={"checkbox"+props.id} onClick={(event)=>{checkboxClick(event);}}/>
    const checkboxDocObject = document.querySelector("#checkbox"+props.id);
    const clock = <div style={{display:"inline-block"}}>
        <img className="itemImage" src={clockImage} alt="시계" onClick={()=>setIsTimeModalOpen(true)}/>
    </div>

    useEffect(() => {
        // decide checked
        if(achieve === "달성") checkboxDocObject.checked = true;
    },[]);

    function checkboxClick(event)
    {
        event.stopPropagation();
        setAchieve(achieve===""?"달성":"");

        console.log("클릭");
        // need to post todo json
    }

    if(edit)
    {
        if(planDate!=="")
        {
            leftSide = <p style={{margin:"10px"}} onClick={()=>setIsTimeModalOpen(true)}>
                {planDate}</p>;
        }
        else
        {
            leftSide = clock;
        }
    }
    else
    {
        leftSide = checkbox;
    }

    return(
        <div id={"listItem"+props.id} className="listItem" style={{marginTop:"8px", display:"flex", justifyContent:"center"}} 
        data-msg={msg} data-plandate={planDate} data-achieve={achieve}>
            {leftSide}
            <div style={{display:"inline-block"}}>
                <input type="text" className="msgText" value={msg} onChange={(event)=>{
                    setMsg(event.target.value);
                }}></input>
                <hr id="todohorizon"/>
            </div>
            {
                edit?
                <img className="itemImage" src={trashImage} alt="쓰레기통" onClick={()=>{
                    let count = document.querySelectorAll(".listItem").length;
                    if(count > 1)
                    {
                        let item = document.querySelector("#listItem"+props.id);
                        item.remove();
                    }
                }}/>:null
            }
            <TimeModal isTimeModalOpen={isTimeModalOpen} setIsTimeModalOpen={(x)=>{setIsTimeModalOpen(x)}
            } setPlanDate={(x)=>setPlanDate(x)}/>
        </div>
    )
}

export default ListItem;
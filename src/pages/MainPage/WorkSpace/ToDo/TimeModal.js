import TimePicker from './TimePicker';
import './index.css';
import Modal from "react-modal";

function TimeModal(props) 
{
    return <Modal
        isOpen={props.isTimeModalOpen}
        onRequestClose={() => props.setIsTimeModalOpen(false)} // 모달을 닫을 때 모달 상태를 변경합니다.
        contentLabel="시간 설정" // 모달에 대한 레이블
        ariaHideApp={false} // 스타일이 적용되어야 합니다.
        style={{
            overlay: {
                backgroundColor: " rgba(0, 0, 0, 0.4)",
                width: "100%",
                height: "100vh",
                zIndex: "10",
                position: "fixed",
                top: "0",
                left: "0",
            },
            content: {
                width: "360px",
                height: "240px",
                zIndex: "150",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "10px",
                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                backgroundColor: "white",
                justifyContent: "center",
                overflow: "auto",
                textAlign: "center"
            },
        }}
    >
        <form onSubmit={(event)=>{
            event.preventDefault();
            event.stopPropagation();
            
            if(event.target.hour.value!==""&&event.target.minute.value!=="")
            {
                props.setPlanDate(event.target.hour.value +":"+event.target.minute.value);
            }
            props.setIsTimeModalOpen(false);
        }}>
            <h4>시간 설정</h4>
            <TimePicker/>
            <p><input type="submit" value="확인"></input></p>
        </form>
    </Modal>
}

export default TimeModal;
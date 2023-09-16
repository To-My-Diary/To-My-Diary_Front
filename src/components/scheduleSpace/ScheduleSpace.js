/* 메인화면 위 부분의 날짜/일정 선택 공간 (달력, 일주일 일정 등) */
import './ScheduleSpace.css';
import { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate } from '../workSpace/workSpaceSlice';


function ScheduleSpace() {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [mark, setMark] = useState(['2023-08-29', '2023-09-13', '2023-10-14']);
    // mark : dot 표시할 날짜 배열 ( setMark : mark 날짜 배열 접근 메서드 )
    const dispatch = useDispatch();
    const clickDate = ((value) => {
      return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
      // getMonth() : 0 ~ 11 숫자로 표현
    });
return (
    <div className='scheduleWrapper'>
      <br />
      <div className='calendar-container'>
      <Calendar
  onChange={setDate} // useState로 포커스 변경 시 현재 날짜 받아오기
  formatDay={(locale, date) => moment(date).format('D')}
  formatMonth={(locale, date) => moment(date).format('MMM')}
  minDetail='year'
  next2Label={null}
  prev2Label={null}
  value={date}
  locale="en-EN"
  calendarType='gregory'
  onClickDay={(value, event) => {
    value = clickDate(value)
    setDate(value)
    dispatch(changeDate(value));
    alert(`Clicked day : ${value}`)
  }}
  navigationLabel={null}
  showNeighboringMonth={true} //  이전, 이후 달의 날짜 보이도록 설정
  className="mx-auto w-full text-sm border-b"
  // tileContent={({ date, view }) => {
    tileContent={({date})=> {
    let dot = []
    if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
      dot.push(<div key={date.toString()} className="dot"></div>)
    }

    return (
      <>
        <div className="flex justify-center items-center absoluteDiv">{dot}</div>
      </>
    )
  }}
/>
      <br /><br />
      </div>
    </div>
  );
}

export default ScheduleSpace;
/* 메인화면 위 부분의 날짜/일정 선택 공간 (달력, 일주일 일정 등) */
import './ScheduleSpace.css';
import { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate } from '../workSpace/workSpaceSlice';


function ScheduleSpace() {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [mark, setMark] = useState([]);
    // mark : dot 표시할 날짜 배열 ( setMark : mark 날짜 배열 접근 메서드 )
    const dispatch = useDispatch();
    const clickDate = ((value) => {
      return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
      // getMonth() : 0 ~ 11 숫자로 표현
    });
return (
    <div className='app'>
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
  tileContent={({ date, view }) => {
    // 날짜 타일에 컨텐츠 추가하기 (html 태그)
    // 추가할 html 태그를 변수 초기화
    let html = []
    // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
    if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
      html.push(<div className="dot"></div>)
    }
    // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
    return (
      <>
        <div className="flex justify-center items-center absoluteDiv">{html}</div>
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
/* 메인화면 위 부분의 날짜/일정 선택 공간 (달력, 일주일 일정 등) */
import './index.css';
import { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate, changeYear, changeMonth } from 'store/slices/workSpaceSlice';
import { request } from 'lib/api/api_type';


function ScheduleSpace() {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [year, setYear] = useState(moment().format('YYYY'));
    const [month, setMonth] = useState(moment().format('MM'));
    const [mark, setMark] = useState(['2023-09-13', '2023-10-14', '2023-12-22']);
    // mark : dot 표시할 날짜 배열 ( setMark : mark 날짜 배열 접근 메서드 )
    const dispatch = useDispatch();
    const clickDate = ((value) => {
      return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
      // getMonth() : 0 ~ 11 숫자로 표현
    });
    const clickYear = ((value) => {
      return `${value.getFullYear()}`;
    });
    const clickMonth = ((value) => {
      return `${value.getMonth() + 1}`;
    });
    const options = {
      method: 'GET',
    };
    async function onMainGoalListView(props)
    {
        try {
          const { year, month } = props;
            const data = await request(`/goal/${year}/${month}`, options);
            console.log(data);

          } catch (error) {
            console.error(error);
          }
    }
    async function onGoalMark(props)
    {
        try {
          const { year, month } = props;
            const data = await request(`/calendar/goal/${year}/${month}`, options);
            console.log(data);

          } catch (error) {
            console.error(error);
          }
    }
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
  onClickMonth={(value, event) => {
    const year_ = clickYear(value)
    const month_ = clickMonth(value)
    console.log(year_ + month_)
    setYear(year_)
    setMonth(month_)
    dispatch(changeYear(year_))
    dispatch(changeMonth(month_))
    alert(`${year} ${month}`)
    onMainGoalListView({year, month});
    onGoalMark({year, month});
  }}
  onClickDay={(date_, event) => {
    date_ = clickDate(date_)
    setDate(date_)
    dispatch(changeDate(date_))
    alert(`${date_}`)
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
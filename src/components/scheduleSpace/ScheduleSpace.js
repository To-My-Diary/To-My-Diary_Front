/* 메인화면 위 부분의 날짜/일정 선택 공간 (달력, 일주일 일정 등) */
import './ScheduleSpace.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'


function ScheduleSpace() {
    const [date, setDate] = useState(new Date());

//     return (
//         <div id="scheduleWrapper">
//             <Calendar onChange={onChange} value={value} />
//             {/* 스케줄 공간입니다 */}
//         </div>
//     );
// }
return (
    <div className='app'>
      <h1 className='text-center'>Calendar</h1>
      <div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
        />
      </div>
      {/* {date.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Start:</span>{' '}
          {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className='bold'>End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>Default selected date:</span>{' '}
          {date.toDateString()}
        </p>
      )} */}
    </div>
  );
}

export default ScheduleSpace;

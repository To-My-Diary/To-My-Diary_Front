/* 메인화면 위 부분의 날짜/일정 선택 공간 (달력, 일주일 일정 등) */
import './index.css';
import { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate, changeYear, changeMonth } from 'store/slices/workSpaceSlice';
import { saveGoalData } from 'store/slices/dataSlice';
import { request } from 'lib/api/api_type';


function ScheduleSpace() {
  const marks = [
    {
        "color": "#2ECCFA",
        "date": 10,
        "mainGoal": false
    },
{
          "color": "#63b3ed",
          "date": 10,
          "mainGoal": false
      },
      {
        "color": "#f21021",
        "date": 10,
        "mainGoal": false
    },
    {
        "color": "#2ECCFA",
        "date": 30,
        "mainGoal": false
    }
  ];
// ]
// const marks = [
//   {
//     "date": 10,
//     "colors": ['#f87171', '#63b3ed', '#f21021'], //'#32d42a', '#74ad1e'],
//     "mainGoal": false
//   },
//   {
//     "date": 30,
//     "colors": ["#2ECCFA"],
//     "mainGoal": false
//   }
// ];
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [year, setYear] = useState(moment().format('YYYY'));
    const [month, setMonth] = useState(moment().format('MM'));
  //   const marks = {
  //     '2024-01-10': ['#f87171', '#63b3ed', '#f21021'], //'#32d42a', '#74ad1e'],
  // '2024-01-15': ['#63b3ed', '#86c995'],
  // '2024-01-22': ['#86c995'],
  //   };
    const dispatch = useDispatch();
    const groupedMarks = groupByDate(marks);
    const clickDate = ((value) => {
      const month = (value.getMonth() + 1) < 10 ? `0${value.getMonth()+1}` : `${value.getMonth()+1}`
      const day = value.getDate() < 10 ? `0${value.getDate()}` : `${value.getDate()}`
      return `${value.getFullYear()}-${month}-${day}`;
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
        const { year, month } = props;
        request(`/goal/${year}/${month}`, options)
        .then((data) => {
          dispatch(saveGoalData(data))
        })
        .catch ((error) => alert(error.message));
    }
    async function onGoalMark(props)
    {
      {
        const { year, month } = props;
        request(`/calendar/goal/${year}/${month}`, options)
        .then((data) => {
	        console.log("data", data);
        })
        .catch ((error) => alert(error.message));
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
  tileContent={({ date, view }) => {
    const formattedDate = moment(date).format('D'); // 날짜만 필요하므로 'D' 형식 사용
    const dateInfo = groupedMarks[parseInt(formattedDate, 10)];
    // console.log(groupedMarks)
  // const dateInfo = marks.find(mark => mark.date === parseInt(formattedDate, 10));

  if (dateInfo) {
    return (
      <div className="flex justify-center items-center absoluteDiv">
        <div className="dot-container">
          {/* {dateInfo.colors.map((color, index) => (
            <div key={index} className="dot" style={{ backgroundColor: color }}></div>
          ))} */}
        </div>
      </div>
    );
  }

  return null;
}}
  //   const formattedDate = moment(date).format('YYYY-MM-DD');
  //   const colors = marks[formattedDate];
  
  //   if (colors && colors.length > 0) {
  //     return (
  //       <div className="flex justify-center items-center absoluteDiv">
  //         <div className="dot-container">
  //           {colors.map((color, index) => (
  //             <div key={index} className="dot" style={{ backgroundColor: color }}></div>
  //           ))}
  //         </div>
  //       </div>
  //     );
  //   }
  
  //   return null;
  // }}
/>
      <br /><br />
      </div>
    </div>
  );
}

const groupByDate = (marks) => {
  const groupedMarks = {};
  marks.forEach((mark) => {
    const { date, color } = mark;
    if (!groupedMarks[date]) {
      groupedMarks[date] = [];
    }
    groupedMarks[date].push({ color });
  });

  // Object를 배열로 변환
  const result = Object.entries(groupedMarks).map(([date, group]) => group);
  // console.log(result)
  return result;
};

export default ScheduleSpace;
/* 메인화면 위 부분의 날짜/일정 선택 공간 (달력, 일주일 일정 등) */
import './index.css';
import { useState } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate, changeYear, changeMonth } from 'store/slices/workSpaceSlice';
import { saveGoalData } from 'store/slices/dataSlice';
import { request } from 'lib/api/api_type';
import axios from 'axios';


function ScheduleSpace() {
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [year, setYear] = useState(moment().format('YYYY'));
    const [month, setMonth] = useState(moment().format('MM'));
    const [colorsByDate, setColorsByDate] = useState([]);
    const dispatch = useDispatch();
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
        const data = request(`/goal/${year}/${month}`, options)
        console.log(data)
        data.then((result) => {
          dispatch(saveGoalData(result))
        })
        .catch ((error) => alert(error.message));

        // TODO: 로컬 dummy data인 JSON 파일을 API endpoint로 사용하여 데이터 조회 (테스트할때만 사용)
        // axios.get('/dummy/goalTestData.json')
        // .then((res) => {
        //   dispatch(saveGoalData(res))
        //     console.log(res);
        // })
    }
    async function onGoalMark(props)
    {
      {
        const { year, month } = props;
        request(`/calendar/goal/${year}/${month}`, options)
        .then((data) => {
          setColorsByDate(transformMarks(data.result))
        })
        .catch ((error) => alert(error.message));


      // TODO: 로컬 dummy data인 JSON 파일을 API endpoint로 사용하여 데이터 조회 (테스트할때만 사용)
      // axios.get('/dummy/markTestData.json')
      // .then((res) => {
      //   setColorsByDate(transformMarks(res.data))
      //     console.log(res);
      // })
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
    setYear(year_)
    setMonth(month_)
    dispatch(changeYear(year_))
    dispatch(changeMonth(month_))
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
  const dateInfo = colorsByDate.find(mark => mark.date === parseInt(formattedDate, 10));

  if (dateInfo) {
    return (
      <div className="flex justify-center items-center absoluteDiv">
        <div className="dot-container">
          {dateInfo.colors.map((color, index) => (
            <div key={index} className="dot" style={{ backgroundColor: color }}></div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}}
/>
      <br /><br />
      </div>
    </div>
  );
}

// TODO: "mainGoal" 속성에 따라 투명한 정도도 고려해서 날짜-색깔 맵핑하기
function transformMarks(marks) {
  const transformedMarks = {};

  marks.forEach(mark => {
    const dateKey = mark.date;

    if (!transformedMarks[dateKey]) {
      transformedMarks[dateKey] = [];
    }

    transformedMarks[dateKey].push(mark.color);
  });

  const result = Object.entries(transformedMarks).map(([date, colors]) => ({
    date: parseInt(date),
    colors
  }));

  return result;
}

export default ScheduleSpace;
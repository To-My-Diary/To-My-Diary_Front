/* 메인화면 위 부분의 날짜/일정 선택 공간 (달력, 일주일 일정 등) */
import './index.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { changeDate } from 'store/slices/workSpaceSlice';
import { saveGoalData } from 'store/slices/dataSlice';
import { request } from 'lib/api/api_type';


function ScheduleSpace() {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [year, setYear] = useState(moment().format('YYYY'));
    const [month, setMonth] = useState(moment().format('MM'));
    const [colorsByDate, setColorsByDate] = useState([]);
    const date = useSelector((state)=>(state.workSpace.date));
    const goalList = useSelector((state) => state.tempData.goalData);
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
    const options = useMemo(() => ({
      method: 'GET',
    }), []);
    async function onMainGoalListView(props)
    {
        const { year, month } = props;
        const data = request(`/goal/${year}/${month}`, options)
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
    const onGoalMark = useCallback(async (props) => {
      const { year, month } = props;
      try {
          const data = await request(`/calendar/goal/${year}/${month}`, options);
          setColorsByDate(transformMarks(data.result, props));
      } catch (error) {
          alert(error.message);
      }
  }, [options]);

      // TODO: 로컬 dummy data인 JSON 파일을 API endpoint로 사용하여 데이터 조회 (테스트할때만 사용)
      // axios.get('/dummy/markTestData.json')
      // .then((res) => {
      //   setColorsByDate(transformMarks(res.data))
      //     console.log(res);
      // })
    useEffect(() => {
      const dateObj = new Date(date)
      const year_ = clickYear(dateObj)
    const month_ = clickMonth(dateObj)
    setYear(year_)
    setMonth(month_)
    onGoalMark({year, month});
    // eslint-disable-next-line
    }, [goalList, date, onGoalMark]);
return (
    <div className='scheduleWrapper'>
      <br />
      <div className='calendar-container'>
      <Calendar
  onChange={setSelectedDate} // useState로 포커스 변경 시 현재 날짜 받아오기
  formatDay={(locale, date) => moment(date).format('D')}
  formatMonth={(locale, date) => moment(date).format('MMM')}
  minDetail='year'
  next2Label={null}
  prev2Label={null}
  value={selectedDate}
  locale="en-EN"
  calendarType='gregory'
  onClickMonth={(value, event) => {
    const year_ = clickYear(value)
    const month_ = clickMonth(value)
    setYear(year_)
    setMonth(month_)
    onMainGoalListView({year: year_, month: month_});
    onGoalMark({year: year_, month: month_});
  }}
  onClickDay={(date_, event) => {
    date_ = clickDate(date_)
    setSelectedDate(date_)
    dispatch(changeDate(date_))
  }}
  navigationLabel={null}
  showNeighboringMonth={true} //  이전, 이후 달의 날짜 보이도록 설정
  className="mx-auto w-full text-sm border-b"
  tileContent={({ date, view }) => {
  const formattedDate = moment(date).format('YYYY-M-D'); // 년/월/일 형식으로 변환

  const dateInfo = colorsByDate.find(mark => mark.date === formattedDate);

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

function increaseTransparency(color, transparency) {
  // 색상 코드를 RGB 값으로 변환
  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  // 투명도 값을 0 ~ 1 사이의 범위로 정규화
  transparency = Math.max(0, Math.min(1, transparency));

  const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  return hexColor;
}

// TODO: "mainGoal" 속성에 따라 투명한 정도도 고려해서 날짜-색깔 맵핑하기
function transformMarks(marks, props) {
  const transformedMarks = {};

  marks.forEach(mark => {
    const dateKey = `${props.year}-${props.month}-${mark.date}`;

    if (!transformedMarks[dateKey]) {
      transformedMarks[dateKey] = [];
    }
    if (mark.mainGoal) {
      transformedMarks[dateKey].push(mark.color);
    }
     else {
      transformedMarks[dateKey].push(increaseTransparency(mark.color));
    }
  });

  const result = Object.entries(transformedMarks).map(([date, colors]) => ({
    date,
    colors
  }));


  return result;
}

export default ScheduleSpace;
export { transformMarks, increaseTransparency };
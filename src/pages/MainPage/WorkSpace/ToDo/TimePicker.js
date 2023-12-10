import React, { useState } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Navigation]);

const TimePicker = () => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = (swiper) => {
    const selectedHour = swiper.activeIndex;
    setSelectedHour(selectedHour);
  };

  const handleMinuteChange = (swiper) => {
    const selectedMinute = swiper.activeIndex;
    setSelectedMinute(selectedMinute);
  };

  return (
    <div>
        <div  style={{display:"flex"}}>
        <Swiper
            direction="vertical"
            slidesPerView={3}
            onSlideChange={(swiper) => handleHourChange(swiper)}
            style={{ height: '100px', width:'100px' }}
        >
            {hours.map((hour) => (
            <SwiperSlide key={hour}>{hour}</SwiperSlide>
            ))}
        </Swiper>

        <Swiper
            direction="vertical"
            slidesPerView={3}
            onSlideChange={(swiper) => handleMinuteChange(swiper)}
            style={{ height: '100px', width:'100px'}}
        >
            {minutes.map((minute) => (
            <SwiperSlide key={minute}>{minute}</SwiperSlide>
            ))}
        </Swiper>
        </div>    
        <div>
            <p>Selected Time: {String(selectedHour).padStart(2, '0')}:{String(selectedMinute).padStart(2, '0')}</p>
        </div>
    </div>
  );
};

export default TimePicker;

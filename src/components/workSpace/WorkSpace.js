/* 메인화면 아래 부분의 작업 공간 (일기, To-do 작성 등) */

import './WorkSpace.css';
import ToDoList from './ToDoList';
import Diary from './Diary';
import { Route, Routes } from 'react-router-dom';
import ToMyGoal from './ToMyGoal';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { changeMode } from './workSpaceSlice';
import { mode } from "../../constant_value"

import 'swiper/css';

function WorkSpace() {
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));

    return(
        <div id="workWrapper">
            <Swiper
                style={{width:"100vw"}}
                slidesPerView={1}
                onRealIndexChange={(swiper)=>{
                    switch(swiper.realIndex)
                    {
                        case 0:
                            dispatch(changeMode(mode.TODO));
                            break;
                        case 1:
                            dispatch(changeMode(mode.DIARY));
                            break;
                        case 2:
                            dispatch(changeMode(mode.GOAL));
                            break;
                    }
                }}
                onSwiper={(swiper) => console.log(swiper)}
                touchRatio={edit?0:1}
                loop={true}
            >
                <SwiperSlide><ToDoList/></SwiperSlide>
                <SwiperSlide><Diary/></SwiperSlide>
                <SwiperSlide><ToMyGoal/></SwiperSlide>
            </Swiper>
        </div>
    );
}

export default WorkSpace;
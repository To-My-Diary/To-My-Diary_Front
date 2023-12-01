/* 메인화면 아래 부분의 작업 공간 (일기, To-do 작성 등) */

import './index.css';
import ToDoList from './ToDo';
import Diary from './Diary';
import ToMyGoal from './Goal';
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { changeMode } from 'store/slices/workSpaceSlice';
import { mode } from "lib/constants/constant_value"

import 'swiper/css';
import { useEffect } from 'react';

function WorkSpace() {
    const dispatch = useDispatch();
    const edit = useSelector((state)=>(state.workSpace.edit));
    const currentMode = useSelector((state)=>(state.workSpace.currentMode));

    useEffect(()=>{
        const swiper = document.querySelector('.swiper').swiper;
        swiper.init();
    }, [edit])

    return(
        <div id="workWrapper">
            <Swiper
                style={{width:"100vw"}}
                slidesPerView={1}
                initialSlide={currentMode}
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